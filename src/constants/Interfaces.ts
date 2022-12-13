import { Timestamp } from 'rxjs';

export interface StringMap {
  [key: string]: string;
}

export interface UserDetails {
  firstName: string;
  middleName?: string;
  lastName: string;
  age: number;
  gender: string;
  email: string;
  contactNumber: string;
  designation: string;
}

export interface UserData {
  userDetails: UserDetails;
  username: string;
  password: string;
}

export interface UserSigninData {
  username: string;
  password: string;
}

export interface NurseData extends UserDetails {
  department: string;
  isRoundingManager: boolean;
  dutyStartTime: Timestamp<number>;
  dutyEndTime: Timestamp<number>;
  workingDays: Array<string>;
}

export interface NurseTableData {
  name: string;
  email: string;
  contact: string;
  workingDays: string;
  dutyStartTime: Timestamp<number>;
  dutyEndTime: Timestamp<number>;
}
