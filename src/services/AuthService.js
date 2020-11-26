const API_URL = process.env.REACT_APP_API_URL;
const axios = require("axios");

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
  }
};

export default AuthService;
