// import logo from './assets/images/logo.svg';
import './assets/css/App.css';
import { ToDoList } from './components/ToDoList';
import Badge from 'react-bootstrap/Badge'

function App() {
  return (
    <div className="container">
      <div className="mt-5">
        <h1><Badge variant="info">Puesto de Trabajo</Badge></h1>
        <ToDoList />
      </div>
    </div>
  );
}

export default App;
