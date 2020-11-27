import { useEffect, useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import NoteService from "../services/NoteService";
import Checklist from "../components/Checklist";
import { useDebounce } from "../hooks";
import Button from "./Button";
import styled from "styled-components";
import EditableText from "./EditableText";
import Editor from "./Editor";
import Deadline from "./Deadline";

const Note = ({ id }) => {
  const history = useHistory();
  const [note, setNote] = useState({});
  const [checklist, setChecklist] = useState({
    title: "Checklist",
    tasks: []
  });
  const [isEditingTitle, setIsEditingTitle] = useState(false);

  const ref = useRef(null);
  const inputElement = useRef(null);

  const debouncedNote = useDebounce(note, 2000);

  const toggleEditingTitle = () => {
    if (!isEditingTitle) {
      setIsEditingTitle(true);
    }
  };

  const redirectToList = () => {
    return history.push(`/notes`);
  };

  const updateChecklist = async note => {
    delete note.createdAt;
    delete note.updatedAt;
    NoteService.update(note).catch(error => {
      console.error("Error while updating user note", error);
      return null;
    });
  };

  const onTitleChange = event => {
    event.target.value = event.target.value.replace("\n", "");
    setNote({ ...note, title: event.target.value });
  };

  const onTasksChange = tasks => {
    const checklistCopy = { ...checklist, tasks };
    setChecklist(checklistCopy);
    setNote({ ...note, checklist: checklistCopy });
  };

  const onTextChange = text => {
    setNote({ ...note, text });
  };

  const updateDeadline = date => {
    if (note.template === "project") {
      setNote({ ...note, deadline: date });
    }
  };

  useEffect(() => {
    NoteService.get(id)
      .then(response => {
        if (!response.data.data) {
          return history.push(`/notes`);
        }
        setNote(response.data.data);
        if (response.data.data.checklist) {
          setChecklist(response.data.data.checklist);
        }
      })
      .catch(error => {
        console.error("Error while getting user note", error);
        return null;
      });
  }, []);

  useEffect(() => {
    if (debouncedNote._id) {
      updateChecklist(debouncedNote);
    }
  }, [debouncedNote]);
  return (
    <Container>
      <Button onClick={redirectToList} width="8vw">
        Back
      </Button>
      <h2 ref={ref} onClick={toggleEditingTitle}>
        <EditableText
          ref={inputElement}
          value={note.title}
          onChange={onTitleChange}
          disabled={!isEditingTitle}
          className="note__title"
          cols="40"
          maxLength="140"
        />
      </h2>
      {note.template === "project" && (
        <Deadline deadline={note.deadline} onChange={updateDeadline} />
      )}

      <Content>
        {note && note._id && (
          <Editor data={note.text} onChange={onTextChange} />
        )}
        <Checklist checklist={checklist} onTasksChange={onTasksChange} />
      </Content>
    </Container>
  );
};

const Container = styled.div`
  .note__title {
    font-size: 2rem;
    font-weight: bold;
  }
`;

const Content = styled.div`
  /* display: flex; */
`;

export default Note;
