import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { login } from "./authSlice";
import { useNavigate } from "react-router-dom";

const AuthForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const savedEmail = localStorage.getItem("email");
    const savedPassword = localStorage.getItem("password");

    if (savedEmail && savedPassword) {
      setEmail(savedEmail);
      setPassword(savedPassword);
      setRememberMe(true);
    }
  }, []);

  // **************************** ENVOIE DES FORMULAIRES POUR LOGIN ET RECUPERATION DES DONNEES ******************************
  const handleSignIn = async (e) => {
    e.preventDefault();

    try {
      // ************** envoi des données de connexion **************************************
      const response = await fetch("http://localhost:3001/api/v1/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // ************** récupération du token **************************************
        const token = data.body.token;
        // ***********Stockage du token et des identifiants de connexion **************************************
        if (rememberMe) {
          localStorage.setItem("token", token);
          localStorage.setItem("email", email);
          localStorage.setItem("password", password);
        } else {
          sessionStorage.setItem("token", token);
          localStorage.removeItem("email");
          localStorage.removeItem("password");
        }
        // ************** récupération des données utilisateur **************************************
        const userResponse = await fetch(
          "http://localhost:3001/api/v1/user/profile",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const userData = await userResponse.json();
        console.log(userData);
        console.log(userData.body.userName);
        // **************** stockage des données utilisateur **************************************
        dispatch(
          login({
            id: userData.body.id,
            email,
            password,
            token,
            username: userData.body.userName,
            firstName: userData.body.firstName,
            lastName: userData.body.lastName,
          })
        );
        // ************** navigation vers la page de profil **************************************
        navigate("/profile");
      } else {
        setErrorMessage(data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("Erreur lors de la connexion");
    }
  };

  return (
    <section className="sign-in-content">
      <i className="fa fa-user-circle sign-in-icon"></i>
      <h1>Sign In</h1>
      <form onSubmit={handleSignIn}>
        <div className="input-wrapper">
          <label htmlFor="username">Username</label>
          <input
            type="email"
            id="username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input-wrapper">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="input-remember">
          <input
            type="checkbox"
            id="rememberMe"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
          />
          <label htmlFor="rememberMe">Remember me</label>
        </div>
        <button type="submit" className="sign-in-button">
          Sign In
        </button>
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      </form>
    </section>
  );
};
export default AuthForm;
