import React, { Fragment } from 'react';
import Alert from '../utils/Alert';
import {FilterSameData} from '../utils/Storage';



const ViewEmpresas = ({businessArr,deleteBusinessParent}) =>{

    const deleteBusiness = (e) => {
        const id = Number(e.target.dataset.id);
        deleteBusinessParent(id);
    }

    const filterCountry = (IdCountry) => {
        let name='---';
        let result = FilterSameData('countries',IdCountry)
        if(Object.keys(result[0]).length >0 ) name = result[0].name;
        return name;
    }

    const filterCity = (IdCity) => {
        let name='---';
        let result = FilterSameData('cities',IdCity)
        if(Object.keys(result[0]).length >0 ) name = result[0].name;
        return name;
    }

    return(
        <Fragment>
            {(businessArr.length === 0 ) 
                    ? <Alert tipo="danger" mensaje="No se encuentran datos registrados" time={0}/>
                    : 
                    <Fragment>
                        <table  className="table mb-5">
                            <thead className="thead-dark">
                                <tr>
                                    <th scope="col" className="text-center py-2">Empresa</th>
                                    <th scope="col" className="text-center py-2">Ciudad</th>
                                    <th scope="col" className="text-center py-2">Pais</th>
                                    <th scope="col" className="text-center py-2">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                { businessArr.map((business) => {
                                    return (
                                        <tr key={business.id}>
                                            <td className="text-center py-2">{business.name}</td>
                                            <td className="text-center py-2">{filterCity(business.city)}</td>
                                            
                                            <td className="text-center py-2">{filterCountry(business.country)}</td>
                                            <td className="text-center py-2">
                                                <button 
                                                        data-id={business.id} 
                                                        className="btn btn-danger" 
                                                        onClick={deleteBusiness}>
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

export default ViewEmpresas;


