import React, { Fragment } from 'react';
import Alert from '../utils/Alert';


const ViewPaises = ({countries,deleteCountry}) =>{
    

    const deleteCountryParent = (e) => {
        const id = Number(e.target.dataset.id);
        deleteCountry(id);
    }
    
    return (
            <React.Fragment>
                {(countries.length === 0 ) 
                    ? <Alert tipo="danger" mensaje="No se encuentran datos registrados" time={0}/>
                    : <Fragment>
                            <table  className="table mb-5">
                                <thead className="thead-dark">
                               <tr>
                                    <th scope="col" className="text-center py-2">Id</th>
                                    <th scope="col" className="text-center py-2">Nombre</th>
                                    <th scope="col" className="text-center py-2"></th>
                                </tr>
                            </thead>
                            <tbody>
                                { countries.map((country) => {
                                    return (
                                        <tr key={country.id}>
                                            <td className="text-center py-2">{country.code}</td>
                                            <td className="text-center py-2">{country.name}</td>
                                            <td className="text-center py-2">
                                                <button 
                                                        data-id={country.id} 
                                                        className="btn btn-danger" 
                                                        onClick={deleteCountryParent}>
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
            </React.Fragment>
    )
    
}

export default ViewPaises;

