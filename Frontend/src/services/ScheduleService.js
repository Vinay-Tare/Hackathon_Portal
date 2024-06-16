import axios from "axios";
import { baseUrl } from "./baseUrl";

const addSchedules = (adminIdObject) => {
  return axios.post(`${baseUrl}/schedules/`, adminIdObject);
};

const getHackathonStatus = () => {
  return axios.get(`${baseUrl}/schedules/getHackathonStatus`);
};

const getIdeaSubmissionSchedule = () => {
  return axios.get(`${baseUrl}/schedules/ideaSubmission`);
};

const getIdeaReviewSchedule = () => {
  return axios.get(`${baseUrl}/schedules/ideaReview`);
};

const getProjectSubmissionSchedule = () => {
  return axios.get(`${baseUrl}/schedules/projectSubmission`);
};

const getProjectEvaluationSchedules = (judgeIdObject) => {
  return axios.post(`${baseUrl}/schedules/judge/`, judgeIdObject);
};

const getHackathonEndTime = () => {
  return axios.get(`${baseUrl}/schedules/getHackathonEndTime`);
};

export {
  addSchedules,
  getHackathonStatus,
  getIdeaSubmissionSchedule,
  getIdeaReviewSchedule,
  getProjectSubmissionSchedule,
  getProjectEvaluationSchedules,
  getHackathonEndTime,
};
