import React, { useState, useEffect } from 'react';
import { validateInputForm } from '../utils/validate';

const PaisesForm = ({ addCountrie, uCountrie, updateCountries }) => {

  const [countrie, chargeCountrie] = useState('');
  const [nameBtn, chargeNameBtn] = useState('Agregar');
  const [visible, chargeVisible] = useState(true);
  const [update, chargeUpdate] = useState(false);
  const [countrieId, chargeCountrieId] = useState(0);

  useEffect(() => {
    if (uCountrie.length > 0) {
      updateC(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uCountrie]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  function updateC(update) {
    chargeUpdate(update);
    if (update) {
      chargeNameBtn('Actualizar');
      chargeCountrie(uCountrie[0].name);
      chargeCountrieId(uCountrie[0].id);
      chargeVisible(false);
    } else {
      chargeNameBtn('Agregar');
      chargeCountrie('');
      chargeCountrieId(0);
      chargeVisible(true);
    }
  }

  const addValue = e => {
    const htmlParent = e.target.parentElement.querySelector('input');
    chargeCountrie(htmlParent.value);
    btnVisible(e);
  };

  const btnVisible = e => {
    if (validateInputForm(e)) {
      chargeVisible(true);
    } else {
      chargeVisible(false);
    }
  };

  function addItem(e) {
    if (e) {
      e.preventDefault();
    }

    let countrieObj = {};

    if (countrieId === 0) {
      countrieObj = {
        name: countrie,
      };
      addCountrie(countrieObj);
    } else {
      countrieObj = {
        name: countrie,
        id: uCountrie[0].id,
      };
      updateCountries(countrieObj);
      updateC(false);
    }

    chargeCountrie('');
    e.target.reset();
    chargeVisible(true);
  }

  return (
    <>
    <h3 className="text-center text-underline mt-5 mb-5">Agregar Pais</h3>
                <div className="container-fluid">
                    <div className="row ml-0 ml-lg-5">
                        <div className="col-12 col-md-5  col-lg-6">
                          <form onSubmit={addItem}>
                          <div className="col">
                                        <label htmlFor="nombre" className="mt-4" >Nombre del pais</label>
                                            <input
                                              type="text"
                                              id="countrie"
                                              className="form-control"
                                              placeholder="Ingrese Pais"
                                              onChange={e => addValue(e)}
                                              onKeyDown={e => addValue(e)}
                                              value={countrie}
                                              required
                                            />
                                      <input type="text" value={countrieId} readOnly hidden />
                                      </div>
                                  <button disabled={visible} className="btn btn-success btn-lg mt-4" type="submit">
                                    {nameBtn}
                                  </button>

                                  {update ? (
                                    <button
                                      className="btn btn-danger btn-lg mt-4"
                                      type="button"
                                      onClick={() => updateC(false)}>
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
export default PaisesForm;
