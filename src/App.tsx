import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Dashboard } from "./pages/dashboard";

import { ProtectedRoute } from "./ProtectedRoute";
import  {AuthMain} from "./components/AuthMain"
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

import { Profile } from "./components/Profile";
const App = () => {
  return (
    <BrowserRouter>        
       <ToastContainer position="top-right" autoClose={3000}  toastStyle={{maxWidth: "w-[100px] md:w-[300px]"}} />
      <Routes>
          <Route path = "/auth" element = {<AuthMain/>}/>
          <Route  path = "/dashboard" element = {
            <ProtectedRoute>
                <Dashboard/>
            </ProtectedRoute>        
            }/>
            <Route path = "/profile" element = {
              <ProtectedRoute>
                  <Profile/>
              </ProtectedRoute> 
            }/>
      </Routes>
    </BrowserRouter>
  )
}

export default App;