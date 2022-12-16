import { AxiosResponse } from 'axios';

import http from './HttpService';

import endpoints from '../constants/Endpoints';
import { NurseData } from '../constants/Interfaces';

/**
 * Function to get all nurses.
 *
 * @returns {Promise<AxiosResponse<any, any>>}
 */
export const getAllNurses = async (): Promise<AxiosResponse<any, any>> => {
  const nurses = await http.get(endpoints.nurse);

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
  const response = await http.post(endpoints.nurse, nurseData);

  return response;
};

/**
 * Function to update a nurse.
 *
 * @param {string} id - the id of the nurse.
 * @param  {NurseData} nurseData - The details of the nurse.
 * @returns {Promise<AxiosResponse<any, any>>}
 */
export const updateNurse = async (
  id: string,
  nurseData: NurseData,
): Promise<AxiosResponse<any, any>> => {
  const response = await http.put(`${endpoints.nurse}/${id}`, nurseData);

  return response;
};

/**
 * Function to delete a nurse.
 *
 * @param {string} id - the id of the nurse.
 * @returns {Promise<AxiosResponse<any, any>>}
 */
export const deleteNurse = async (
  id: string,
): Promise<AxiosResponse<any, any>> => {
  const response = await http.delete(`${endpoints.nurse}/${id}`);

  return response;
};
