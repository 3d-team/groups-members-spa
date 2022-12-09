export interface UserModel {
  uuid: string;
  fullName: string;
  email: string;
  age: number;
  dob: string;
  studentId: string;
}

export interface UserState {
  data: UserModel;
  status: 'loading' | 'failed' | 'idle';
}
