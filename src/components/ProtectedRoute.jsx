import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import Proptypes from 'prop-types';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  // Si l'utilisateur n'est pas authentifié, on le redirige vers la page de connexion
  if (!isAuthenticated) {
    return <Navigate to="/signin" />;
  }

  // Sinon, on affiche la page demandée (ici, la page `User`)
  return children;
};

export default ProtectedRoute;
ProtectedRoute.propTypes = {
  children: Proptypes.node.isRequired,
};