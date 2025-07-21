import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Dashboard } from "./pages/dashboard";

import { ProtectedRoute } from "./ProtectedRoute";
import  {AuthMain} from "./components/AuthMain"
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <BrowserRouter> 
       <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
          <Route path ="/" element = {
            <ProtectedRoute >

              <Dashboard/>
            </ProtectedRoute>  
            } />
  
          <Route path = "/auth" element = {<AuthMain/>}/>
        
       
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