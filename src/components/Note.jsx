import { useEffect, useState } from "react";
import NoteService from "../services/NoteService";
import { useHistory } from "react-router-dom";
const Note = ({ id }) => {
  const history = useHistory();
  const [note, setNote] = useState({});

  const redirectToList = () => {
    return history.push(`/notes`);
  };
  useEffect(() => {
    NoteService.get(id).then(response => {
      if (!response.data.data) {
        return history.push(`/notes`);
      }
      setNote(response.data.data);
    });
  }, []);
  return (
    <>
      <button onClick={redirectToList}>Back</button>
      <h2>{note.title}</h2>
    </>
  );
};

export default Note;
