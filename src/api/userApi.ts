import axiosClient from "./axiosClient";

class UserApi {
  static async getAll() {
    const url = '/api/users';
    return axiosClient.get(url);
  }
  static async getUserById(id: string) {
    const url = `/api/users/${id}`;
    return axiosClient.get(url);
  }
  static async getProfile() {
    const url = `/api/profile`;
    return axiosClient.get(url);
  }

  static async resetPassword() {
    const url = `/api/reset-password`;
    return axiosClient.post(url);
  }

  static async changePassword(data: any) {
    const url = `/api/change-password`;
    return axiosClient.post(url, data);
  }
}

export default UserApi;
