import { Link } from "react-router-dom";

const Error_404 = () => {
  return (
    <div className="not-found">
      <h1>404 - Page Not Found</h1>
      <p>Oops! The page you are looking for does not exist.</p>
      <Link to="/" className="home-link">
        Go back to Home
      </Link>
    </div>
  );
};
export default Error_404;
