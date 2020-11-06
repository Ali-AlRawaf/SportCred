const SurveyQuestion = require('../models/surveyQuestion')

export const submitSurvey = async (body) => {

  const url = "http://localhost:5000/survey/new"

  const request = new Request(url, {
    method: "post",
    body: JSON.stringify(body),
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    }
  })

  const result = {}

  const response = await fetch(request);
  result.status = response.status;

  if (response.status != 200){
    const msg = await response.text();
    result.error = msg;
  }

  return result;
}

export const newSurveyQuestionAnswer = (question, answer) => {
  return {
    question: question,
    answer: answer
  };
}