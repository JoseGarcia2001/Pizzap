import { Link } from "react-router-dom";
import { useState } from "react";
import close from "../../assets/images/close.svg";
import Pizza from "../../components/Pizza/Pizza";
import Modal from "../../components/Modal/Modal";
import Ingredient from "../../components/Ingredient/Ingredient";
import { formatCurrency } from "../../utils/global";
import { HasUser } from "../../hooks/hasUser";
import { useDispatch } from "react-redux";
import { createPizza } from "../../reducers/pizzas";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./Creator.css";

const Creator = () => {
  const user = HasUser();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const ingredients = useSelector((state) => state.ingredients);

  const [myIngredients, setMyIngredients] = useState([]);
  const [error, setError] = useState(false);
  const [total, setTotal] = useState(0);
  const [show, setShow] = useState(false);
  const [name, setName] = useState({ message: "", error: false });
  const [loading, setLoading] = useState(false);

  const handleIngredients = ({ ingredient, added }) => {
    if (!added) {
      setMyIngredients(myIngredients.concat(ingredient));
      setTotal((prev) => prev + ingredient.price);
    } else {
      setMyIngredients(myIngredients.filter((i) => i.id !== ingredient.id));
      setTotal((prev) => prev - ingredient.price);
    }
  };
  const handleContinue = () => {
    if (myIngredients.length < 3) {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 3000);
    } else {
      setShow(true);
    }
  };
  const sendPizza = async (event) => {
    event.preventDefault();
    if (!name.message) return setName({ message: "", error: true });
    const pizza = { name: name.message, ingredients: myIngredients, user: { role: user.role, id: user.id } };
    setLoading(true);
    await dispatch(createPizza(pizza));
    setLoading(false);
    navigate("/mypizzas");
  };

  return (
    <section className='creator'>
      {loading && <div className='spinner'></div>}
      <div className='creator-header'>
        <Link to={"/"}>
          <div className='header-close'>
            <img className='header-image' src={close} alt='close button' />
          </div>
        </Link>
        <h2 className='header-title title'>¡Crea algo loco!</h2>
      </div>
      <div className='creator-pizza'>
        <Pizza ingredients={myIngredients} />
      </div>
      <div className='creator-ingredients'>
        <p className='ingredients-title'>Selecciona las adiciones</p>
        <div className='ingredients-list'>
          {ingredients.map((ingredient) => (
            <Ingredient key={ingredient.id} ingredient={ingredient} addIngredient={handleIngredients} />
          ))}
        </div>
      </div>
      <div className='creator-resume'>
        <p className={`resume-error ${error && "error"}`}>Por favor, selecciona al menos 3 ingredientes</p>
        <p className='resume-total'>Total: ${formatCurrency({ value: total + 10000, currency: "COP" })}</p>
        <button onClick={handleContinue} className='resume-button'>
          Continuar
        </button>
      </div>
      {show && (
        <Modal handleClose={() => setShow(false)}>
          <form className='resume-modal'>
            <h2 className='resume-modal-title title'>¡Una cosa más!</h2>
            <p className={"resume-modal-text"}>Dale un nombre único a tu pizza</p>
            <div className='resume-modal-input'>
              <input
                className={`${name.error && "inputError"}`}
                type='text'
                placeholder='Escribe el nombre'
                onInput={({ target }) => setName({ message: target.value, error: !target.value })}
              />
              {name.error && <small className='error-message'>Dale algún nombre</small>}
            </div>
            <button onClick={sendPizza} className='resume-button'>
              Crear pizza
            </button>
          </form>
        </Modal>
      )}
    </section>
  );
};

export default Creator;
