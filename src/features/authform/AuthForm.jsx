import  { useState } from 'react';
import { useDispatch } from 'react-redux';
import { signIn } from './authSlice';
import { useNavigate } from 'react-router-dom';
const AuthForm = () => {
    const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    
    // Exemple d'appel à une API d'authentification
    try {
      const response = await fetch('http://localhost:3001/api/v1/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
          rememberMe,
        }),
      });

      const data = await response.json();
      console.log(data);
      

      if (response.ok) {
        // Si la réponse est OK, on récupère le token
        const token = data.body.token;

        // On stocke le token en local storage si 'remember me' est coché
        if (rememberMe) {
          localStorage.setItem('token', token);
        }

        // Dispatch de l'action Redux pour stocker les informations utilisateur
        dispatch(signIn({ email, token }));
        navigate('/user'); // Redirige vers la page utilisateur
      } else {
        setErrorMessage(data.message || 'Erreur lors de la connexion');
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('Erreur lors de la connexion');
    }
  };

  return (
    <section className="sign-in-content">
          <i className="fa fa-user-circle sign-in-icon"></i>
          <h1>Sign In</h1>
          <form onSubmit={handleSignIn}>
            <div className="input-wrapper">
              <label htmlFor="username">Username</label>
              <input type="email"  id="username" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="input-wrapper">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div className="input-remember">
              <input type="checkbox" id="remember-me" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} />
              <label htmlFor="remember-me">Remember me</label>
            </div>

            <button type="submit" className="sign-in-button">Sign In</button>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            
          </form>
        </section>
  )}
  export default AuthForm
    
        