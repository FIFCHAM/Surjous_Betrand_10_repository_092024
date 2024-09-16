import { Link } from "react-router-dom";
import "../utils/css/main.css";
import argentbanklogo from "../assets/images/argentBankLogo.png"

const Header = () => {

    return (
        <nav className="main-nav">
          <Link to= "/" className="main-nav-logo" href="./index.html">
            <img
              className="main-nav-logo-image"
              src={argentbanklogo}
              alt="Argent Bank Logo"
              />
            <h1 className="sr-only">Argent Bank</h1>
          </Link>
          <div>
            <Link to="signin" className="main-nav-item" href="./sign-in.html">
              <i className="fa fa-user-circle"></i>
              Sign In
            </Link>
          </div>
        </nav> 
    )
}

    export default Header