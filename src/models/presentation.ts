import {v4 as uuidv4} from 'uuid';

export type TemplatePage = 'default' | 'multiple-choice';
export type ChartType = 'pie-chart' | 'bar-chart';
export interface SlideModel {
  type: TemplatePage;
  title: string;
  paragraph: string,
  backgroundImage: string;
}

export interface OptionModel {
  uuid: string,
  name: string;
  value: number;
}
export interface MultipleChoiceModel extends SlideModel {
  options: OptionModel[];
}

export const MockMultipleChoice: MultipleChoiceModel = {
  type: 'multiple-choice',
  title: '',
  backgroundImage: '',
  paragraph: '',
  options: [
    {uuid: uuidv4(), name: '', value: 0},
    {uuid: uuidv4(), name: '', value: 0},
    {uuid: uuidv4(), name: '', value: 0},
  ],
};

export interface PresentationModel {
  uuid: string;
  name: string;
  hostId: string;
  accessCode: string;
  slides: MultipleChoiceModel[];
}

export interface PresentationState {
  data: PresentationModel;
  status: 'loading' | 'failed' | 'idle';
  presentationList: any[];
}

export const MOCK_PRESENTATION_MODEL: PresentationModel = {
  uuid: 'test',
  name: 'DEV_TEST_PRESENTATION',
  hostId: 'DEV_',
  accessCode: 'DEV_ACCESS_CODE',
  slides: [MockMultipleChoice],
};
