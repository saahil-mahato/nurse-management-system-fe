import axios, { AxiosResponse } from 'axios';

import endpoints from '../constants/Endpoints';
import { UserData, UserSigninData } from '../constants/Interfaces';

/**
 * Function to signin a user.
 *
 * @param {UserSigninData} userSigninData - The credentials of the user.
 */
export const signinUser = async (userSigninData: UserSigninData) => {
  await axios.post(endpoints.signinUser, userSigninData, {
    withCredentials: true,
  });
};

/**
 * Function to add a new user to database.
 *
 * @param {UserData} userData - The details of the user.
 * @returns {Promise<AxiosResponse<any, any>>}
 */
export const signupNewUser = async (
  userData: UserData,
): Promise<AxiosResponse<any, any>> => {
  const response = await axios.post(endpoints.signupNewUser, userData);

  return response;
};
