import axios from "axios";
import { baseUrl } from "./baseUrl";

const registerUser = (data) => {
  return axios.post(`${baseUrl}/users/`, data);
};

const searchByEmail = (email) => {
  return axios.get(`${baseUrl}/users/search-by-email/${email}`);
};
const searchTeamName = (teamName) => {
  return axios.get(`${baseUrl}/users/search-by-teamName/${teamName}`);
};

const registerTeamUser = (data) => {
  return axios.post(`${baseUrl}/users/teams/addUser`, data);
};

const getTeamMembersByTeamName = (teamName) => {
  return axios.get(`${baseUrl}/users/teams/${teamName}`);
};

const loginUser = (data) => {
  return axios.post(`${baseUrl}/users/login`, data);
};

const addJudgeOrPanelist = (data) => {
  return axios.post(`${baseUrl}/users/addJudgeOrPanelist`, data);
};

const getAllPanelists = (data) => {
  return axios.get(`${baseUrl}/users/getAllPanelists`, data);
};

const getAllJudges = (data) => {
  return axios.get(`${baseUrl}/users/getAllJudges`, data);
};

export {
  loginUser,
  registerTeamUser,
  registerUser,
  searchByEmail,
  searchTeamName,
  getTeamMembersByTeamName,
  addJudgeOrPanelist,
  getAllJudges,
  getAllPanelists,
};
