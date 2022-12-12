export interface PresentationModel {
    uuid: string;
    name: string;
    ownerId: string;
    accessCode: string;
    slideIds: string[];
  }
  
  export interface PresentationState {
    data: PresentationModel;
    status: 'loading' | 'failed' | 'idle';
    presentationList: any[];
  }
  