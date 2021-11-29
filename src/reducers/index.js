import { combineReducers } from "redux";
import { pizzasReducer } from "./pizzas";
import { ingredientsReducer } from "./ingredients";
import { salesReducer } from "./sales";

export default combineReducers({ pizzas: pizzasReducer, ingredients: ingredientsReducer, sales: salesReducer });
