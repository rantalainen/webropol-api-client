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

export interface IWebropolApiParams {
  paging?: number;
}

export interface IWebropolApiRequestOptions {
  filters?: IWebropolApiFilter;
  params?: IWebropolApiParams;
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

export interface IPaging {
  ItemsPerPage: number;
  TotalCount: number;
  TotalPages: number;
  CurrentPage: number;
  IsLastItemFetched: boolean;
  ItemCount: number;
}

type QuestionTypeName =
  | "questionType_openended"
  | "questionType_textField"
  | "questionType_NPS"
  | "questionType_selection"
  | "questionType_multipleChoice"
  | "questionType_DropDownList"
  | "questionType_scaleSelection"
  | "questionType_scaleMultipleChoice"
  | "questionType_position"
  | "questionType_fourfold";

export interface IQuestionAnswer {
  OptionAnswer: string;
  QuestionOptionId: string;
  OptionId?: string;
  AnswerOptionId: string;
  AttahedTextFieldValue?: string;
  RowText?: string;
  AnswerFile?: string;
}

export interface IRespondentAnswerNew {
  Keywords?: string;
  QuestionId: string;
  QuestionTitle: string;
  QuestionTypeId: string;
  QuestionTypeName: QuestionTypeName;
  Label?: string;
  QuestionAnswers: IQuestionAnswer[];
}

export interface ISurveyAnswer {
  RespondentId: string;
  ResponseId: string;
  RespondentEmail: string;
  ResponseLanguageId: string;
  ResponseDate: string;
  RespondentAnswers: IRespondentAnswerNew[];
}

export interface ISurveyResponse {
  SurveyId: string;
  Paging: IPaging;
  SurveyAnswers: ISurveyAnswer[];
}
