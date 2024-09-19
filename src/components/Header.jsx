import { Link,useNavigate } from "react-router-dom";
import argentbanklogo from "../assets/images/argentBankLogo.png"
import { useSelector,useDispatch } from "react-redux";
import { signOut } from "../features/authform/authSlice";
const Header = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignOut = () => {
    dispatch(signOut()); // Déconnecter l'utilisateur
    navigate('/');       // Rediriger vers la page d'accueil après la déconnexion
  };

    return (
        <nav className="main-nav">
          <Link to= "/" className="main-nav-logo" >
            <img
              className="main-nav-logo-image"
              src={argentbanklogo}
              alt="Argent Bank Logo"
              />
            <h1 className="sr-only">Argent Bank</h1>
          </Link>
          <div>
            {isAuthenticated ? (
              <div>
                <Link to="/user" className="main-nav-item" onClick={handleSignOut}>
                  <i className="fa fa-user-circle"></i>
                  Sign Out
                </Link>
                
              </div>
            ) : (
              <Link to="/signin" className="main-nav-item">
                <i className="fa fa-user-circle"></i>
                Sign In
              </Link>
            )}
            
          </div>
        </nav> 
    )
}

    export default Header