import axiosClient from './axiosClient';
import AppState from '@/redux/store';
import {ClassModel} from '@/models/class';

class ClassApi {
  constructor() {}

  static async all() {
    const url = '/api/groups';
    return axiosClient.get<ClassModel[]>(url);
  }

  static async findById(id: string) {
    const url = `/api/groups/${id}`;
    return axiosClient.get<ClassModel>(url);
  }

  static async findAllMemberByClassId(id: string) {
    const url = `/api/groups/${id}/members`;
    return axiosClient.get(url);
  }

  static async findAllCoOwnerByClassId(id: string) {
    const url = `/api/groups/${id}/co-owners`;
    return axiosClient.get(url);
  }

  static async addClass(data: any) {
    const url = `/api/groups`;
    return axiosClient.post(url, data);
  }
}

export default ClassApi;
