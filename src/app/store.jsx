import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authform/authSlice";

 const store = configureStore({
    reducer: {
        auth: authReducer,

    }
})
export default store;