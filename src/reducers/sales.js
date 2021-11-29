import Sales from "../services/Sales";

export const salesReducer = (state = [], action) => {
  switch (action.type) {
    case "@sales/init":
      return action.payload;

    case "@sales/create":
      return [...state, action.payload];

    default:
      return state;
  }
};

export const getSales = () => {
  return async (dispatch) => {
    const sales = await Sales.getAll();

    dispatch({
      type: "@sales/init",
      payload: sales,
    });
  };
};
export const createSale = (pizza) => {
  return async (dispatch) => {
    const createdSale = await Sales.create(pizza);

    dispatch({
      type: "@sales/create",
      payload: createdSale,
    });
  };
};
