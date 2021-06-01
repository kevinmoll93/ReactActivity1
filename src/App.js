import './assets/css/App.css' ;
import { Route } from 'react-router-dom';
import { useContext} from 'react';
import { MenuContext } from "react-flexible-sliding-menu";
import { JobList } from './views/JobList';
import {ViewCiudades} from './views/ViewCiudades';
import {ViewEmpresas} from './views/ViewEmpresas';
import {ViewPaises} from './views/ViewPaises';
import { NotFoundView } from './views/NotFoundView';


function App() {
  const { toggleMenu } = useContext(MenuContext);
  return (
    <div className="App">
      <h1>App: Puestos de trabajo</h1>
      <p>Usted puede agregar Paises,Ciudades y Empresas.</p>
      
      <Route exact path="/" component={() => <h2>Inicio</h2>} />
      <Route path="/paises" exact component={ViewPaises} />
      <Route path="/ciudades" component={ViewCiudades} />
      <Route path="/empresas" component={ViewEmpresas} />
      <Route path="/puesto" component={JobList} />
      <Route component={NotFoundView} />
      
      <button onClick={toggleMenu} className="primary-button">
        Abrir Menu
      </button>
    </div>
  );
}

export default App;