import axios, { AxiosResponse } from 'axios';

import endpoints from '../constants/Endpoints';
import { UserData } from '../constants/Interfaces';

/**
 * Function to add a new user to database.
 *
 * @param {UserData} userData - The details of the user.
 * @returns {Promise<AxiosResponse<any, any>>}
 */
const signupNewUser = async (
  userData: UserData,
): Promise<AxiosResponse<any, any>> => {
  const response = await axios.post(endpoints.signupNewUser, userData);

  return response;
};

export default signupNewUser;
