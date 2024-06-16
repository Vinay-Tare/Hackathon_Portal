import axios from "axios";
import { baseUrl } from "./baseUrl";

const getEvaluationsAssignedToJudge = (judgeIdObject) => {
  return axios.post(`${baseUrl}/projectEvaluation/judge`, judgeIdObject);
};

const projectEvalutation = (data) => {
  return axios.post(`${baseUrl}/projectEvaluation/`, data);
};

const assignProjectToJudges = (data) => {
  return axios.post(`${baseUrl}/projectEvaluation/assignJudges`, data);
};

const getWinners = () => {
  return axios.get(`${baseUrl}/projectEvaluation/getWinners`);
};

export {
  getEvaluationsAssignedToJudge,
  projectEvalutation,
  assignProjectToJudges,
  getWinners,
};
