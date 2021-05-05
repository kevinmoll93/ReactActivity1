import React from 'react';
import { Redirect } from 'react-router';

export class NotFoundView extends React.Component {
    // eslint-disable-next-line
  constructor() {
    super();
   
  }

  render() {
    return <Redirect to="/"></Redirect>
  }

 
}


