import axiosClient from './axiosClient';
import {PresentationModel} from '@/models/presentation';

class PresentationApi {
  constructor() {}

  static async all() {
    const url = '/api/presentations';
    return axiosClient.get<PresentationModel[]>(url);
  }

  static async findById(id: string) {
    const url = `/api/presentations/${id}`;
    return axiosClient.get<PresentationModel>(url);
  }

  static async addPresentation(data: any) {
    const url = `/api/presentations`;
    return axiosClient.post(url, data);
  }

  static async findAllSlideByPresentationId(id: string) {
    const url = `/api/presentations/${id}/slides`;
    return axiosClient.get(url);
  }
}

export default PresentationApi;
