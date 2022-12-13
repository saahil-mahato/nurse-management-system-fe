import axios, { AxiosResponse } from 'axios';

import endpoints from '../constants/Endpoints';
import { NurseData } from '../constants/Interfaces';

/**
 * Function to get all nurses.
 *
 * @returns {Promise<AxiosResponse<any, any>>}
 */
export const getAllNurses = async (): Promise<AxiosResponse<any, any>> => {
  const nurses = await axios.get(endpoints.getAllNurses);

  return nurses;
};

/**
 * Function to add a new nurse.
 *
 * @param {NurseData} nurseData - The details of the nurse.
 * @returns {Promise<AxiosResponse<any, any>>}
 */
export const addNewNurse = async (
  nurseData: NurseData,
): Promise<AxiosResponse<any, any>> => {
  const response = await axios.post(endpoints.addNewNurse, nurseData);

  return response;
};
