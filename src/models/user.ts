export interface UserModel {
  id: string;
  name: string;
  email: string;
  age: number;
  dob: string;
  mssv: string;
}

export interface UserState {
  data: UserModel;
  status: 'loading' | 'failed' | 'idle';
}
