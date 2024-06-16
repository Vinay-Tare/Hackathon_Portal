import axios from "axios";
import { baseUrl } from "./baseUrl";

const getAllIdeas = () => {
  return axios.get(`${baseUrl}/ideas/`);
};

const submitIdea = (data) => {
  return axios.post(`${baseUrl}/ideas/`, data);
};

const updateIdea = (data) => {
  return axios.post(`${baseUrl}/ideas/update`, data);
};

const uploadFiles = (data) => {
  return axios.post(`${baseUrl}/ideas/uploadFile`, data);
};

const getIdea = (participantId) => {
  return axios.get(`${baseUrl}/ideas/${participantId}`);
};

const getIdeasAssignedToPanelist = (panlelistId) => {
  return axios.get(`${baseUrl}/ideas/panelist/${panlelistId}`);
};

const setReview = (data) => {
  return axios.post(`${baseUrl}/ideas/setReview`, data);
};

const assignIdeaToPanelist = (data) => {
  return axios.post(`${baseUrl}/ideas/assignIdeaToPanelist`, data);
};

export {
  submitIdea,
  updateIdea,
  uploadFiles,
  getIdea,
  getIdeasAssignedToPanelist,
  setReview,
  getAllIdeas,
  assignIdeaToPanelist,
};
