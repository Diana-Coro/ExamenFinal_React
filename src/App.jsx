import { Routes, Route, Link, Outlet } from "react-router-dom";
import "./App.css";
import escudoBolivia from "./assets/escudo.png";
import RegistroCRUD from "./components/gestion/RegistroCRUD";
import Doctor from "./pages/Doctores/Doctor";
import Institucion from "./pages/Institucion/Institucion";
import Pacientes from "./pages/Pacientes/Pacientes";
import Reporte from "./pages/Reportes/Reporte";
import Afiliado from "./pages/Afiliados/Afiliado";
import Enfermero from "./pages/Enfermeros/Enfermero";
import logoSSU from "./assets/logo.png";
import imgConvocatorias from "./assets/img.png";


function LayoutApp() {
  return (
    <div className="app-page">
      <div className="app-topbar">
        <span>☎ Emergencias +591-2-6224161</span>
        <span>✉ segurosocialuniversitario@ssupotosi.com.bo</span>
        <span>📍 Calle Calama N° 107</span>
      </div>

      <header className="app-header">
        <div className="app-logo">
          <img src={logoSSU} alt="Logo SSU" />
        </div>


        <div className="app-title">
          <h1>SEGURO SOCIAL</h1>
          <h2>UNIVERSITARIO POTOSÍ</h2>
        </div>


                      <div className="app-right">


                        <img src={escudoBolivia} alt="Escudo de Bolivia" className="app-escudo-img" />


                        <div className="app-main-actions">


                          <div className="convocatorias-wrapper">
                            <img src={imgConvocatorias} alt="CONVOCATORIAS" className="app-convocatorias-img" />
                          </div>


                        <div className="reservas-wrapper">

                          <div className="spinner-puntos-loading"></div>
                          <p className="azul-marino-link">Reservas</p>
                        </div>


                        </div>


                        <p className="rojo-link">🔔 Síguenos</p>

                      </div>



      </header>

      <nav className="app-navbar">
        <Link to="/">Inicio</Link>
        <Link to="/institucion">Institucional</Link>
        <Link to="/doctores">Doctores</Link>
        <Link to="/enfermeros">Enfermeros</Link>
        <Link to="/pacientes">Pacientes</Link>
        <Link to="/reportes">Reportes</Link>
        <Link to="/afiliados">Afiliados</Link>
      </nav>

      <main className="app-content">
        <Outlet />
      </main>

      <footer className="app-footer">
        <div>
          <h3>CONTACTO</h3>
          <p>Calle Calama N° 107</p>
          <p>Emergencias: +591-2-6224161</p>
          <p>segurosocialuniversitario@ssupotosi.com.bo</p>
        </div>

        <div>
          <h3>SERVICIOS</h3>
          <p>Consulta Externa</p>
          <p>Laboratorio Clínico</p>
          <p>Imagenología</p>
          <p>Enfermería</p>
          <p>Farmacia</p>
        </div>

        <div>
          <h3>SÍGUENOS</h3>
          <button>Facebook</button>
          <button>YouTube</button>
        </div>
      </footer>

      <div className="app-copy">
        © 2026 Seguro Social Universitario Potosí. Todos los derechos reservados.
      </div>
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<LayoutApp />}>
        <Route index element={<RegistroCRUD />} />
        <Route path="doctores" element={<Doctor />} />
        <Route path="institucion" element={<Institucion />} />
        <Route path="pacientes" element={<Pacientes />} />
        <Route path="reportes" element={<Reporte />} />
        <Route path="afiliados" element={<Afiliado />} />
        <Route path="enfermeros" element={<Enfermero />} />
      </Route>
    </Routes>
  );
}

export default App;