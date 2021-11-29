import Pizzas from "../services/Pizzas";

export const pizzasReducer = (state = [], action) => {
  switch (action.type) {
    case "@pizzas/init":
      return action.payload;

    case "@pizzas/create":
      return [action.payload, ...state];

    case "@pizzas/delete":
      const newState = state.filter((pizza) => pizza.id !== action.payload);
      return newState;

    case "@pizzas/update":
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

export const initPizzas = () => {
  return async (dispatch) => {
    const allPizzas = await Pizzas.getAll();

    dispatch({
      type: "@pizzas/init",
      payload: allPizzas,
    });
  };
};
export const createPizza = (pizza) => {
  return async (dispatch) => {
    const createdPizza = await Pizzas.create(pizza);

    dispatch({
      type: "@pizzas/create",
      payload: createdPizza,
    });
  };
};
export const deletePizza = (id) => {
  return async (dispatch) => {
    const deletedItem = await Pizzas.delete(id);
    dispatch({
      type: "@pizzas/delete",
      payload: deletedItem,
    });
  };
};
export const updatePizza = (id, propsToUpdate) => {
  return async (dispatch) => {
    const updatedItem = await Pizzas.update(id, propsToUpdate);

    dispatch({
      type: "@pizzas/update",
      payload: { id, updatedItem },
    });
  };
};
