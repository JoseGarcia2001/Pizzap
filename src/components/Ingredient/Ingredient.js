import { useState } from "react";
import { formatCurrency } from "../../utils/global";
import "./Ingredient.css";

const Ingredient = ({ ingredient, addIngredient }) => {
  const [added, setAdded] = useState(false);
  const handleAdd = () => {
    addIngredient({ ingredient, added });
    setAdded(!added);
  };

  return (
    <div className='ingredient'>
      <div className='ingredient-image'>
        <div className={`ingredient-add ${added ? "added" : "add"}`} onClick={handleAdd}>
          <p>{added ? "-" : "+"}</p>
        </div>
        <img src={ingredient.image} alt={ingredient.name} />
      </div>
      <div className='ingredient-details'>
        <p className='ingredient-title'>{ingredient.name}</p>
        <i className='ingredient-price'>$ {formatCurrency({ value: ingredient.price, currency: "COP" })}</i>
      </div>
    </div>
  );
};

export default Ingredient;
