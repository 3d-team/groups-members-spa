export type TemplatePage = 'default' | 'multiple-choice';
export type ChartType = 'pie-chart' | 'bar-chart';
export interface PageModel {
  type: TemplatePage;
  title: string;
  backgroundImage: string;
}

export interface OptionModel {
  name: string;
  value: number;
}
export interface MultipleChoiceModel extends PageModel {
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
