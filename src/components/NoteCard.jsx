import styled from "styled-components";
import { useContext } from "react";
import { useHistory } from "react-router-dom";
import { useIntl, FormattedMessage } from "react-intl";
import Icon from "./Icon";

import LocaleContext from "../context/Locale";
import { localizedDate, localizedDuration } from "../utils/date";

const StyledNoteCard = styled.div`
  &.note {
    min-height: 72px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: ${({ theme }) => theme.colors.card};
    padding: 10px 15px;
    border-radius: 8px;
    box-shadow: 0px 20px 48px rgba(100, 116, 139, 0.02);
    z-index: 1;

    &:not(:last-child) {
      margin-bottom: 12px;
    }

    span {
      display: block;
    }

    .note__left-side,
    .note__right-side,
    .note__deadline,
    .note__tasks,
    .note__actions {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .note__left-side {
      &:hover {
        cursor: pointer;
      }
    }

    .note__right-side {
      justify-content: space-between;
      min-width: 200px;
    }

    .note__meta {
      width: 270px;

      .note__title {
        font-size: 16px;
        margin-bottom: 2px;
      }

      .note__time {
        color: #64748b;
        font-size: 12px;
        display: flex;
        align-items: center;
      }
    }

    .note__deadline,
    .note__tasks {
      color: #334155;
      margin-right: 12px;
      font-size: 14px;
      svg {
        margin-right: 4px;
      }
    }

    .note__actions {
      .note__action {
        border: none;
        border-radius: 4px;

        &--delete {
          background-color: transparent;
          color: #ef4444;
          width: 32px;
          height: 32px;
        }
      }
    }

    .note__template {
      height: 42px;
      width: 42px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 4px;
      margin-right: 12px;

      svg {
        color: #ffffff;
      }

      &--project {
        background-color: #ec6c14;
      }

      &--blank {
        background-color: #41bdfe;
      }
    }

    &--blank {
      .note__deadline {
        opacity: 0;
        visibility: hidden;
      }
    }
  }
`;

const NoteCard = ({ note, deleteNote }) => {
  const history = useHistory();
  const intl = useIntl();
  const { activeLocale, updateLocale } = useContext(LocaleContext);

  const redirectTo = page => {
    return history.push(page);
  };

  return (
    <>
      <StyledNoteCard
        className={`note note--${note.template ? note.template : "blank"}`}
      >
        <div
          className="note__left-side"
          onClick={() => redirectTo(`/notes/${note._id}`)}
        >
          <div
            className={`note__template note__template--${
              note.template ? note.template : "blank"
            }`}
          >
            <Icon name={note.template ? note.template : "blank"} width={20} />
          </div>
          <div className="note__meta">
            <span className="note__title">{note.title}</span>
            <span className="note__time">
              {intl.formatMessage({ id: "edited" })}{" "}
              {intl.formatMessage(
                { id: "duration" },
                { duration: localizedDuration(note.updatedAt, activeLocale) }
              )}
            </span>
          </div>
        </div>
        <div className="note__right-side">
          {note.deadline ? (
            <div className="note__deadline">
              <Icon name={"calendar"} width={18} />
              {localizedDate(note.deadline, activeLocale)}
            </div>
          ) : (
            <div className="note__deadline">
              <Icon name={"calendar"} width={18} />
              No deadline
            </div>
          )}
          {note.checklist &&
          note.checklist.tasks &&
          note.checklist.tasks.length ? (
            <div className="note__tasks">
              <Icon name={"checklist"} width={18} />{" "}
              {note.checklist.tasks.length}
            </div>
          ) : (
            <div className="note__tasks">
              <Icon name={"checklist"} width={18} /> 0
            </div>
          )}
          <div className="note__actions">
            {/* TODO: use custom action buttons */}
            <button
              className="note__action note__action--delete"
              onClick={() => deleteNote(note._id)}
            >
              <Icon name={"trash"} width={18} />
            </button>
          </div>
        </div>
      </StyledNoteCard>
    </>
  );
};

export default NoteCard;
