import pizza from "../../assets/images/Pizza.svg";
import "./Pizza.css";

const Pizza = ({ ingredients }) => {
  return (
    <div className='pizza'>
      <div className='pizza-base'>
        <img src={pizza} alt='Pizza base' />
        {ingredients.map((ingredient) => (
          <div className='pizza-ingredient' key={ingredient.id}>
            <img src={ingredient.pizzaImage} alt={ingredient.name} style={{ zIndex: ingredient.index || 99 }} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pizza;
