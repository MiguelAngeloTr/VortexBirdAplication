import './Sidebar.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAward, faUser, faTrophy, faTachometerAlt, faTimes, faBars, faSearch,faSignOutAlt    } from '@fortawesome/free-solid-svg-icons';
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useTasks } from '../../context/Context';



const Sidedar = () => {

  const{ logout }=useTasks()

  const location = useLocation();
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    // Mantén el checkbox marcado cuando cambia la ubicación (navegas a otro componente)
    setIsChecked(true);
  }, [location.pathname]);
  
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <>
    <input type="checkbox" id = "check" checked={isChecked} onChange={handleCheckboxChange} />
    <label htmlFor="check">
    <FontAwesomeIcon id='btn' icon={faBars} />
    <FontAwesomeIcon id='cancel' icon={faTimes } />
    </label>
     <div className="sidebar">
        <header>
          <img src="https://vortexbird.com/wp-content/uploads/2023/07/Vortexbird.desarrolloSoftware.png" alt="" className="imagen-sidebar"  />
        </header>
        <ul>
          <li><Link to="/dashboard"> <FontAwesomeIcon icon={faTachometerAlt} /> Dashboard  </Link> </li>
          <li><Link to="/logro" > <FontAwesomeIcon icon={faTrophy} /> Logros  </Link> </li>
          <li><Link to="/perfil"  > <FontAwesomeIcon icon={faUser} />  Perfil  </Link> </li>        
          <li><Link to="/PerRecompensa"   > <FontAwesomeIcon icon={faAward} /> Personalización de Recompensas </Link> </li>
          <li><Link to="/consultaActividad"   > <FontAwesomeIcon icon={faSearch} /> Consultar Avance </Link> </li>
          <li><Link to="/"onClick={()=>{
            logout()
          }}><FontAwesomeIcon icon={faSignOutAlt}/> Cerrar Sesión</Link></li>
        </ul>
      </div>
      
    </>
  )
}

export default Sidedar;