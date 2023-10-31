
import Login from "./pages/login/Login";
import Perfil from "./pages/perfil/Perfil"
import { Route, Routes, useRoutes, useLocation } from "react-router-dom"
import Dashboard from './pages/dashboard/Dashboard';
import NotFound from './components/NotFound/NotFound'
import { ContextProvider } from './context/Context'
import TaskForm from "./components/TasksForm/TaskForm";
import UnidadesRetorno from "./pages/unidadesRetorno/UnidadesRetorno";
import PersonalizacionRecompensa from "./pages/recompensa/PersonalizacionRecompensa";
import Logro from "./pages/logros/Logro";
import UnitsForm from "./components/UnitsForm/UnitsForm";
import Files from "./pages/Files/Files";
import { PrimeReactProvider, PrimeReactContext } from 'primereact/api';
import Prueba from "./pages/pureba/Prueba";
import Evidencia from "./components/Evidencias/Evidencia";
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from "react";
import { toast } from 'react-toastify';

function App() {

  const location = useLocation();
  
  useEffect(() => {
    // Detecta cuando la ruta cambia a "/PerRecompensa"
    if (location.pathname === '/PerRecompensa') {
      // Muestra una notificación
      toast.info('¡Aquí podrás personalizar tus recompensas!');
    }
  }, [location]);

  return (
    <PrimeReactProvider>
      <ContextProvider>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/perfil' element={<Perfil />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/edit/:id" element={<TaskForm />} />
          <Route path="/edit/unit/:id" element={<UnitsForm />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/retorno" element={<UnidadesRetorno />} />
          <Route path="/PerRecompensa" element={<PersonalizacionRecompensa />} />
          <Route path="/logro" element={<Logro />} />
          <Route path="/files" element={<Files />} />


          <Route path="/prueba" element={<Prueba />} />
          <Route path="/evidencia" element={<Evidencia />} />
        </Routes>
      </ContextProvider>
    </PrimeReactProvider>
  );
}

export default App;
