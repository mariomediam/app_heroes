import { useContext, useMemo } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../auth";

export const PrivateRoute = ({ children }) => {
  const { logged } = useContext(AuthContext);
  const{ pathname, search } = useLocation();
  const lastPath = pathname + search;  

  const saveLastPath = () => {
    localStorage.setItem("lastPath", lastPath);
  }

  useMemo(() => saveLastPath(lastPath), [lastPath]);


  
  return logged ? children : <Navigate to="/login" />;
};
