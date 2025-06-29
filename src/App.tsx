import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Dashboard } from "./pages/dashboard";

import { ProtectedRoute } from "./ProtectedRoute";
import  {AuthMain} from "./components/AuthMain"


const App = () => {
  return (
    <BrowserRouter> 
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