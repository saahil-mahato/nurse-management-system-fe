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
