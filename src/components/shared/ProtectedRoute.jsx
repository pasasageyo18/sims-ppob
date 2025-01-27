import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

/* eslint-disable-next-line react/prop-types */
const ProtectedRoute = ({ children }) => {
  const token = useSelector((state) => state.auth.token);

  return token ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
