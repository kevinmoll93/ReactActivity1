import React, { useState, useEffect } from 'react';
import { alertaBorrar, alertaError } from '../utils/Alert2';
import { getCountries, getPlaces, getOrganizations, getJobs, postOrganizations, deleteOrganizations, putOrganizations } from '../utils/api';
import EmpresasForm from '../components/EmpresasForm';
import EmpresasList from '../components/EmpresasList';
import Spinner from '../components/Spinner';

export const ViewEmpresas = () => {
  const [organizations, chargeOrg] = useState([]);
  const [countries, chargeCountries] = useState([]);
  const [places, chargePlaces] = useState([]);
  const [jobs, chargeJobs] = useState([]);
  const [spinner, chargeSpinner] = useState(false);
  const [uOrg, chargeUOrg] = useState([]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    chargeSpinner(true);
    await Promise.all([
      getOrganizations(),
      getPlaces(),
      getCountries(),
      getJobs(),
    ]).then(resp => {
      chargeOrg(resp[0]);
      chargePlaces(resp[1]);
      chargeCountries(resp[2]);
      chargeJobs(resp[3]);
    });
    chargeSpinner(false);
  }, []);

  let component;
  if (spinner) {
    component = <Spinner />;
  } else {
    component = (
      <EmpresasList
        list={organizations}
        deletOrg={deletOrg}
        places={places}
        countries={countries}
        objOrg={objOrg}
      />
    );
  }
  function objOrg(id) {
    const c = organizations.filter(c => c.id === id);
    chargeUOrg(c);
  }
  async function updateOrg(place) {
    chargeSpinner(true);
    await putOrganizations(place);
    const orgApi = await getOrganizations();
    chargeOrg(orgApi);
    chargeSpinner(false);
  }
  const addOrg = async org => {
    chargeSpinner(true);
    await postOrganizations(org);
    const orgApi = await getOrganizations();
    chargeOrg(orgApi);
    chargeSpinner(false);
  };
  function deletOrg(id) {
    const orgJobs = jobs.some(job => job.organizationId === id);
    if (orgJobs) {
      alertaError(
        'The company that you want to delete is associated with a job. Check and try again',
      );
      return;
    }
    alertaBorrar().then(async resp => {
      if (resp) {
        chargeSpinner(true);
        const result = await deleteOrganizations(id);
        if (result.status === 200) {
          const orgApi = await getOrganizations();
          chargeOrg(orgApi);
        }
      }
      chargeSpinner(false);
    });
  }

  return (
    <>
      <EmpresasForm
        addOrg={addOrg}
        placesA={places}
        uOrg={uOrg}
        updateOrg={updateOrg}
      />
      {component}
    </>
  );
};


