import axios, { AxiosResponse } from 'axios';

import { UserData } from '../constants/Interfaces';
import endpoints from '../constants/Endpoints';

const signupNewUser = async (
  userData: UserData,
): Promise<AxiosResponse<any, any>> => {
  const response = await axios.post(endpoints.signupNewUser, userData);

  return response;
};

export default signupNewUser;
