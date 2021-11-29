import { Link } from "react-router-dom";
import { useState } from "react";
import { HasUser } from "../../hooks/hasUser";
import users from "../../services/Users";
import { useNavigate } from "react-router";
import "./UserForm.css";

const UserForm = ({ action }) => {
  const navigate = useNavigate();
  const currentUser = HasUser();
  if (currentUser) navigate("/");

  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({
    name: "",
    user: "",
    password: "",
    role: "client",
    error: false,
    errorMessage: "",
  });

  const form = {};
  if (action === "register") {
    form.method = "register";
    form.link = "/login";
    form.small = "Inicia sesión";
    form.button = "Regístrate";
  } else {
    form.method = "login";
    form.link = "/register";
    form.small = "Regístrate";
    form.button = "Ingresar";
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (action === "register") {
      if (!user.user || !user.password || !user.name) return setUser({ ...user, error: true, errorMessage: "Porfa llena todos los campos :)" });
    }
    if (action === "login") {
      if (!user.user || !user.password) return setUser({ ...user, error: true, errorMessage: "Porfa llena todos los campos :)" });
    }
    setUser({ ...user, error: false });
    setLoading(true);
    const { success, message } = await users[form.method](user);
    if (success) navigate("/");
    else setUser({ error: true, errorMessage: message, role: "client" });
    setLoading(false);
  };

  return (
    <>
      {loading ? (
        <div className='spinner'></div>
      ) : (
        <form className='user' onSubmit={handleSubmit}>
          <h3 className='user-title title'>{action === "register" ? "Registrarse" : "Ingresar"}</h3>
          {action === "register" && (
            <label className='user-name'>
              <span>Nombre</span>
              <input onInput={({ target }) => setUser({ ...user, name: target.value })} type='text' name='name' placeholder='Ingresa tu nombre' />
            </label>
          )}
          <label className='user-username'>
            <span>Usuario</span>
            <input onInput={({ target }) => setUser({ ...user, user: target.value })} type='text' name='user' placeholder='Ingresa tu usuario' />
          </label>
          <label className='user-password'>
            <span>Contraseña</span>
            <input
              onInput={({ target }) => setUser({ ...user, password: target.value })}
              type='password'
              name='password'
              placeholder='Ingresa tu contraseña'
            />
          </label>
          {action === "register" && (
            <label className='user-password'>
              <span>Rol</span>
              <select onChange={({ target }) => setUser({ ...user, role: target.value })} name='role'>
                <option value='client'>Cliente</option>
                <option value='chef'>Chef</option>
              </select>
            </label>
          )}
          {user.error && <p className='error-message'>{user.errorMessage}</p>}
          <button>{form.button}</button>
          <Link to={form.link}>
            <small>{form.small}</small>
          </Link>
        </form>
      )}
    </>
  );
};

export default UserForm;
