import  { useState } from 'react';
import { useDispatch} from 'react-redux';
import { login } from './authSlice';
import { useNavigate } from 'react-router-dom';
const AuthForm = () => {
  
  //const { email: savedEmail, password: savedPassword, rememberMe: savedRememberMe } = useSelector((state) => state.auth);

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
      

      if (response.ok) {
        console.log(data);
        const token = data.body.token;
        localStorage.setItem('token', token);

        if (rememberMe) {
          localStorage.setItem('email', email);
          localStorage.setItem('password', password);
          localStorage.setItem('rememberMe', true);
        }
        

        

        

        // Appel de l'API pour récupérer les informations utilisateur
        const userResponse = await fetch('http://localhost:3001/api/v1/user/profile', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        const userData = await userResponse.json();
        console.log(userData);
        console.log(userData.body.userName);
        console.log(rememberMe);
        

        
          // Dispatch dans Redux pour stocker les informations de l'utilisateur
          dispatch(login({
            id: userData.body.id,
            email,
            password,
            token,
            rememberMe,
            username: userData.body.userName,
            firstName: userData.body.firstName,
            lastName: userData.body.lastName,
          }));

          // Redirection vers la page User
          navigate('/user');
        


        
        



        

        // Dispatch de l'action Redux pour stocker les informations utilisateur
        
      } else {
        setErrorMessage(data.message);
      };

      
       
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
    
        