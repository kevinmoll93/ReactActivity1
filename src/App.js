import './assets/css/App.css' ;
import { useContext} from 'react';
import {Route } from "react-router-dom";
import { MenuContext } from "react-flexible-sliding-menu";
import PaisesForm from './components/PaisesForm';
import CiudadesForm from './components/CiudadesForm';
import EmpresasForm from './components/EmpresasForm';
import JobForm from './components/JobForm';
import { NotFoundView } from './views/NotFoundView';


function App() {
  const { toggleMenu } = useContext(MenuContext);
  return (
    <div className="App">
      <h1>App: Puestos de trabajo</h1>
      <p>Usted puede agregar Paises,Ciudades y Empresas.</p>

      <Route exact path="/" component={() => <h2>Inicio</h2>} />
      <Route path="/paises" exact component={PaisesForm} />
      <Route path="/ciudades" component={CiudadesForm} />
      <Route path="/empresas" component={EmpresasForm} />
      <Route path="/puesto" component={JobForm} />
      <Route component={NotFoundView} />

      <button onClick={toggleMenu} className="primary-button">
        Abrir Menu
      </button>
    </div>
  );
}

export default App;