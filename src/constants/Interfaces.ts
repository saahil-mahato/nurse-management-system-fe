export interface StringMap {
  [key: string]: string;
}

export interface UserDetails {
  _id?: string;
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
  dutyStartTime: number;
  dutyEndTime: number;
  workingDays: Array<string>;
}

export interface NurseTableData {
  key?: string;
  name: string;
  email: string;
  contact: string;
  workingDays: Array<string>;
  dutyStartTime: string;
  dutyEndTime: string;
}
