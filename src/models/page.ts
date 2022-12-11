export type TemplatePage = 'default' | 'multiple-choice';
export type ChartType = 'pie-chart' | 'bar-chart';
export interface PageModel {
  type: TemplatePage;
  title: string;
  backgroundImage: string;
}

export interface OptionModel {
  title: string;
  value: number;
}
export interface MultipleChoiceModel extends PageModel {
  options: OptionModel[];
}
