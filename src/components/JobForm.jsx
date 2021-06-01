import React, { useState, useEffect } from 'react';
import { validateInputForm } from '../utils/validate';

export const JobForm = ({ addJobs, organization, uJob, updateJob }) => {
  //State
  const [org, chargeOrg] = useState(0);
  const [position, chargePosition] = useState('');
  const [description, chargeDesc] = useState('');
  const [visible, chargeVisible] = useState(true);
  const [update, chargeUpdate] = useState(false);
  const [jobId, chargeJobId] = useState(0);
  const [nameBtn, chargeNameBtn] = useState('Actualizar');

  useEffect(() => {
    if (uJob.length > 0) {
      updateJ(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uJob]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  function updateJ(update) {
    chargeUpdate(update);
    if (update) {
      chargeNameBtn('Actualizar');
      chargeOrg(uJob[0].organizationId);
      chargeDesc(uJob[0].description);
      chargePosition(uJob[0].position);
      chargeJobId(uJob[0].id);
      chargeVisible(false);
    } else {
      chargeNameBtn('Agregar');
      chargeOrg(0);
      chargeDesc('');
      chargePosition('');
      chargeJobId(0);
      chargeVisible(true);
    }
  }

  const addItem = e => {
    if (e) {
      e.preventDefault();
    }

    let jobsObj;
    if (jobId > 0) {
      jobsObj = {
        position,
        description,
        organizationId: Number(org),
        id: Number(jobId),
      };
      updateJob(jobsObj);
    } else {
      jobsObj = {
        position,
        description,
        organizationId: Number(org),
      };
      addJobs(jobsObj);
    }

    chargeDesc('');
    chargePosition('');
    chargeOrg(0);
    updateJ(false);
    e.target.reset();
    btnVisible(e);
  };

  const addValue = e => {
    if (e.target.id === 'position') {
      chargePosition(e.target.parentElement.querySelector('#position').value);
    } else if (e.target.id === 'description') {
      chargeDesc(e.target.parentElement.querySelector('#description').value);
    } else {
      chargeOrg(e.target.value);
    }

    btnVisible(e);
  };

  const btnVisible = e => {
    if (validateInputForm(e)) {
      chargeVisible(true);
    } else {
      chargeVisible(false);
    }
  };

  return (
    <>
    <h3 className="text-center text-underline mt-5 mb-5">Agregar Puestos de Trabajo</h3>
        <div className="container-fluid">
            <div className="row ml-0 ml-lg-5">
                <div className="col-12 col-md-4  col-lg-6">
                  <form onSubmit={addItem}>
                  <div className="row">
                        
                        <div className="col-12">
                                <label htmlFor="job" className="mt-4" >Puesto de trabajo</label>
                                    <input
                                      type="text"
                                      id="position"
                                      className="form-control"
                                      placeholder="Escribir Puesto de trabajo"
                                      onChange={e => addValue(e)}
                                      onKeyDown={e => addValue(e)}
                                      value={position}
                                      required
                                    />
                                    <input
                                      type="text"
                                      id="description"
                                      className="form-control"
                                      placeholder="Descripcion del puesto de trabajo"
                                      onChange={e => addValue(e)}
                                      onKeyDown={e => addValue(e)}
                                      value={description}
                                      required
                                    />
                                     </div>
                              <div className="col-12">
                                <label htmlFor="business" >Empresa</label>
                                  <select
                                    className="form-select"
                                    id="org"
                                    onChange={e => addValue(e)}
                                    onKeyDown={e => addValue(e)}
                                    required>
                                    <option value="0">Seleccionar Empresa</option>
                                    {organization.map(e => {
                                      const { name, id } = e;
                                      if (!update) {
                                        return (
                                          <option key={id} value={id}>
                                            {name}
                                          </option>
                                        );
                                      } else if (Number(uJob[0].organizationId) === Number(id)) {
                                        return (
                                          <option key={id} value={id} selected>
                                            {name}
                                          </option>
                                        );
                                      } else {
                                        return (
                                          <option key={id} value={id}>
                                            {name}
                                          </option>
                                        );
                                      }
                                    })}
                                  </select>
                                  </div>
                            </div>
          <input type="text" value={jobId} readOnly hidden />
          <button disabled={visible} className="btn btn-success btn-lg mt-4" type="submit">
            {nameBtn}
          </button>

          {update ? (
            <button
              className="btn btn-danger btn-lg mt-4"
              type="button"
              onClick={() => updateJ(false)}>
              Cancelar
            </button>
          ) : (
            ''
          )}
      </form>
            </div>
          </div>
      </div>
    </>
  );
};