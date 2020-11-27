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

  const deleteNote = (id, index) => {
    NoteService.delete(id).then(response => {
      if (response.data.code === 200) {
        const notesCopy = [...notes];
        notesCopy.splice(index, 1);
        setNotes(notesCopy);
      }
    });
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
        {notes.map((note, index) => (
          <NoteCard
            key={note._id}
            note={note}
            deleteNote={id => deleteNote(id, index)}
          />
        ))}
      </div>
    </>
  );
};

export default NotesList;
