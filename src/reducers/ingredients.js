import Ingredients from "../services/Ingredients";

export const ingredientsReducer = (state = [], action) => {
  switch (action.type) {
    case "@ingredients/init":
      return action.payload;

    case "@ingredients/create":
      return [...state, action.payload];

    case "@ingredients/delete":
      return state.filter((item) => item._id !== action.payload);

    case "@ingredients/update":
      return state.map((item) => {
        if (item._id === action.payload.id) {
          return {
            ...action.payload.updatedItem,
          };
        }

        return item;
      });
    default:
      return state;
  }
};

export const initIngredients = () => {
  return async (dispatch) => {
    const allIngredients = await Ingredients.getAll();

    dispatch({
      type: "@ingredients/init",
      payload: allIngredients,
    });
  };
};
export const createPizza = (pizza) => {
  return async (dispatch) => {
    const createdPizza = await Ingredients.create(pizza);

    dispatch({
      type: "@ingredients/create",
      payload: createdPizza,
    });
  };
};
export const deletePizza = (id) => {
  return async (dispatch) => {
    const deletedItem = await Ingredients.delete(id);

    dispatch({
      type: "@ingredients/delete",
      payload: deletedItem._id,
    });
  };
};
export const updatePizza = (id, propsToUpdate) => {
  return async (dispatch) => {
    const updatedItem = await Ingredients.update(id, propsToUpdate);

    dispatch({
      type: "@ingredients/update",
      payload: { id, updatedItem },
    });
  };
};
