
import Login from "./pages/login/Login";
import Perfil from "./pages/perfil/Perfil"
import { Route, Routes } from "react-router-dom"
import Dashboard from './pages/dashboard/Dashboard';

 
function App() {


  return (
    <>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/perfil' element={<Perfil />} />
        <Route path="/dashboard" element={<Dashboard/>}/>
        
      </Routes>

    </>
  );
}

export default App;
