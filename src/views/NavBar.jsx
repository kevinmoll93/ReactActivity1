import React from 'react';
import {Link} from 'react-router-dom'

export class NavBar extends React.Component {
    // eslint-disable-next-line
  constructor() {
    super();
  }

  render() {
    return <p>
        <Link to="/" >Inicio</Link>
        <Link to="/Empresas" >Empresas</Link>
        <Link to="/Ciudades" >Ciudades</Link>
        <Link to="/Paises" >Paises</Link>
        </p>;
  }

}


