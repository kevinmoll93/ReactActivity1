import React, {Fragment,useEffect,useState} from 'react';
import Alert from '../utils/Alert';
import Loader from 'react-loader';
import {GetDataLocalStorage,InsertDataLocalStorage,FilterData} from '../utils/Storage';
import JobList from '../views/JobList';

const JobForm = () =>{

    const  getInitialObj = () => ({
        id:Date.now(),
        job:'',
        business:'',
    })
    

    const [objJob, saveJob] = useState(getInitialObj);
    const [jobs, saveJobs] = useState(GetDataLocalStorage('jobs'));
    const [error,saveError] = useState(false);
    const [loading,saveLoading] = useState(false);
    
    let businessArr = GetDataLocalStorage('business');

    useEffect(()=>{
        
        const writeJob = () =>{
            setTimeout(() => {
                InsertDataLocalStorage('jobs',jobs)
                saveLoading(false)
                saveJob(getInitialObj)
            }, 2000);
        }
        writeJob();
    },[jobs])

    const updateState = (e) => {
        saveError(false);
        saveJob({...objJob,[e.target.name] :e.target.value})
    }

    const {job,business} = objJob;
    const addJob = (e) => {
        e.preventDefault();
        
        if(job.trim() === '' || business.trim() === ''){
            saveError(true);
            return;
        }
        saveLoading(true);
        saveJobs([...jobs,objJob]);
    }

     const deleteJob = (IdJob) =>{
       saveLoading(true);
       const result = FilterData('jobs',IdJob);
       saveJobs(result);
    } 

    return(

        <Fragment>
        <h3 className="text-center text-underline mt-5 mb-5">Agregar Puestos de Trabajo</h3>
        <div className="container-fluid">
            <div className="row ml-0 ml-lg-5">
                <div className="col-12 col-md-4  col-lg-6">
                    <form
                       onSubmit={addJob}
                    >    
                         <div className="row">
                        
                        <div className="col-12">
                                <label htmlFor="job" className="mt-4" >Puesto de trabajo</label>
                                <input 
                                    type="text" 
                                    id="job" 
                                    name="job"
                                    className="form-control" 
                                    placeholder="Ingrese el nombre del puesto de trabajo"
                                    onChange={updateState}
                                    value={job}
                                    
                                />
                            </div>
                            <div className="col-12">

                                <label htmlFor="business" >Empresa</label>
                                <select 
                                     className="custom-select" 
                                     id="business"
                                     name="business"
                                     onChange={updateState}
                                     value={business}
                                     >
                                    <option value="">Seleccionar Empresa</option>
                                     {businessArr.map((business,index) => (
                                     <option key={index} value={Number(business.id)} >{business.name}</option>
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
                <div className="col-12 mt-5 col-md-8 mt-md-0 col-lg-6 ">
                    {(loading) 
                        ?  <Loader/>
                        :  <div className="container">
                                <div className="row">
                                    <div className="col-12">
                                        <JobList
                                        deleteJob={deleteJob}
                                        jobs={jobs}
                                        />
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

export default JobForm;
