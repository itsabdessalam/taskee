import { getUserLogged } from "../utils/auth";

const AUTH_API_URL = process.env.REACT_APP_AUTH_API_URL;
const axios = require("axios");
const NoteService = {
  create(note) {
    return axios.post(`${AUTH_API_URL}/notes`, note, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${getUserLogged().token}`
      }
    });
  },
  get(noteId) {
    return axios.get(`${AUTH_API_URL}/notes/${noteId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${getUserLogged().token}`
      }
    });
  }
};

export default NoteService;
