/* eslint-disable react-hooks/exhaustive-deps */
import { Link } from "react-router-dom";
import pizza from "../../assets/images/Pizza_com.svg";
import slice from "../../assets/images/Pizza_Slice.svg";
import arrow from "../../assets/images/arrow.svg";
import chart from "../../assets/images/chart.svg";
import "./Home.css";
import PizzaList from "../../components/PizzaList/PizzaList";
import { HasUser } from "../../hooks/hasUser";

const Home = () => {
  const currentUser = HasUser();

  return (
    <section className='home'>
      {currentUser ? (
        <div className='home-contet'>
          <div className='content-welcome'>
            <p>
              Bienvenido, <strong className='welcome-user'>{currentUser.name}!</strong>
            </p>
          </div>
          <div className='content-actions'>
            <Link to={"/create"} className='content-button'>
              <div>
                <img src={pizza} alt='pizza icon' />
                <h2 className='title'>Crea tu Pizza</h2>
              </div>
              <img src={arrow} alt='pizza slice' />
            </Link>
            <Link to={"/menu"} className='content-button'>
              <div>
                <img src={slice} alt='pizza icon' />
                <h2 className='title'>Menú pizzas</h2>
              </div>
              <img src={arrow} alt='pizza slice' />
            </Link>
            {currentUser.role === "chef" && (
              <Link to={"/statistics"} className='content-button'>
                <div>
                  <img src={chart} alt='pizza icon' />
                  <h2 className='title'>Estadísticas</h2>
                </div>
                <img src={arrow} alt='pizza slice' />
              </Link>
            )}
          </div>
          <PizzaList label='Mis Pizzas' view='home' />
        </div>
      ) : (
        <div className='spinner'></div>
      )}
    </section>
  );
};

export default Home;
