import axiosClient from "./axiosClient";

class ClassApi {
  static async getAll() {
    const url = '/class';
    return axiosClient.get(url);
  }
  static async getClassById(id: string) {
    const url = `/class/${id}`;
    return axiosClient.get(url);
  }

}

export default ClassApi;
