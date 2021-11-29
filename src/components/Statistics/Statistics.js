/* eslint-disable react-hooks/exhaustive-deps */
import { HasUser } from "../../hooks/hasUser";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getSales } from "../../reducers/sales";
import { useSelector } from "react-redux";
import { formatCurrency } from "../../utils/global";
import "./Statistics.css";

const Statistics = () => {
  const navigate = useNavigate();
  const user = HasUser();
  if (user?.role !== "chef") navigate("/");

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const sales = useSelector((state) => state.sales);

  const calcTopClient = () => {
    let topClient = "";
    const clients = {};
    sales.forEach((sale) => {
      if (!clients[sale.client]) clients[sale.client] = 0;
      clients[sale.client]++;
    });
    for (const client in clients) {
      if (clients[client] === Math.max(...Object.values(clients))) topClient = client;
    }
    return topClient;
  };

  const totalSales = sales.reduce((acc, sale) => +acc + sale.price, 0);

  const cards = [
    {
      message: "Total de ventas",
      value: `$ ${formatCurrency({ value: totalSales, currency: "COP" })}`,
    },
    {
      message: "Pizzas vendidas",
      value: sales.length,
    },
    {
      message: "Pizzas de la casa",
      value: sales.filter((sale) => sale.isCustom).length,
    },
    {
      message: "Pizzas personalizadas",
      value: sales.filter((sale) => !sale.isCustom).length,
    },
    {
      message: "Cliente más top",
      value: calcTopClient(),
    },
  ];

  const initData = async () => {
    setLoading(true);
    await dispatch(getSales());
    setLoading(false);
  };

  useEffect(() => {
    initData();
  }, []);

  return (
    <section className='statistics'>
      {loading && <div className='spinner'></div>}
      <div className='statistics-content'>
        {cards.map((card, idx) => (
          <div className='statistics-card' key={idx}>
            <h2 className='title'>{card.value}</h2>
            <p>{card.message}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Statistics;
