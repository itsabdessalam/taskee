const AUTH_API_URL = process.env.REACT_APP_AUTH_API_URL;
const axios = require("axios");

const AuthService = {
  login(user) {
    return axios.post(`${AUTH_API_URL}/login`, user, {
      "Content-Type": "application/json"
    });
  }
};

export default AuthService;
