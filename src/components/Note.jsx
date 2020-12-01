import { useEffect, useState, useRef, useContext } from "react";
import { useHistory } from "react-router-dom";
import classNames from "classnames";
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
  &.note {
    display: flex;
    justify-content: space-between;
    transition: width 0.4s ease;

    &::-webkit-scrollbar {
      display: none;
    }
    -ms-overflow-style: none;
    scrollbar-width: none;

    .note__content {
      width: 100%;
      padding: 24px;
      position: relative;
    }

    .note__expand {
      position: absolute;
      right: 24px;
      top: 36px;
      color: #64748b;
      background-color: transparent;
      border: none;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 32px;
      width: 32px;
      border-radius: 4px;
      padding: 0;

      &:hover {
        background-color: #edf2f7;
      }

      @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
        display: none;
      }
    }

    .note__checklist {
      position: fixed;
      top: 0;
      right: 0;
      width: 100%;
      height: 100vh;
      max-width: 470px;
      background-color: ${({ theme }) => theme.colors.editor};
      border-left: 1px solid ${({ theme }) => theme.colors.separator};
      overflow-y: scroll;
      transition: right 0.4s ease;

      &::-webkit-scrollbar {
        display: none;
      }
      -ms-overflow-style: none;
      scrollbar-width: none;

      @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
        display: none;
      }
    }

    .note__title {
      font-size: 32px;
      font-weight: 500;
      margin-top: 0;
      margin-bottom: 0;

      @media (mix-width: ${({ theme }) => theme.breakpoints.md}) {
        padding-right: 32px !important;
      }

      textarea {
        font-size: 32px;
        font-weight: 500;
        width: 100%;
        background: transparent !important;
      }
    }

    .note__deadline {
    }

    &.expanded {
      width: 100% !important;

      .note__checklist {
        right: -500px;
      }

      .checklist__add {
        right: -500px;
      }

      .note__expand {
        background-color: #edf2f7;
      }
    }
  }
`;

const Note = ({ className, id }) => {
  const history = useHistory();
  const [note, setNote] = useState({});
  const [checklist, setChecklist] = useState({
    title: "Checklist",
    tasks: []
  });
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
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
      note.checklist &&
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

  const handleExpand = () => {
    setIsExpanded(!isExpanded);
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

  const cssClasses = classNames(className, "note", {
    expanded: isExpanded
  });

  return (
    <>
      {/* <Button onClick={redirectToList} width="120px">
        Back
      </Button> */}
      <StyledNote className={cssClasses}>
        <div className="note__content">
          <button className="note__expand" onClick={handleExpand}>
            <Icon name="expand" width={18} />
          </button>
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
