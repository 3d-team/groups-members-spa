import axiosClient from "./axiosClient";

class UserApi {
  static async getAll() {
    const url = '/users';
    return axiosClient.get(url);
  }
  static async getUserById(id: number) {
    const url = `/users/${id}`;
    return axiosClient.get(url);
  }
}

export default UserApi;
