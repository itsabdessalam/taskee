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
  },
  update(payload, token) {
    return axios.put(`${API_URL}/user/${payload._id}`, payload, {
      "Content-Type": "application/json",
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }
};

export default AuthService;
