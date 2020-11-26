import { getUserLogged } from "../utils/auth";

const API_URL = process.env.REACT_APP_API_URL;
const axios = require("axios");
const NoteService = {
  create(note) {
    return axios.post(`${API_URL}/notes`, note, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${getUserLogged().token}`
      }
    });
  },
  get(noteId) {
    return axios.get(`${API_URL}/notes/${noteId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${getUserLogged().token}`
      }
    });
  }
};

export default NoteService;
