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
  if (response.status === 200){
    console.log('survey successfully created')
    result.status = response.status;
  }else{
    const msg = await response.text();
    result.status = response.status;
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

export const setSurveyAnswer = (question, answer) => {
  question.answer = answer;
}