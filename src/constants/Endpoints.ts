import environment from '../config';

import { StringMap } from './Interfaces';

const endpoints: StringMap = {
  signinUser: `${environment}/auth/signin`,
  signupNewUser: `${environment}/auth/signup`,
};

export default endpoints;
