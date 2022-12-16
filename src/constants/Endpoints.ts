import { StringMap } from './Interfaces';

const endpoints: StringMap = {
  nurse: '/nurses',
  getUser: '/auth/user',
  signinUser: '/auth/signin',
  updateNurse: '/nurses/:id',
  signupNewUser: '/auth/signup',
};

export default endpoints;
