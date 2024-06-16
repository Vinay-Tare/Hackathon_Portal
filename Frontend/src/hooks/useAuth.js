import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

//now useAuth is not a function anymore is a hook (leaves in the component lifecycle).
const useAuth = () => {
  const navigate = useNavigate();
  const [isAuth, setIsAuth] = useState(null);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [roles, setRoles] = useState(null);

  const refreshPage = () => navigate(0);

  const login = (data) => {
    sessionStorage.setItem("token", JSON.stringify(data));
    setIsAuth(true);
    setLoggedInUser(data.loggedInUser);
    setRoles(data.loggedInUser.roles.split(","));
    refreshPage();
  };

  const logout = () => {
    sessionStorage.removeItem("token");
    setIsAuth(null);
    setLoggedInUser(null);
    setRoles(null);
    navigate("/login");
  };

  useEffect(() => {
    const fetchData = async () => {
      var token = JSON.parse(sessionStorage.getItem("token"));

      if (!token) setIsAuth(false);
      else {
        setIsAuth(true);
        setLoggedInUser(token.loggedInUser);
        setRoles(token.loggedInUser.roles.split(","));
      }
    };
    fetchData();
  }, []);

  return { isAuth, loggedInUser, roles, login, logout, refreshPage };
};

export default useAuth;
