import React, { useState, useEffect } from 'react';
import { alertaError, alertaBorrar } from '../utils/Alert2';
import { getCountries, getPlaces, getOrganizations, postPlaces, deletePlaces, putPlaces } from '../utils/api';
import CiudadesForm from '../components/CiudadesForm';
import CiudadesList from '../components/CiudadesList';
import Spinner from '../components/Spinner';

export const ViewCiudades = () => {
  const [places, chargePlaces] = useState([]);
  const [countries, chargeCountries] = useState([]);
  const [organization, chargeOrganization] = useState([]);
  const [spinner, chargeSpinner] = useState(false);
  const [uPlace, chargeUplace] = useState([]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    chargeSpinner(true);
    await Promise.all([getPlaces(), getCountries(), getOrganizations()]).then(
      resp => {
        chargePlaces(resp[0]);
        chargeCountries(resp[1]);
        chargeOrganization(resp[2]);
      },
    );
    chargeSpinner(false);
  }, []);
  let component;
  if (spinner) {
    component = <Spinner />;
  } else {
    component = (
      <CiudadesList
        list={places}
        deleteP={deleteP}
        countries={countries}
        objPlace={objPlace}
      />
    );
  }
  function objPlace(id) {
    const c = places.filter(c => c.id === id);
    chargeUplace(c);
  }
  async function updatePlaces(place) {
    chargeSpinner(true);
    await putPlaces(place);
    const placeApi = await getPlaces();
    chargePlaces(placeApi);
    chargeSpinner(false);
  }
  const addPlaces = async places => {
    chargeSpinner(true);
    await postPlaces(places);
    const placesApi = await getPlaces(places);
    chargePlaces(placesApi);
    chargeSpinner(false);
  };

  function deleteP(id) {
    let countriesOrg = organization.some(e => e.placeId === id);
    if (countriesOrg) {
      alertaError(
        'The city you want to delete is related to a country. Check and try again',
      );
      return;
    }
    chargeSpinner(true);
    alertaBorrar().then(async resp => {
      if (resp) {
        const result = await deletePlaces(id);
        if (result.status === 200) {
          const placesApi = await getPlaces();
          chargePlaces(placesApi);
        }
      }
      chargeSpinner(false);
    });
  }
  return (
    <>
      <CiudadesForm
        addPlaces={addPlaces}
        updatePlaces={updatePlaces}
        countries={countries}
        uPlace={uPlace}
      />
      {component}
    </>
  );
};


