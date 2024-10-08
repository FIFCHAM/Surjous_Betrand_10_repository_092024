import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Proptypes from "prop-types";

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.auth.isauthentified);

  if (!isAuthenticated) {
    return <Navigate to="/signin" />;
  }

  return children;
};

export default ProtectedRoute;
ProtectedRoute.propTypes = {
  children: Proptypes.node.isRequired,
};
