import axios from "axios";

const API_URL = "http://localhost:3001/users";

const login = async ({ user, password }) => {
  const { data: users } = await axios.get(API_URL);
  const userFound = users.find((userData) => userData.user === user && password === userData.password);
  if (userFound) {
    const { password, ...user } = userFound;
    localStorage.setItem("user", JSON.stringify(user));
    return { message: "", success: true };
  } else {
    return { message: "Usuario o contraseña incorrectos", success: false };
  }
};

const register = async ({ name, user, password, role }) => {
  const { data: users } = await axios.get(API_URL);
  const userFound = users.find((userData) => userData.user === user);
  if (userFound) return { success: false, message: "Prueba con otro nombre usuario :)" };
  const { data } = await axios.post(API_URL, { name, user, password, role, id: users.length + 1 });
  const { password: nonePsw, ...restUser } = data;
  localStorage.setItem("user", JSON.stringify(restUser));
  return { success: true, message: "Usuario registrado" };
};
const usersService = { login, register };
export default usersService;
