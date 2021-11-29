/* eslint-disable react-hooks/exhaustive-deps */
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Creator from "./pages/Creator/Creator";
import Header from "./components/Header/Header";
import UserForm from "./components/UserForm/UserForm";
import React from "react";
import PizzaList from "./components/PizzaList/PizzaList";
import Statistics from "./components/Statistics/Statistics";
import { initPizzas } from "./reducers/pizzas";
import { initIngredients } from "./reducers/ingredients";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initPizzas());
    dispatch(initIngredients());
  }, []);

  return (
    <Router>
      <div className='root'>
        <Header />
        <Routes>
          <Route path='/login' element={<UserForm action='login' />} />
          <Route path='/register' element={<UserForm action='register' />} />
          <Route path='/create' element={<Creator />} />
          <Route path='/menu' element={<PizzaList label='Pizzas de la casa' view='menu' />} />
          <Route path='/mypizzas' element={<PizzaList label='Mis pizzas' view='myPizzas' />} />
          <Route path='/statistics' element={<Statistics />} />
          <Route path='/' element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
