import Pizza from "../../components/Pizza/Pizza";
import "./PizzaCard.css";

const PizzaCard = ({ pizza, handleOpen }) => {
  const recipe = pizza.ingredients.map((ingredient) => ingredient.name).join(", ");
  return (
    <div className='pizzaCard' onClick={() => handleOpen(pizza)}>
      <div className='pizzaCard-card'>
        <div className='pizzaCard-info'>
          <h2 className='title'>{pizza.name}</h2>
          <p>{recipe}</p>
        </div>
      </div>
      <div className='pizzaCard-image'>
        <Pizza ingredients={pizza.ingredients} />
      </div>
    </div>
  );
};

export default PizzaCard;
