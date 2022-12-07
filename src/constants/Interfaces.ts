export interface StringMap {
  [key: string]: string;
}

export interface User {
  firstName: string;
  middleName: string;
  lastName: string;
  age: number;
  gender: string;
  email: string;
  contactNumber: string;
  designation: string;
}

export interface UserData {
  user: User;
  username: string;
  passwordHash: string;
}
