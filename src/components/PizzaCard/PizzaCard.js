import Pizza from "../../components/Pizza/Pizza";
import { formatCurrency } from "../../utils/global";
import "./PizzaCard.css";

const PizzaCard = ({ pizza, handleOpen }) => {
  const recipe = pizza.ingredients.map((ingredient) => ingredient.name).join(", ");
  const price = pizza.ingredients.reduce((acc, cur) => acc + cur.price, 0);

  return (
    <div className='pizzaCard' onClick={() => handleOpen(pizza)}>
      <div className='pizzaCard-card'>
        <div className='pizzaCard-info'>
          <h2 className='title'>{pizza.name}</h2>
          <p>{recipe}</p>
          <p className='pizzaCard-price title'>$ {formatCurrency({ value: price + 10000, currency: "COP" })}</p>
        </div>
      </div>
      <div className='pizzaCard-image'>
        <Pizza ingredients={pizza.ingredients} />
      </div>
    </div>
  );
};

export default PizzaCard;
