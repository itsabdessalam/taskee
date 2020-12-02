import axios from "axios";
import { getUser } from "../utils/auth";

const API_URL = process.env.REACT_APP_API_URL;

const NoteService = {
  create(note) {
    return axios.post(`${API_URL}/notes`, note, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${getUser().token}`
      }
    });
  },
  delete(noteId) {
    return axios.delete(`${API_URL}/notes/${noteId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${getUser().token}`
      }
    });
  },
  get(noteId) {
    return axios.get(`${API_URL}/notes/${noteId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${getUser().token}`
      }
    });
  },
  getAll() {
    return axios.get(`${API_URL}/notes`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${getUser().token}`
      }
    });
  },
  update(note) {
    return axios.put(`${API_URL}/notes/${note._id}`, note, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${getUser().token}`
      }
    });
  }
};

export default NoteService;
