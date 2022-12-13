export type TemplatePage = 'default' | 'multiple-choice';
export type ChartType = 'pie-chart' | 'bar-chart';
export interface SlideModel {
  type: TemplatePage;
  title: string;
  backgroundImage: string;
}

export interface OptionModel {
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
  options: [
    {name: '', value: 0},
    {name: '', value: 0},
    {name: '', value: 0},
  ],
};

export interface PresentationModel {
  uuid: string;
  name: string;
  ownerId: string;
  accessCode: string;
  slides: MultipleChoiceModel[];
}

export interface PresentationState {
  data: PresentationModel;
  status: 'loading' | 'failed' | 'idle';
  presentationList: any[];
}
