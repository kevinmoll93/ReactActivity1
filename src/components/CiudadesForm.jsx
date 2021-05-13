import React, {Fragment,useEffect,useState} from 'react';
import Alert from '../utils/Alert';
import Loader from 'react-loader';
import {GetDataLocalStorage,InsertDataLocalStorage,FilterData} from '../utils/Storage';
import ViewCiudades from '../views/ViewCiudades';

const Cities = () => {
    
    const getInitialObj = () => (
        {
            id:Date.now(),
            country:'',
            name:''
        }
    )

    const[objCity,saveCity] = useState(getInitialObj);
    const[error,saveError] = useState(false);
    const[loading,saveLoading] = useState(false);
    const[cities,saveCities]= useState(GetDataLocalStorage('cities'));
    
    let countries=GetDataLocalStorage('countries');
    
    useEffect(()=> {
        const writeCities = () =>{
            setTimeout(() => {
                InsertDataLocalStorage('cities',cities)
                saveLoading(false)
                saveCity(getInitialObj)
            }, 2000);
        }
        writeCities();

    },[cities])

    
    const updateState=(e) => {
        saveError(false);
        saveCity({...objCity,[e.target.name] :e.target.value})
    }

  
    const{country,name}= objCity;
    
    const addCity = (e) => {
       e.preventDefault();
    
       if(country.trim() === '' || name.trim() === ''){
           saveError(true);
           return;
       }
       saveLoading(true);
       saveCities([...cities,objCity]);
    }

  
    const deleteCity = (IdCity) =>{
        saveLoading(true);
        const result = FilterData('cities',IdCity);
       saveCities(result);
    }


        return (
            <Fragment>
               <h3 className="text-center text-underline mt-5 mb-5">Agregar Ciudades</h3>
               <div className="container-fluid">
                   <div className="row ml-0 ml-lg-5">
                       <div className="col-12 col-md-5  col-lg-6">
                           <form
                               onSubmit={addCity}
                           >
                               <div className="row">
                                   <div className="col-12">
                                       <label htmlFor="pais" >Pais</label>
                                       <select 
                                            className="custom-select" 
                                            id="country"
                                            name="country"
                                            value={country}
                                            onChange={updateState}
                                            >
                                          <option value="">Seleccionar Pais</option>
                                          {countries.map((country,index) => (
                                            <option key={index} value={Number(country.id)} >{country.name}</option>
                                          ))}
                                        </select>
                                   </div>
                                   <div className="col">
                                       <label htmlFor="nombre" className="mt-4" >Nombre de la ciudad</label>
                                       <input 
                                           type="text" 
                                           id="name" 
                                           name="name"
                                           className="form-control" 
                                           placeholder="Ingrese el nombre de la ciudad"
                                           onChange={updateState}
                                           value={name}
                                       />
                                   </div>
                               </div>
                               <button 
                                   type="submit" 
                                   className="btn btn-success btn-lg mt-4"
                               >
                                   Agregar
                               </button>
                               {(error) 
                                    ? <Alert tipo="danger" mensaje="Rellene todos los campos" time={3}/>: null
                               }
                           </form>
                       </div>
                       <div className="col-12 mt-5 col-md-7 mt-md-0 col-lg-6 ">
                           {(loading) 
                               ?  <Loader/>
                               :  <div className="container">
                                       <div className="row">
                                           <div className="col-12">
                                               { <ViewCiudades
                                                   cities={cities}
                                                   countries={countries}
                                                   deleteCity={deleteCity}
                                               /> }
                                           </div>
                                       </div>
                                   </div>
                           }
                       </div>
                   </div>
               </div>
           </Fragment>
       )
    

}

export default Cities;
