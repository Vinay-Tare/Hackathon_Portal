import axios from "axios";
import { baseUrl } from "./baseUrl";

const addDomain = (domainName) => {
  return axios.post(`${baseUrl}/domain/`, { name: domainName });
};

const getAllDomain = () => {
  return axios.get(`${baseUrl}/domain/`);
};

export { addDomain, getAllDomain };
