import { createSlice } from '@reduxjs/toolkit';

// Récupérer les données du local storage au démarrage si elles existent
const initialAuthState = {
  user:{
    id:'',
    username:'',
    firstName:'',
    lastName:'',
    token: null,

  },
  isauthentified:false,
  email: localStorage.getItem('email') || '',
  password: localStorage.getItem('password') || '',
  rememberMe: localStorage.getItem('rememberMe') === true || false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState: initialAuthState,
  reducers: {
    login(state, action) {
      const { id,email, password, rememberMe,token,username,firstName,lastName } = action.payload;
      state.isauthentified = true;
      state.user={
        id,
        username,
                firstName,
        lastName,
        token,
      };
      state.token

      state.email 
      state.password 
      state.rememberMe 

      // Sauvegarde dans le local storage si "Remember me" est coché
      if (rememberMe===true) {
        localStorage.setItem('email', email);
        localStorage.setItem('password', password);
        localStorage.setItem('rememberMe', rememberMe);
        localStorage.setItem('token', token);
        
      }
      
    },
    logout(state) {
      state.isauthentified=false;
      state.user={
        id:'',
        username:'',
        firstName:'',
        lastName:'',
        
      };
      state.token = null;
      state.email = '';
      state.password = '';
      state.rememberMe = false;

      localStorage.removeItem('email');
      localStorage.removeItem('password');
      localStorage.removeItem('rememberMe');
      localStorage.removeItem('token');

      
    },
    updateUsername(state, action) {
      state.user.username = action.payload.username;

    }
  },
});

export const { login, logout, updateUsername } = authSlice.actions;
export default authSlice.reducer;
