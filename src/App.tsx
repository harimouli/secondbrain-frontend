import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Dashboard } from "./pages/dashboard";
import { Signup } from "./pages/Signup";
import { Signin } from "./pages/Signin";
import { ProtectedRoute } from "./ProtectedRoute";


const App = () => {
  return (
    <BrowserRouter> 
      <Routes>
          <Route path ="/" element = {
            <ProtectedRoute >

              <Dashboard/>
            </ProtectedRoute>  
            } />
  
          <Route path = "/signin" element = {<Signin/>}/>
          <Route path = "/signup" element = {<Signup/>}/>

          <Route path = "/dashboard" element = {
            <ProtectedRoute>
                <Dashboard/>
            </ProtectedRoute>        
            }/>
      </Routes>
    </BrowserRouter>
  )
}

export default App;