export interface IWebropolApiClientOptions {
  /** Webropol username for authentication */
  webropolUsername: string;
  /** Webropol password for authentication */
  webropolPassword: string;

  /** API version that should be used, for example `v1`. Uses API version `v1` by default */
  apiVersion?: string;
  /** API base url, `https://rest.webropolsurveys.com/api` by default */
  apiBaseUrl?: string;
  /** API token url, `https://rest.webropolsurveys.com/Token` by default */
  apiTokenUrl?: string;

  /** Request timeout, defaults to 120000 (120 secs) */
  timeout?: number;
}

export interface IWebropolApiFilter {
  StartDate?: string;
  EndDate?: string;
  RespondentId?: string;
}

export interface ISurvey {
  SurveyId: string;
  SurveyTitle: string;
  Status: string;
  ParentId: string;
  ReadAccess: boolean;
  WriteAccess: boolean;
  isPublished: boolean;
  CreationDate: string;
}

export interface IQuestion {
  QuestionId: string;
  QuestionText: string;
  QuestionOrderNumber: number;
}

export interface ISurveyAnswers {
  SurveyId: string;
  SurveyAnswers: ISurveyRespondent[];
}

export interface ISurveyRespondent {
  RespondentId: string;
  ResponseId: string;
  RespondentEmail: string;
  ResponseDate: string;
  RespondentAnswers: IRespondentAnswer[];
}

export interface IRespondentAnswer {
  Keywords?: string;
  QuestionId: string;
  Question: string;
  QuestionOptionId: string;
  AnswerOptionId: string;
  Label?: string;
  Answer: string;
  AnswerKeywords?: string;
  AnswerFile?: string;
  AttachedTextFieldValue?: string;

  [propName: string]: any;
}

export interface ISurveyQuestionAnswers {
  SurveyId: string;
  SurveyAnswers: ISurveyQuestionRespondent[];
}

export interface ISurveyQuestionRespondent {
  RespondentId: string;
  ResponseId: string;
  RespondentEmail: string;
  ResponseDate: string;
  RespondentAnswers: IRespondentQuestionAnswer[];
}

export interface IRespondentQuestionAnswer {
  Keywords?: string;
  QuestionId: string;
  QuestionTypeId: string;
  QuestionTypeName: string;
  QuestionTitle: string;
  Label?: string;
  QuestionAnswers: IRespondentQuestionAnswerAnswer[];
}

export interface IRespondentQuestionAnswerAnswer {
  OptionAnswer: string;
  QuestionOptionId?: string;
  OptionId: string;
  AnswerOptionId: string;
  AttahedTextFieldValue?: string;
  RowText?: string;
  AnswerFile?: string;

  [propName: string]: any;
}
