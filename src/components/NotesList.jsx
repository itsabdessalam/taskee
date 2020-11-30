import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useIntl, FormattedMessage } from "react-intl";
import NoteService from "../services/NoteService";
import Button from "./Button";
import NoteCard from "./NoteCard";
import Title from "./Title";

const NotesList = () => {
  const history = useHistory();
  const [notes, setNotes] = useState([]);

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
      <div className="page__header">
        <Title level={2} className="page__title">
          <FormattedMessage id="myNotes" />
        </Title>
        <div className="page__actions">
          <Button
            // TODO: should be a modal
            onClick={() => redirectTo("/notes/new")}
            className="page__action page__action--add-note"
            width="auto"
          >
            <FormattedMessage id="addNote" />
          </Button>
        </div>
      </div>
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
