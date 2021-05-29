import axios from 'axios';

//***************Countries***********************

//Get
export const getCountries = async () => {
  try {
    const resp = await axios.get(
      'https://api-fake-pilar-tecno.herokuapp.com/countries',
    );

    return resp.data;
  } catch (error) {
    console.log(error);
  }
};

//Post
export const postCountries = async paises => {
  try {
    const resp = await axios.post(
      'https://api-fake-pilar-tecno.herokuapp.com/countries',
      paises,
    );
    return resp;
  } catch (error) {
    console.log(error);
  }
};

//Put
export const putCountries = async countrie => {
  const { id, name } = countrie;
  const countriUpd = { name };
  try {
    const resp = await axios.put(
      `https://api-fake-pilar-tecno.herokuapp.com/countries/${id}`,
      countriUpd,
    );
    return resp;
  } catch (error) {
    console.log(error);
  }
};

// Delete

export const deleteCountries = async id => {
  try {
    const resp = axios.delete(
      `https://api-fake-pilar-tecno.herokuapp.com/countries/${id}`,
    );

    return resp;
  } catch (error) {
    console.log(error);
  }
};

//******************Places********************************

//Get
export const getPlaces = async () => {
  try {
    const reps = await axios.get(
      'https://api-fake-pilar-tecno.herokuapp.com/places?_expand=countrie',
    );

    return reps.data;
  } catch (error) {
    console.log(error);
  }
};

//Post
export const postPlaces = async places => {
  try {
    const resp = await axios.post(
      'https://api-fake-pilar-tecno.herokuapp.com/places',
      places,
    );
    return resp;
  } catch (error) {
    console.log(error);
  }
};

//Put
export const putPlaces = async place => {
  console.log(place);
  const { id, name, countrieId } = place;
  const placeUpd = { name, countrieId };
  try {
    const resp = await axios.put(
      `https://api-fake-pilar-tecno.herokuapp.com/places/${id}`,
      placeUpd,
    );
    return resp;
  } catch (error) {
    console.log(error);
  }
};

// Delete

export const deletePlaces = async id => {
  try {
    const resp = axios.delete(
      `https://api-fake-pilar-tecno.herokuapp.com/places/${id}`,
    );

    return resp;
  } catch (error) {
    console.log(error);
  }
};

//********************Organizations*****************************************

//Get
export const getOrganizations = async () => {
  try {
    const resp = await axios.get(
      'https://api-fake-pilar-tecno.herokuapp.com/organizations?_expand=place',
    );

    return resp.data;
  } catch (error) {
    console.log(error);
  }
};

//Post
export const postOrganizations = async org => {
  try {
    const resp = await axios.post(
      'https://api-fake-pilar-tecno.herokuapp.com/organizations',
      org,
    );
    return resp;
  } catch (error) {
    console.log(error);
  }
};

//Put
export const putOrganizations = async org => {
  const { id, name, placeId } = org;
  const orgUpd = { name, placeId };
  try {
    const resp = await axios.put(
      `https://api-fake-pilar-tecno.herokuapp.com/organizations/${id}`,
      orgUpd,
    );
    return resp;
  } catch (error) {
    console.log(error);
  }
};

// Delete

export const deleteOrganizations = async id => {
  try {
    const resp = axios.delete(
      `https://api-fake-pilar-tecno.herokuapp.com/organizations/${id}`,
    );

    return resp;
  } catch (error) {
    console.log(error);
  }
};

//******************************Jobs***************************
//Get
export const getJobs = async () => {
  try {
    const resp = await axios.get(
      'https://api-fake-pilar-tecno.herokuapp.com/jobs?_expand=organization',
    );

    return resp.data;
  } catch (error) {
    console.log(error);
  }
};

//Post
export const postJobs = async jobs => {
  try {
    const resp = await axios.post(
      'https://api-fake-pilar-tecno.herokuapp.com/jobs',
      jobs,
    );
    return resp;
  } catch (error) {
    console.log(error);
  }
};

//Put
export const putJobs = async job => {
  const { id, position, description, organizationId } = job;
  const jobUpd = { position, organizationId, description };

  try {
    const resp = await axios.put(
      `https://api-fake-pilar-tecno.herokuapp.com/jobs/${id}`,
      jobUpd,
    );
    return resp;
  } catch (error) {
    console.log(error);
  }
};

// Delete

export const deleteJobs = async id => {
  try {
    const resp = axios.delete(
      `https://api-fake-pilar-tecno.herokuapp.com/jobs/${id}`,
    );

    return resp;
  } catch (error) {
    console.log(error);
  }
};