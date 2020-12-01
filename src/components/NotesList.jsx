import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useIntl } from "react-intl";
import styled from "styled-components";
import NoteService from "../services/NoteService";
import Button from "./Button";
import NoteCard from "./NoteCard";
import Title from "./Title";
import Modal from "./Modal";
import NoteForm from "./NoteForm";

const StyledTaskModal = styled(Modal)``;

const NotesList = () => {
  const history = useHistory();
  const [notes, setNotes] = useState([]);
  const intl = useIntl();
  const [isModalVisible, setIsModalVisible] = useState(false);

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
          {intl.formatMessage({ id: "myNotes" })}
        </Title>
        <div className="page__actions">
          <Button
            // TODO: should be a modal
            onClick={() => setIsModalVisible(true)}
            className="page__action page__action--add-note"
            width="auto"
          >
            {intl.formatMessage({ id: "addNote" })}
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
      <StyledTaskModal isVisible={isModalVisible}>
        <div data-slot="header">Add a new note</div>
        <div data-slot="body">
          <NoteForm />
        </div>
        <div data-slot="footer">
          <button onClick={() => setIsModalVisible(false)}>Close</button>
        </div>
      </StyledTaskModal>
    </>
  );
};

export default NotesList;
