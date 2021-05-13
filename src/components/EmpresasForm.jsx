import React,{Fragment, useEffect, useState} from 'react';
import Alert from '../utils/Alert';
import Loader from 'react-loader';
import {InsertDataLocalStorage,GetDataLocalStorage,FilterData} from '../utils/Storage';
import ViewEmpresas from '../views/ViewEmpresas';


const Business = () =>{

    const  getInitialObj = () => ({
        id:Date.now(),
        country:'',
        city:'',
        name:''
    })
    
    let countries = GetDataLocalStorage('countries');
    let citiesArr = GetDataLocalStorage('cities');

    const [objBusiness, saveBusiness] = useState(getInitialObj);
    const [business, saveBusinessArr] = useState(GetDataLocalStorage('business'));
    const [cities, updateCities] = useState([]);
    const [error,saveError] = useState(false);
    const [loading,saveLoading] = useState(false);
    const{country,city,name} = objBusiness;
    
    useEffect(()=>{
        if(objBusiness.country==='') return;
         const filterCities = () => {
            const filterCities =citiesArr.filter(city => Number(city.country) === Number(country));
            updateCities(filterCities);
            saveBusiness({...objBusiness,[city] :''})
         }
        filterCities();
    },[objBusiness.country])
    
    useEffect(()=>{
        
        const writeBusiness = () =>{
            setTimeout(() => {
                InsertDataLocalStorage('business',business)
                saveLoading(false)
                saveBusiness(getInitialObj)
            }, 2000);
        }
        writeBusiness();
    },[business])

    const updateState = (e) => {
        saveError(false);
        saveBusiness({...objBusiness,[e.target.name] :e.target.value})
    }

    const addBusiness = (e) => {
        e.preventDefault();
        
        if(country.trim() === '' || name.trim() === '' || city.trim() === ''){
            saveError(true);
            return;
        }
        saveLoading(true);
        saveBusinessArr([...business,objBusiness]);
    }

    const deleteBusiness = (IdBusiness) =>{
       saveLoading(true);
       const result = FilterData('business',IdBusiness);
       saveBusinessArr(result);
    }

    return (
            <Fragment>
               <h3 className="text-center text-underline mt-5 mb-5">Agregar Empresas</h3>
               <div className="container-fluid">
                   <div className="row ml-0 ml-lg-5">
                       <div className="col-12 col-md-5  col-lg-6">
                           <form
                              onSubmit={addBusiness} 
                           >    
                                <div className="row">
                               
                               <div className="col-12">
                                       <label htmlFor="name" className="mt-4" >Nombre de la empresa</label>
                                       <input 
                                           type="text" 
                                           id="name" 
                                           name="name"
                                           className="form-control" 
                                           placeholder="Ingrese el nombre del pais"
                                           onChange={updateState}
                                            value={name}
                                       />
                                   </div>
                                   <div className="col-12">

                                       <label htmlFor="country" >Pais</label>
                                       <select 
                                            className="custom-select" 
                                            id="country"
                                            name="country"
                                            onChange={updateState}
                                            value={country}
                                            >
                                           <option value="">Seleccionar Pais</option>
                                           {countries.map((country,index) => (
                                            <option key={index} value={Number(country.id)} >{country.name}</option>
                                          ))}
                                        </select>
                                   </div>
                                   <div className="col-12">
                                       <label htmlFor="city" >Ciudad</label>
                                       <select 
                                            className="custom-select" 
                                            id="city"
                                            name="city"
                                            value={city}
                                            onChange={updateState}
                                            >
                                            <option value="">Seleccionar Ciudad</option>
                                          { cities.map((city,index) => (
                                            <option key={index} value={Number(city.id)} >{city.name}</option>
                                          ))}
                                        </select>
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
                                               <ViewEmpresas
                                               businessArr = {business}
                                               deleteBusinessParent={deleteBusiness}
                                               />
                                           </div>
                                       </div>
                                   </div>
                           }
                       </div>
                   </div>
               </div>
           </Fragment>
        );
      }
    

export default Business;

