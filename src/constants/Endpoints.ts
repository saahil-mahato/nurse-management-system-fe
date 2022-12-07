import { environment } from '../config';

import { StringMap } from './Interfaces';

const endpoints: StringMap = {
  signupNewUser: `${environment}/auth/signup`,
};

export default endpoints;
