import {Link} from 'react-router-dom'
const Home = () => {
    return (
        <div className="container-fluid">
            <div className="jumbotron mt-3 ml-3 mr-3">
                <h1 className="display-4">Bienvenido a Puestos APP</h1>
                <p className="lead">En esta app puede administrar ciudades,paises,empresas y los puestos de las mismas</p>
                <Link className="btn btn-primary btn-lg" to="/" role="button">Comenzar</Link>
            </div>
        </div>
    );
}
export default Home;