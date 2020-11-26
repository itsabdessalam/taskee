import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import NoteService from "../services/NoteService";
import Button from "./Button";
import NoteCard from "./NoteCard";
const NotesList = () => {
  const history = useHistory();
  const [notes, setNotes] = useState([]);

  const redirectTo = page => {
    return history.push(page);
  };

  useEffect(() => {
    NoteService.getAll().then(response => {
      if (!response.data.data) {
        return;
      }
      setNotes(response.data.data);
    });
  }, []);
  return (
    <>
      <Button onClick={() => redirectTo("/notes/new")} width="15vw">
        Add new note
      </Button>
      <div>
        {notes.map(note => (
          <NoteCard key={note._id} note={note} />
        ))}
      </div>
    </>
  );
};

export default NotesList;
