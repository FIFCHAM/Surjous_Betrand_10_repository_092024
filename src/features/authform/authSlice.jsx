import { createSlice } from '@reduxjs/toolkit';

const initialAuthState = {
  user:{
    id:'',
    username:'',
    firstName:'',
    lastName:'',
    token: null,

  },
  isauthentified:false,
  email: '',
  password: '',

}
const authSlice = createSlice({
  name: 'auth',
  initialState: initialAuthState,
  reducers: {
    login(state, action) {
      const { id,email, password,token,username,firstName,lastName } = action.payload;
      state.isauthentified = true;
      state.user={
        id,
        username,
                firstName,
        lastName,
        token,
      };
      

      email ,
      password ;
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
      

      
      
      localStorage.removeItem('token');

      
    },
    updateUsername(state, action) {
      state.user.username = action.payload.username;

    }
  },
});

export const { login, logout, updateUsername } = authSlice.actions;
export default authSlice.reducer;
