
import { Routes, Route } from "react-router-dom";
import  Home  from "../pages/Home";
import  Signin  from "../pages/Signin";
import  User  from "../pages/User";
function App() {

  return (
      
        
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/user" element={<User />} />
        
          </Routes>
        

      
  )
}

export default App
