import './Sidebar.css'


const Sidedar = () => {



  return (
    <>
      <nav className="bar">
        <div>
          imagen
        </div>
        <div className="divcon">
          <p className="Menu">Menú</p>
        </div>
        <ul>
          <li>
            <a href="/dashboard" >
              <button className="Button" id="das">
               
                <p>Dashboard</p>
              </button>
            </a>
          </li>



          <li>
            <a href="/colaboradores">
              <button className="Button" id="loc">
                
                <p>Colaboradores</p></button>
            </a>
          </li>
          <li>
            <a href="/areas" >
              <button className="Button" id="era">
               
                <p>Áreas</p></button>
            </a>
          </li>
          <li>
            <a href="/conocimientos" >
              <button className="Button" id="noc">
                
                <p>Conocimientos</p></button>
            </a>
          </li>
        </ul>
      </nav>
    </>

  )
}

export default Sidedar