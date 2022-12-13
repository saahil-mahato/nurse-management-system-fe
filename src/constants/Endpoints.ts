import environment from '../config';

import { StringMap } from './Interfaces';

const endpoints: StringMap = {
  getAllNurses: `${environment}/nurses`,
  signinUser: `${environment}/auth/signin`,
  signupNewUser: `${environment}/auth/signup`,
  addNewNurse: `${environment}/nurses/addNewNurse`,
};

export default endpoints;
