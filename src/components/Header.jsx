import { Link, useNavigate } from "react-router-dom";
import argentbanklogo from "../assets/images/argentBankLogo.png";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/authform/authSlice";
const Header = () => {
  const { isauthentified } = useSelector((state) => state.auth);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignOut = () => {
    dispatch(logout());
    navigate("/signin");
  };

  return (
    <nav className="main-nav">
      <Link to="/" className="main-nav-logo">
        <img
          className="main-nav-logo-image"
          src={argentbanklogo}
          alt="Argent Bank Logo"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </Link>
      <div>
        {isauthentified ? (
          <div className="main-nav-item-wrapper">
            <Link to="/profile" className="main-nav-item">
              <i className="fa fa-user-circle"></i>
              <span> {user.username} </span>
            </Link>

            <Link
              to="/profile"
              className="main-nav-item"
              onClick={handleSignOut}
            >
              <i className="fa fa-sign-out"></i>
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
  );
};

export default Header;
