import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useIntl } from "react-intl";
import styled from "styled-components";
import NoteService from "../services/NoteService";
import Button from "./Button";
import NoteCard from "./NoteCard";
import Title from "./Title";
import NewNote from "./NewNote";

const NotesList = () => {
  const history = useHistory();
  const [notes, setNotes] = useState([]);
  const intl = useIntl();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const redirectTo = page => {
    return history.push(page);
  };

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
