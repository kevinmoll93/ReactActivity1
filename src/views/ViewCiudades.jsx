import React, { Fragment } from 'react';
import Alert from '../utils/Alert';

const ViewCiudades = ({cities,countries,deleteCity}) => {
    

    const deleteCityParent=(e) => {
        const id = Number(e.target.dataset.id);
        deleteCity(id);
    } 
    
    return (
            <Fragment>
                {(cities.length === 0 ) 
                        ? <Alert tipo="danger" mensaje="No se encuentran datos registrados" time={0}/>
                        : 
                        <Fragment>
                            <table  className="table mb-5">
                                <thead className="thead-dark">
                                    <tr>
                                        <th scope="col" className="text-center py-2">Pais</th>
                                        <th scope="col" className="text-center py-2">Ciudad</th>
                                        <th scope="col" className="text-center py-2"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    { cities.map((city) => {
                                        let resultPais = (countries.filter(country => Number(city.country) === country.id)[0]);
                                        return (
                                            <tr key={city.id}>
                                                <td className="text-center py-2">{resultPais.name}</td>
                                                <td className="text-center py-2">{city.name}</td>
                                                <td className="text-center py-2">
                                                    <button 
                                                            data-id={city.id} 
                                                            className="btn btn-danger" 
                                                            onClick={deleteCityParent}>
                                                                Borrar
                                                    </button>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                    
                      </Fragment>
                    }
                
            </Fragment>
        )
    
}

export default ViewCiudades;


