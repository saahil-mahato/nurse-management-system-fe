import axios from 'axios';

import environment from '../config';

const http = axios.create({
  baseURL: environment,
  timeout: 5000,
  withCredentials: true,
});

export default http;
