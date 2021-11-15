# webropol-api-client

WebropolApiClient is a third party Webropol REST API client.

:warning: This tool is in early stages and is subject to change.

## Installation

Add to project's package.json:

```
npm install git+ssh://github@github.com/rantalainen/webropol-api-client.git#main
```

## Setup

### Import to NodeJS project

```javascript
const { WebropolApiClient } = require('webropol-api-client');
```

### Import to TypeScript project

```javascript
import { WebropolApiClient } from 'webropol-api-client';
```

### Setup client with options

Use your Webropol username and password for authentication.

```javascript
const webropol = new WebropolApiClient({
  // Mandatory options:
  webropolUsername: 'your_webropol_username',
  webropolPassword: 'your_webropol_password',

  // Optional options (and default values):
  apiVersion: 'v1',
  apiBaseUrl: 'https://rest.webropolsurveys.com/api',
  apiTokenUrl: 'https://rest.webropolsurveys.com/Token',
  timeout: 120000
});
```

## Parameters needed for using the API client

### SurveyId
Each survey has its own globally unique identifier (GUID) that is represented in an 32 digits with hyphens. Most of the requests will need the survey id in order to work. Your surveyId can be found from the URL address when accessing the survey via UI. You can also get all your surveys with their id's by using the `getSurveys()` which will list all the surveys your account has access to.

### QuestionId
Each survey contains questions which, too, have an unique identifier, a questionId. Each question in every survey has its own questionId regardless if they are copied or structured the same. You can get all questionIds from one survey by using the `getSurveyQuestions(surveyId)`.

### StartDate, EndDate
Some functions allow you to filter the results by StartDate and EndDate. Date is a string value, for example `2020-10-10T06:09:52.232Z`.

## Functions

### getSurveys()

Gets all surveys the user has access rights to.

*Example Request*
```javascript
const surveys = await webropol.getSurveys();
```

*Example Response*
```javascript
[
  {
    "SurveyId": "bc8f501a-2275-4c5b-b285-00639c782394",
    "SurveyTitle": "My Survey",
    "Status": "Closed",
    "ParentId": "00000000-0000-0000-0000-000000000000",
    "ReadAccess": true,
    "WriteAccess": true,
    "isPublished": false,
    "CreationDate": "2018-02-21T10:25:48"
  },
  {
    "SurveyId": "b9bb8406-6273-4d56-baf8-0283f51bd057",
    "SurveyTitle": "My Other Survey",
    "Status": "Open",
    "ParentId": "00000000-0000-0000-0000-000000000000",
    "ReadAccess": true,
    "WriteAccess": true,
    "isPublished": true,
    "CreationDate": "2020-10-26T11:22:48.99"
  }
]
```

### getSurveyQuestions(surveyId)

Gets all questions for a survey, returns QuestionId, QuestionText and QuestionOrderNumber.

*Example Request*
```javascript
const questions = await webropol.getSurveyQuestions('bc8f501a-2275-4c5b-b285-00639c782394');
```

*Example Response*
```javascript
{
  "Questions": [
    {
      "QuestionId": "dfab6b44-5972-4546-ae60-9e18405cef2f",
      "QuestionText": "Select your gender",
      "QuestionOrderNumber": 1
    },
    {
      "QuestionId": "f45ee848-860d-4b17-9be9-ec8337ae83cb",
      "QuestionText": "Select your gender",
      "QuestionOrderNumber": 2
    },
    {
      "QuestionId": "289c951e-9bbe-471e-96d1-e9bb7ea3d1f9",
      "QuestionText": "Which of the following fruits do you like?",
      "QuestionOrderNumber": 3
    },
    {
      "QuestionId": "4b98d386-c89d-44e3-bdca-a29860d6fca5",
      "QuestionText": "Evaluate the Products",
      "QuestionOrderNumber": 4
    },
    {
      "QuestionId": "979c6447-2f0c-4e9e-a654-feb7fb11a932",
      "QuestionText": "Your open feedback",
      "QuestionOrderNumber": 5
    }
  ]
}
```

### getSurveyAnswers(surveyId, filters?)

Gets all answers for one survey that is specified in the request with the surveyId. Optional filters: StartDate and EndDate.

*Example Request*
```javascript
const answers = await webropol.getSurveyAnswers('53c5b1ca-5d4e-4146-90df-a85bb7a8094a');
```

*Example Response*
```javascript
{
  "SurveyId": "53c5b1ca-5d4e-4146-90df-a85bb7a8094a",
  "SurveyAnswers": [
    {
      "RespondentId": null,
      "ResponseId": "0725646a-cafb-4126-a4f0-0a6660b9d812",
      "RespondentEmail": null,
      "ResponseDate": "2020-11-10T11:54:34.253",
      "RespondentAnswers": [
        {
          "Keywords": "",
          "QuestionId": "60e1e8a2-3823-eb11-a95f-8dd0107f8539",
          "Question": "How likely would you recommend our company? (NPS)",
          "QuestionOptionId": "87e1e8a2-3823-eb11-a95f-8dd0107f8539",
          "AnswerOptionId": "22a0f7b8-3a23-eb11-a95f-8dd0107f8539",
          "Label": "Not at all likely - Extremely likely",
          "Answer": "7",
          "AnswerKeywords": "",
          "AnswerFile": null
        },
        {
          "Keywords": "",
          "QuestionId": "61e1e8a2-3823-eb11-a95f-8dd0107f8539",
          "Question": "What is your favourite city in Finland?",
          "QuestionOptionId": "8de1e8a2-3823-eb11-a95f-8dd0107f8539",
          "AnswerOptionId": "23a0f7b8-3a23-eb11-a95f-8dd0107f8539",
          "Label": "",
          "Answer": "Helsinki",
          "AnswerKeywords": "",
          "AnswerFile": null
        },
        {
          "Keywords": "",
          "QuestionId": "63e1e8a2-3823-eb11-a95f-8dd0107f8539",
          "Question": "What is your favourite...",
          "QuestionOptionId": "93e1e8a2-3823-eb11-a95f-8dd0107f8539",
          "AnswerOptionId": "24a0f7b8-3a23-eb11-a95f-8dd0107f8539",
          "Label": "fruit",
          "Answer": "apple",
          "AnswerKeywords": "",
          "AnswerFile": null
        },
        {
          "Keywords": "",
          "QuestionId": "6ce1e8a2-3823-eb11-a95f-8dd0107f8539",
          "Question": "ATTACHMENT",
          "QuestionOptionId": "abe1e8a2-3823-eb11-a95f-8dd0107f8539",
          "AnswerOptionId": "2ea0f7b8-3a23-eb11-a95f-8dd0107f8539",
          "Label": "Attachment",
          "Answer": "w-logo-blue-bg.jpg",
          "AnswerKeywords": "",
          "AnswerFile": "https://link.webropolsurveys.com/File/GetStoredFile?storedFileId=6c773d3b-6a30-4e52-9b5f-cdb00a6ff549"
        },
        {
          "Keywords": "",
          "QuestionId": "7ae1e8a2-3823-eb11-a95f-8dd0107f8539",
          "Question": "Enter your details",
          "QuestionOptionId": "d2e1e8a2-3823-eb11-a95f-8dd0107f8539",
          "AnswerOptionId": "39a0f7b8-3a23-eb11-a95f-8dd0107f8539",
          "Label": "WEIGHT (KG)",
          "Answer": "65",
          "AnswerKeywords": "",
          "AnswerFile": null
        }
      ]
    }
  ]
}
```

### getQuestionAnswers(surveyId, questionId, filters?)

Gets all answers for one question in survey that is specified in the request with the surveyId and questionId. Optional filters: StartDate and EndDate.

*Example Request*
```javascript
const answersForQuestion = await webropol.getQuestionAnswers('53c5b1ca-5d4e-4146-90df-a85bb7a8094a', '60e1e8a2-3823-eb11-a95f-8dd0107f8539');
```

*Example Response*
```javascript
{
  "SurveyId": "53c5b1ca-5d4e-4146-90df-a85bb7a8094a",
  "SurveyAnswers": [
    {
      "RespondentId": null,
      "ResponseId": "00000000-0000-0000-0000-000000000000",
      "RespondentEmail": null,
      "ResponseDate": "2020-11-10T11:54:34.253",
      "RespondentAnswers": [
        {
          "Keywords": null,
          "QuestionId": "60e1e8a2-3823-eb11-a95f-8dd0107f8539",
          "QuestionTypeId": "00000000-0000-0000-0000-000000000000",
          "QuestionTypeName": "questionType_selection",
          "QuestionTitle": "Which of the following fruits do you like?",
          "Label": null,
          "QuestionAnswers": [
            {
              "OptionAnswer": "Orange",
              "QuestionOptionId": null,
              "OptionId": "00000000-0000-0000-0000-000000000000",
              "AnswerOptionId": "00000000-0000-0000-0000-000000000000",
              "AttahedTextFieldValue": "",
              "RowText": null,
              "AnswerFile": null
            }
          ]
        }
      ]
    },
    {
      "RespondentId": null,
      "ResponseId": "00000000-0000-0000-0000-000000000000",
      "RespondentEmail": null,
      "ResponseDate": "2019-10-16T15:18:05.343",
      "RespondentAnswers": [
        {
          "Keywords": null,
          "QuestionId": "60e1e8a2-3823-eb11-a95f-8dd0107f8539",
          "QuestionTypeId": "00000000-0000-0000-0000-000000000000",
          "QuestionTypeName": "questionType_selection",
          "QuestionTitle": "Which of the following fruits do you like?",
          "Label": null,
          "QuestionAnswers": [
            {
              "OptionAnswer": "Apple",
              "QuestionOptionId": null,
              "OptionId": "00000000-0000-0000-0000-000000000000",
              "AnswerOptionId": "00000000-0000-0000-0000-000000000000",
              "AttahedTextFieldValue": "",
              "RowText": null,
              "AnswerFile": null
            }
          ]
        }
      ]
    }
  ]
}
```

## Resources

* Webropol website: https://new.webropolsurveys.com/
* Webropol Developer website: https://developer.webropol.com/
* Webropol API terminology: https://developer.webropol.com/terminology

## Changelog

* 0.0.1 First release