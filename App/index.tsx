import React from 'react';
import Navigation from './config/Navigation';
import { api } from './util/api';

api('/latest?base=USD')
  .then((res) => {
    console.log('response', res);
  })
  .catch((error) => {
    console.log('error', error);
  });

const index = () => <Navigation />;

export default index;
