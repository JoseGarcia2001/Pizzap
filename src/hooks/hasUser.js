import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { useNavigate } from "react-router";

export const HasUser = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(null);
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setUser(JSON.parse(user));
    } else {
      if (!["/login", "/register"].includes(location.pathname)) navigate("/login");
    }
  }, [location.pathname, navigate]);

  return user;
};
