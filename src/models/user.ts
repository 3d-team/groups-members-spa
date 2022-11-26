export interface UserModel {
    id: string;
    name: string;
    email: string;
    age: number;
    dob: string;
}

export interface UserState {
    data: UserModel;
    status: 'loading' | 'failed' | 'idle';
}
