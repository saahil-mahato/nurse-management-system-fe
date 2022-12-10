import axios from 'axios';

import endpoints from '../constants/Endpoints';
import { UserSigninData } from '../constants/Interfaces';

/**
 * Function to signin a user.
 *
 * @param {UserSigninData} userSigninData - The credentials of the user.
 */
const signinUser = async (userSigninData: UserSigninData) => {
  await axios.post(endpoints.signinUser, userSigninData, {
    withCredentials: true,
  });
};

export default signinUser;
