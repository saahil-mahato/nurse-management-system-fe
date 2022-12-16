import { AxiosResponse } from 'axios';

import http from './HttpService';

import endpoints from '../constants/Endpoints';
import { UserData, UserSigninData } from '../constants/Interfaces';

/**
 * Function to signin a user.
 *
 * @param {UserSigninData} userSigninData - The credentials of the user.
 */
export const signinUser = async (userSigninData: UserSigninData) => {
  await http.post(endpoints.signinUser, userSigninData);
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
  const response = await http.post(endpoints.signupNewUser, userData);

  return response;
};

/**
 * Function to get a user.
 *
 */
export const getUser = async (): Promise<AxiosResponse<any, any>> => {
  const response = await http.get(endpoints.getUser);

  return response;
};
