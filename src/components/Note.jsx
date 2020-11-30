import { useEffect, useState, useRef, useContext } from "react";
import { useHistory } from "react-router-dom";
import NoteService from "../services/NoteService";
import Checklist from "../components/Checklist";
import { useDebounce } from "../hooks";
import Button from "./Button";
import styled from "styled-components";
import EditableText from "./EditableText";
import Editor from "./Editor";
import Deadline from "./Deadline";
import Icon from "./Icon";

import LocaleContext from "../context/Locale";
import { localizedDate } from "../utils/date";

const StyledNote = styled.div`
  display: flex;
  justify-content: space-between;

  .note__content {
    width: 100%;
    padding: 24px;
  }

  .note__checklist {
    position: absolute;
    top: 0;
    right: 0;
    width: 100%;
    height: 100vh;
    max-width: 470px;
    background-color: ${({ theme }) => theme.colors.editor};
    border-left: 1px solid ${({ theme }) => theme.colors.separator};
    overflow-y: scroll;

    &::-webkit-scrollbar {
      display: none;
    }
    -ms-overflow-style: none;
    scrollbar-width: none;
  }

  .note__title {
    font-size: 32px;
    font-weight: 500;
    margin-top: 0;
    margin-bottom: 0;

    textarea {
      font-size: 32px;
      font-weight: 500;
      width: 100%;
      background: transparent !important;
    }
  }

  .note__deadline {
    .react-datepicker-popper {
      z-index: 3;
    }

    .react-datepicker__close-icon {
      height: auto;
      top: 50%;
      right: 12px;
      transform: translateY(-50%);
      padding: 0;

      &::after {
        font-size: 14px;
        background-color: #edf2f7;
        color: #64748b;
        height: 20px;
        width: 20px;
      }
    }

    .react-datepicker__triangle {
      left: 50px !important;
    }
  }
`;

const Note = ({ id }) => {
  const history = useHistory();
  const [note, setNote] = useState({});
  const [checklist, setChecklist] = useState({
    title: "Checklist",
    tasks: []
  });
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const { activeLocale, updateLocale } = useContext(LocaleContext);

  const ref = useRef(null);
  const inputElement = useRef(null);

  const debouncedNote = useDebounce(note, 1000);

  const toggleEditingTitle = () => {
    if (!isEditingTitle) {
      setIsEditingTitle(true);
    }
  };

  const redirectToList = () => {
    return history.push(`/notes`);
  };

  const updateChecklist = async note => {
    if (!note) {
      return;
    }

    delete note.createdAt;
    delete note.updatedAt;

    if (
      note.checklist.tasks &&
      note.checklist.tasks.every(task => task.title)
    ) {
      NoteService.update(note).catch(error => {
        console.error("Error while updating user note", error);
        return null;
      });
    }
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
    <>
      {/* <Button onClick={redirectToList} width="120px">
        Back
      </Button> */}

      <StyledNote className="note">
        <div className="note__content">
          <h2 ref={ref} onClick={toggleEditingTitle} className="note__title">
            <EditableText
              ref={inputElement}
              value={note.title}
              onChange={onTitleChange}
              disabled={!isEditingTitle}
              cols="40"
              maxLength="140"
            />
          </h2>
          {/* {note.template === "project" && (
            <Deadline
              deadline={note.deadline}
              onChange={updateDeadline}
              className="note__deadline"
            />
          )} */}
          <div className="note__text">
            {note && note._id && (
              <Editor data={note.text} onChange={onTextChange} />
            )}
          </div>
        </div>
        <div className="note__checklist">
          <Checklist
            checklist={checklist}
            onTasksChange={onTasksChange}
            noteTemplate={note.template}
          />
        </div>
      </StyledNote>
    </>
  );
};

export default Note;
