import axios from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_MOON_TECH_BASE_URL,
});

export default instance;
