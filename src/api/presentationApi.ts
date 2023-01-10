import axiosClient from './axiosClient';
import {PresentationModel} from '@/models/presentation';
import { MultipleChoiceModel } from '@/models/presentation';

class PresentationApi {
  constructor() {}

  static async all() {
    const url = '/api/presentations';
    return axiosClient.get<PresentationModel[]>(url);
  }

  static async findById(id: string) {
    const url = `/api/presentations/${id}`;
    return axiosClient.get<PresentationModel, PresentationModel>(url);
  }

  static async addPresentation(data: any) {
    const url = `/api/presentations`;
    return axiosClient.post(url, data);
  }

  static async findAllSlideByPresentationId(id: string) {
    const url = `/api/presentations/${id}/slides`;
    return axiosClient.get(url);
  }

  static async updateSlides(id: string, data: MultipleChoiceModel[]) {
    const url = `/api/presentations/${id}/slides`;
    return axiosClient.put(url, data);
  }

  static async share(id: string) {
    const url = `/api/presentations/${id}/share`;
    return axiosClient.post(url);
  }

  static async voting(presentationId: string, data: any) {
    const url = `/api/presentations/${presentationId}/voting`;
    return axiosClient.post(url, data);
  }
}

export default PresentationApi;
