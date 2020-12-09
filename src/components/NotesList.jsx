import { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import NoteService from "../services/NoteService";
import NoteCard from "./NoteCard";
import Title from "./Title";
import NewNote from "./NewNote";

const NotesList = () => {
  const [notes, setNotes] = useState([]);
  const intl = useIntl();

  const deleteNote = (id, index) => {
    const remove = confirm("Delete note?");

    if (!remove) {
      return;
    }

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
      <Title level={2}>{intl.formatMessage({ id: "notes" })}</Title>
      <NewNote />
      <div className="notes">
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
