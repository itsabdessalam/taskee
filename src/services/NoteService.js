import axios from "axios";
import { getToken } from "../utils/auth";

const API_URL = process.env.REACT_APP_API_URL;

const NoteService = {
  create(note) {
    return axios.post(`${API_URL}/notes`, note, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${getToken()}`
      }
    });
  },
  delete(noteId) {
    return axios.delete(`${API_URL}/notes/${noteId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${getToken()}`
      }
    });
  },
  get(noteId) {
    return axios.get(`${API_URL}/notes/${noteId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${getToken()}`
      }
    });
  },
  getAll() {
    return axios.get(`${API_URL}/notes`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${getToken()}`
      }
    });
  },
  update(note) {
    return axios.put(`${API_URL}/notes/${note._id}`, note, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${getToken()}`
      }
    });
  }
};

export default NoteService;
