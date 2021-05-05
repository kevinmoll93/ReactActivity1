// import logo from './assets/images/logo.svg';
import './assets/css/App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import { ToDoList } from './views/TodoList';
// import Badge from 'react-bootstrap/Badge'
import { Empresas } from './views/Empresas';
import { Ciudades } from './views/Ciudades';
import { Paises } from './views/Paises';
import { NavBar } from './views/NavBar';
import { NotFoundView } from './views/NotFoundView';

function App() {
  return (
    
    <Router>
      <NavBar></NavBar>
      <Switch>
        <Route path="/" exact component={ToDoList} ></Route>
        <Route path="/Empresas" exact component={Empresas} ></Route>
        <Route path="/Ciudades" exact component={Ciudades} ></Route>
        <Route path="/Paises" exact component={Paises} ></Route>
        <Route component={NotFoundView}></Route>
      </Switch>
{/*       <div className="container">
      <div className="mt-5">
        <h1><Badge variant="info">Puesto de Trabajo</Badge></h1>
        <ToDoList />
      </div>
    </div> */}
    </Router>
  );
}

export default App;
