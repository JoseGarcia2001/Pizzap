/* eslint-disable array-callback-return */
import { useLocation } from "react-router";
import Modal from "../Modal/Modal";
import { useState } from "react";
import favorite from "../../assets/images/favorite.svg";
import PizzaCard from "../PizzaCard/PizzaCard";
import "./PizzaList.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { HasUser } from "../../hooks/hasUser";
import { useDispatch } from "react-redux";
import { createSale } from "../../reducers/sales";
import { deletePizza } from "../../reducers/pizzas";
import { useEffect } from "react";

const PizzaList = ({ label, view }) => {
  const currentUser = HasUser();
  const dispatch = useDispatch();
  const viewAll = useLocation().pathname === "/";

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  const [viewPizza, setView] = useState(false);
  const [loading, setLoading] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [success, setSuccess] = useState({ title: "", message: "" });

  let pizzas = useSelector((state) => {
    if (view === "menu") return state.pizzas.filter((pizza) => pizza.user.role === "chef");
    if (["home", "myPizzas"].includes(view)) return state.pizzas.filter((pizza) => pizza?.user?.id === currentUser?.id);
  });

  if (view === "home") pizzas = pizzas.splice(0, 3);

  const buyPizza = async (ev) => {
    ev.preventDefault();
    setLoading(true);
    const price = viewPizza.ingredients.reduce((acc, cur) => acc + cur.price, 0);
    await dispatch(
      createSale({
        client: currentUser.name,
        price: price + 10000,
        pizza: viewPizza.name,
        isCustom: viewPizza.user.role === "chef",
        id: currentUser.id * viewPizza.id * Math.random() - Math.random(),
      })
    );
    setLoading(false);
    setConfirm(true);
    setSuccess({ title: "Gracias!!", message: "Pronto recibiras tu pizza :)" });
    setView(false);
  };
  const pizzaAction = async ({ ev, action }) => {
    ev.preventDefault();
    setLoading(true);
    await dispatch(deletePizza(viewPizza.id));
    setLoading(false);
    setConfirm(true);
    setSuccess({ title: "Súper", message: "Pizza eliminada con éxito :)" });
    setView(false);
  };
  const noPizzas = () => {
    if (view === "home" || (view === "menu" && currentUser?.role === "chef")) {
      return (
        <p className='PizzaList-nopizzas'>
          No tienes pizzas <Link to='/create'>Crea una!</Link>
        </p>
      );
    } else {
      return <p className='PizzaList-nopizzas'>Pronto encontraras pizzas para ti!</p>;
    }
  };

  return (
    <div className='PizzaList content-mypizzas'>
      {loading && <div className='spinner'></div>}
      <div className='mypizzas-header'>
        <div className='mypizzas-favorite'>
          <img src={favorite} alt='mypizzas' />
          <h2 className='title'>{label}</h2>
        </div>
        {viewAll && (
          <Link className='mypizzas-viewall' to={"mypizzas"}>
            <p>Ver todas</p>
          </Link>
        )}
      </div>

      {pizzas.length ? (
        <div className='mypizzas-list'>
          {pizzas.map((pizza) => (
            <PizzaCard key={pizza?.id} pizza={pizza} handleOpen={(pizza) => setView(pizza)} />
          ))}
        </div>
      ) : (
        noPizzas()
      )}

      {viewPizza && (
        <Modal handleClose={() => setView(null)}>
          <form className='resume-modal'>
            <h2 className='resume-modal-title title'>¿Que deseas hacer?</h2>
            <button onClick={(ev) => pizzaAction({ action: "delete", ev })} className='resume-button'>
              Eliminar
            </button>
            {/* <button onClick={(ev) => pizzaAction({ action: "edit", ev })} className='resume-button'>
              Editar
            </button> */}
            {currentUser.role !== "chef" && (
              <button onClick={buyPizza} className='resume-button'>
                Comprar
              </button>
            )}
          </form>
        </Modal>
      )}

      {confirm && (
        <Modal handleClose={() => setConfirm(false)}>
          <div className='resume-modal'>
            <h2 className='resume-modal-title title'>{success.title}</h2>
            <p>{success.message}</p>
            <button onClick={() => setConfirm(false)} className='resume-button'>
              Aceptar
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default PizzaList;
