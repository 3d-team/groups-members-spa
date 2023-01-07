export interface QuestionModel {
  uuid: string,
  tittle: string;
  content: string;
  status: 'NEW' | 'ANSWERED';
  voterIds: string[];
  answers: string[];
  groupId: string;
}

export interface QuestionState {
    data: QuestionModel;
    status: 'loading' | 'failed' | 'idle';
    questionList: any[];
}

export interface AnswerModel {
  uuid: string;
  answererId: string;
  answerer: string;
  content: string;
  questionId: string;
}