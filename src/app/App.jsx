
import { Routes, Route } from "react-router-dom";
import  Home  from "../pages/Home";
import  Signin  from "../pages/Signin";
import  User  from "../pages/User";
import { Provider } from "react-redux";
import store from "./store";
import ProtectedRoute from "../components/ProtectedRoute";
function App() {

  return (
      
        <Provider store={store}>

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/user" element={
              <ProtectedRoute>

                <User />
              </ProtectedRoute>
            }
            />
          </Routes>

        </Provider>
        

      
  )
}

export default App
