import React, { useState, useEffect } from 'react';
import { validateInputForm } from '../utils/validate';

const EmpresasForm = ({ addOrg, placesA, uOrg, updateOrg }) => {
  const [org, chargeOrg] = useState('');
  const [place, chargePlace] = useState(0);
  const [visible, chargeVisible] = useState(true);
  const [update, chargeUpdate] = useState(false);
  const [orgId, chargeOrgId] = useState(0);
  const [nameBtn, chargeNameBtn] = useState('Agregar');

  useEffect(() => {
    if (uOrg.length > 0) {
      updateO(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uOrg]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  function updateO(update) {
    chargeUpdate(update);
    if (update) {
      chargeNameBtn('Actualizar');
      chargeOrg(uOrg[0].name);
      chargePlace(uOrg[0].placeId);
      chargeOrgId(uOrg[0].id);
      chargeVisible(false);
    } else {
      chargeNameBtn('Agregar');
      chargeOrg('');
      chargePlace(0);
      chargeOrgId(0);
      chargeVisible(true);
    }
  }

  const addValue = e => {
    if (e.target.id !== 'place') {
      chargeOrg(e.target.parentElement.querySelector('input').value);
    } else {
      chargePlace(e.target.value);
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

  const addItem = e => {
    if (e) {
      e.preventDefault();
    }

    let empresaObj;
    if (orgId > 0) {
      empresaObj = {
        name: org,
        placeId: Number(place),
        id: Number(orgId),
      };

      updateOrg(empresaObj);
    } else {
      empresaObj = {
        name: org,
        placeId: Number(place),
      };
      addOrg(empresaObj);
    }

    chargeOrg('');
    chargePlace(0);
    updateO(false);
    e.target.reset();
    btnVisible(e);
  };

  return (
    <>
               <h3 className="text-center text-underline mt-5 mb-5">Agregar Empresas</h3>
               <div className="container-fluid">
                   <div className="row ml-0 ml-lg-5">
                       <div className="col-12 col-md-5  col-lg-6">
                          <form onSubmit={addItem}>
                          <div className="row">
                               <div className="col-12">
                                       <label htmlFor="name" className="mt-4" >Nombre de la empresa</label>
                                        <input
                                          type="text"
                                          id="organization"
                                          className="form-control"
                                          placeholder="Ingrese nombre de la empresa"
                                          onChange={e => addValue(e)}
                                          onKeyDown={e => addValue(e)}
                                          value={org}
                                          required
                                        />
                                        </div>
                                         <div className="col-12">
                                       <label htmlFor="city" >Ciudad</label>
                                          <select
                                            className="form-select"
                                            id="place"
                                            onChange={e => addValue(e)}
                                            onKeyDown={e => addValue(e)}
                                            required>
                                            <option value="0">Seleccionar Ciudad</option>
                                            {placesA.map(p => {
                                              const { name, id } = p;
                                              if (!update) {
                                                return (
                                                  <option key={id} value={id}>
                                                    {name}
                                                  </option>
                                    );
                                  } else if (Number(uOrg[0].placeId) === Number(id)) {
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
                              <input type="text" value={orgId} readOnly hidden />
                              </div>
                               </div>
                              <button disabled={visible} className="btn btn-success btn-lg mt-4" type="submit">
                                {nameBtn}
                              </button>

                              {update ? (
                                <button
                                  className="btn btn-danger btn-lg mt-4"
                                  type="button"
                                  onClick={() => updateO(false)}>
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

export default EmpresasForm;

