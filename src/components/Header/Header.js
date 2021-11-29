import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.svg";
import "./Header.css";
import { useLocation } from "react-router";
import logout from "../../assets/images/logout.svg";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isLogin = ["/login", "/register"].includes(location.pathname);
  const closeSession = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };
  return (
    <header className='header'>
      <Link to={"/"}>
        <img src={logo} alt='logo' />
      </Link>
      {!isLogin && <img onClick={closeSession} className='header-logout' src={logout} alt='Logout' />}
    </header>
  );
};
export default Header;
