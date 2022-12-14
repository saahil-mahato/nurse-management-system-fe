import environment from '../config';

import { StringMap } from './Interfaces';

const endpoints: StringMap = {
  nurse: `${environment}/nurses`,
  signinUser: `${environment}/auth/signin`,
  signupNewUser: `${environment}/auth/signup`,
  updateNurse: `${environment}/nurses/:id`,
};

export default endpoints;
