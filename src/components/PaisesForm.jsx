import React, { Fragment,useEffect,useState } from 'react';
import Alert from '../utils/Alert';
import Loader from 'react-loader';
import {GetDataLocalStorage,InsertDataLocalStorage,FilterData} from '../utils/Storage';
import ViewPaises from '../views/ViewPaises';
import '../assets/css/App.css'

const Country = () => {

    const  getInitialObj = () => ({
        id:Date.now(),
        code:'',
        name:''
    })
    
    const[objCountry,saveCountry] = useState(getInitialObj);
    const[countries,saveCountries]= useState(GetDataLocalStorage('countries'));
    const[error,saveError] = useState(false);
    const[loading,saveLoading] = useState(false);
    
    useEffect(()=>{
        
        const writeCountries = () =>{
            setTimeout(() => {
                InsertDataLocalStorage('countries',countries)
                saveLoading(false)
                saveCountry(getInitialObj)
            }, 2000);
        }
        writeCountries();
    },[countries])
  
    const updateState = (e) => {
        saveError(false);
        saveCountry({...objCountry,[e.target.name] :e.target.value})
    }

     const{code,name}= objCountry;

     const addCountry = (e) => {
        e.preventDefault();
        
        if(code.trim() === '' || name.trim() === ''){
            saveError(true);
            return;
        }
        saveLoading(true);
        saveCountries([...countries,objCountry]);
    }

     const deleteCountry = (paisId) =>{
         saveLoading(true); 
        const result = FilterData('countries',paisId);
        saveCountries(result);
     }

    return (  
        <Fragment>
                <h3 className="text-center text-underline mt-5 mb-5">Agregar Pais y su Id</h3>
                <div className="container-fluid">
                    <div className="row ml-0 ml-lg-5">
                        <div className="col-12 col-md-5  col-lg-6">
                            <form
                                onSubmit={addCountry}
                            >
                                <div className="row">
                                    <div className="col-12">
                                        <label htmlFor="ID" >Id del pais</label>
                                        <input 
                                            type="text" 
                                            id="code" 
                                            name="code"
                                            className="form-control" 
                                            placeholder="Ingrese Id del pais"
                                            onChange={updateState}
                                            value={code}
                                        />
                                    </div>
                                    <div className="col">
                                        <label htmlFor="nombre" className="mt-4" >Nombre del pais</label>
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
                                                <ViewPaises 
                                                    countries ={countries}
                                                    deleteCountry={deleteCountry}
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
 
export default Country;

