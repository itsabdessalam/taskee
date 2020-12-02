import axios from "axios";
import { getUser } from "../utils/auth";

const API_URL = process.env.REACT_APP_API_URL;

const AuthService = {
  login(user) {
    return axios.post(`${API_URL}/auth/login`, user, {
      "Content-Type": "application/json"
    });
  },

  register(user) {
    return axios.post(`${API_URL}/user`, user, {
      "Content-Type": "application/json"
    });
  },
  update(user) {
    return axios.put(`${API_URL}/user/${user._id}`, user, {
      "Content-Type": "application/json",
      headers: {
        Authorization: `${getUser().token}`
      }
    });
  }
};

export default AuthService;
