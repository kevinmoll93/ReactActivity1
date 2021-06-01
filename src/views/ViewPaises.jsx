import React, { useState, useEffect } from 'react';
import { alertaError, alertaBorrar } from '../utils/Alert2';
import { getCountries, postCountries, deleteCountries, getPlaces, putCountries } from '../utils/api';
import PaisesForm from '../components/PaisesForm';
import PaisesList from '../components/PaisesList';
import Spinner from '../components/Spinner';

export const ViewPaises = () => {
  const [countries, chargeCountries] = useState([]);
  const [places, chargePlaces] = useState([]);
  const [spinner, chargeSpinner] = useState(false);
  const [uCountrie, chargeUcountrie] = useState([]);

  //components variables
  let component;
  if (spinner) {
    component = <Spinner />;
  } else {
    component = (
      <PaisesList
        listado={countries}
        deleteCountrie={deleteCountrie}
        updCountrie={updCountrie}
      />
    );
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    chargeSpinner(true);
    await Promise.all([getCountries(), getPlaces()]).then(resp => {
      chargeCountries(resp[0]);
      chargePlaces(resp[1]);
    });
    chargeSpinner(false);
  }, []);

  function updCountrie(id) {
    const c = countries.filter(c => c.id === id);
    chargeUcountrie(c);
  }
  const addCountrie = async countries => {
    chargeSpinner(true);
    await postCountries(countries);
    const countriesApi = await getCountries();
    chargeCountries(countriesApi);
    chargeSpinner(false);
  };
  async function updateCountries(countrie) {
    chargeSpinner(true);
    await putCountries(countrie);
    const countriesApi = await getCountries();
    chargeCountries(countriesApi);
    chargeSpinner(false);
  }
  async function deleteCountrie(id) {
    const countriePlaces = places.some(c => c.countrieId === id);
    if (countriePlaces) {
      alertaError(
        'The country you want to delete is associated with a city. Check and try again',
      );
      return;
    }
    chargeSpinner(true);
    alertaBorrar().then(async resp => {
      if (resp) {
        const result = await deleteCountries(id);
        if (result.status === 200) {
          const countriesApi = await getCountries();
          chargeCountries(countriesApi);
        }
      }
      chargeSpinner(false);
    });
  }

  return (
    <>
      <PaisesForm
        addCountrie={addCountrie}
        uCountrie={uCountrie}
        updateCountries={updateCountries}
      />
      {component}
    </>
  );
};

