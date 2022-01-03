import got, { Headers, Method, OptionsOfJSONResponseBody } from 'got';
import { IQuestion, ISurvey, ISurveyAnswers, ISurveyQuestionAnswers, IWebropolApiClientOptions, IWebropolApiFilter } from './interfaces';

export class WebropolApiClient {
  options: IWebropolApiClientOptions;

  /** @private */
  accessToken: string | undefined;

  /** @private */
  accessTokenTimeout: any;

  constructor(options: IWebropolApiClientOptions) {
    // Set default options
    options.apiVersion = options.apiVersion || 'v1';
    options.apiBaseUrl = options.apiBaseUrl || 'https://rest.webropolsurveys.com/api';
    options.apiTokenUrl = options.apiTokenUrl || 'https://rest.webropolsurveys.com/Token';
    options.timeout = options.timeout || 120000;

    if (!options.webropolUsername) {
      throw new Error('Missing options.webropolUsername');
    }
    if (!options.webropolPassword) {
      throw new Error('Missing options.webropolPassword');
    }

    this.options = options;
  }

  /** @private */
  resetAccessToken() {
    this.accessToken = undefined;
  }

  /** @private */
  async refreshAccessToken(): Promise<void> {
    // Check if access token is expired
    if (!this.accessToken) {
      const response: any = await got({
        method: 'POST',
        url: this.options.apiTokenUrl,
        timeout: this.options.timeout,
        headers: {
          'Content-Type': 'text/plain'
        },
        form: {
          grant_type: 'password',
          username: this.options.webropolUsername,
          password: this.options.webropolPassword
        },
        resolveBodyOnly: true
      }).json();

      this.accessToken = response.access_token;

      // Reset access token when it expires
      this.accessTokenTimeout = setTimeout(() => this.resetAccessToken(), response.expires_in * 1000);
    }
  }

  /** @private */
  async getDefaultHttpHeaders(): Promise<Headers> {
    await this.refreshAccessToken();

    return {
      Authorization: `Bearer ${this.accessToken}`,
      'Content-Type': 'application/json'
    };
  }

  async request(method: Method, uri: string, json?: any, params?: any): Promise<any> {
    const gotOptions: OptionsOfJSONResponseBody = {
      method,
      url: `${this.options.apiBaseUrl}/${this.options.apiVersion}/${uri}`,
      timeout: this.options.timeout,
      headers: await this.getDefaultHttpHeaders(),
      responseType: 'json'
    };

    // If body is defined
    if (json) {
      gotOptions.json = json;
    }

    // If params is defined
    if (params) {
      gotOptions.searchParams = params;
    }

    const response = await got({ ...gotOptions, resolveBodyOnly: true }).json();

    return response;
  }

  /** Gets all surveys the user has access rights to. */
  async getSurveys(): Promise<ISurvey[]> {
    return await this.request('GET', 'surveys');
  }

  /** Gets all questions for a survey, returns QuestionId, QuestionText and QuestionOrderNumber. */
  async getSurveyQuestions(surveyId: string): Promise<IQuestion[]> {
    return await this.request('GET', `surveys/${surveyId}/questions`);
  }

  /** Gets all answers for one survey that is specified in the request with the surveyId. Optional filters: StartDate and EndDate. */
  async getSurveyAnswers(surveyId: string, filters?: IWebropolApiFilter): Promise<ISurveyAnswers> {
    if (filters) {
      return await this.request('POST', `surveys/${surveyId}/answers`, filters);
    }

    return await this.request('GET', `surveys/${surveyId}/answers`);
  }

  /** Gets all answers for one question in survey that is specified in the request with the surveyId and questionId. Optional filters: StartDate and EndDate. */
  async getQuestionAnswers(surveyId: string, questionId: string, filters?: IWebropolApiFilter): Promise<ISurveyQuestionAnswers> {
    if (filters) {
      return await this.request('POST', `surveys/${surveyId}/${questionId}/responses`, filters);
    }

    return await this.request('GET', `surveys/${surveyId}/${questionId}/responses`);
  }
}
