import React, { useState, useEffect } from 'react';
import { validateInputForm } from '../utils/validate';

const CiudadesForm = ({ addPlaces, countries, uPlace, updatePlaces }) => {
  const [places, chargePlaces] = useState('');
  const [countrieState, chargeCountries] = useState(0);
  const [visible, chargeVisible] = useState(true);
  const [update, chargeUpdate] = useState(false);
  const [placeId, chargePlaceId] = useState(0);
  const [nameBtn, chargeNameBtn] = useState('Agregar');

  const addValue = e => {
    let htmlParent;
    if (e.target.id !== 'countries') {
      htmlParent = e.target.parentElement.querySelector('input');
      chargePlaces(htmlParent.value);
    } else {
      htmlParent = e.target;
      chargeCountries(htmlParent.value);
    }
    btnVisible(e);
  };

  useEffect(() => {
    if (uPlace.length > 0) {
      updateP(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uPlace]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  function updateP(update) {
    chargeUpdate(update);
    if (update) {
      chargeNameBtn('Actualizar');
      chargePlaces(uPlace[0].name);
      chargeCountries(uPlace[0].countrieId);
      chargePlaceId(uPlace[0].id);
      chargeVisible(false);
    } else {
      chargeNameBtn('Agregar');
      chargePlaces('');
      chargeCountries(0);
      chargePlaceId(0);
      chargeVisible(true);
    }
  }

  function btnVisible(e) {
    if (validateInputForm(e)) {
      chargeVisible(true);
    } else {
      chargeVisible(false);
    }
  }

  const addItem = e => {
    if (e) {
      e.preventDefault();
    }

    let placesObj;
    if (placeId > 0) {
      placesObj = {
        name: places,
        countrieId: Number(countrieState),
        id: Number(placeId),
      };
      updatePlaces(placesObj);
    } else {
      placesObj = {
        name: places,
        countrieId: Number(countrieState),
      };
      addPlaces(placesObj);
    }

    chargePlaces('');
    updateP(false);
    e.target.reset();
    btnVisible(e);
  };
  return (
    <>
          <h3 className="text-center text-underline mt-5 mb-5">Agregar Ciudades</h3>
          <div className="container-fluid">
            <div className="row ml-0 ml-lg-5">
              <div className="col-12 col-md-5  col-lg-6">
                <form onSubmit={addItem}>
                      <div className="col">
                  <label htmlFor="nombre" className="mt-4" >Nombre de la ciudad</label>
                    <input
                    type="text"
                    id="places"
                    className="form-control"
                    placeholder="Ingresar Nombre de Ciudad"
                    onChange={e => addValue(e)}
                    onKeyDown={e => addValue(e)}
                    value={places}
                    required
                  />
                      </div>
                      <div className="row">
                      <div className="col-12">
                      <label htmlFor="pais" >Pais</label>
                          <select
                            className="form-select"
                            id="countries"
                            onChange={e => addValue(e)}
                            onKeyDown={e => addValue(e)}
                            required>
                            <option value="0">Seleccionar Pais</option>
                            {countries.map(countrie => {
                              const { name, id } = countrie;
                              if (!update) {
                                return (
                                  <option key={id} value={id}>
                                    {name}
                                  </option>
                                );
                              } else if (uPlace[0].countrieId === id) {
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
                          <input type="text" value={placeId} readOnly hidden />
                        
                          <button disabled={visible} className="btn btn-success btn-lg mt-4" type="submit">
                            {nameBtn}
                          </button>
                          
                          {update ? (
                            <button
                              className="btn btn-danger btn-lg mt-4"
                              type="button"
                              onClick={() => updateP(false)}>
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
export default CiudadesForm;

