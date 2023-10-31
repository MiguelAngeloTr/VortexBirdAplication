import './Sidebar.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavLink } from 'react-router-dom'

const Sidedar = () => {
  return (
    <>
      <nav className="bar">
        <div>
          <img src="https://vortexbird.com/wp-content/uploads/2023/07/Vortexbird.desarrolloSoftware.png" className="imagen-sidebar" />
        </div>
        <div className="divcon">
          <p className="Menu">Menú</p>
        </div>
        <ul className='navegacion'>
          <li>
            <NavLink to="/dashboard" className="active-link">
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink to="/logro" className="active-link">
              Logro
            </NavLink>
          </li>
          <li>
            <NavLink to="/perfil" className="active-link">
              Perfil
            </NavLink>
          </li>
          <li>
            <NavLink to="/PerRecompensa" className="active-link">
              Recompensa
            </NavLink>
          </li>
          <li>
            <NavLink to="/retorno" className="active-link">
              Unidades de Retorno
            </NavLink>
          </li>
        </ul>
      </nav>
    </>
  )
}

export default Sidedar;