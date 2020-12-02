import { useState } from "react";
import { useIntl } from "react-intl";
import styled from "styled-components";

import Button from "./Button";
import Modal from "./Modal";
import NoteForm from "./NoteForm";
import Icon from "./Icon";

const StyledNoteAddButton = styled(Button)`
  margin-left: auto !important;
  margin-bottom: 24px !important;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    position: fixed;
    padding: 0 !important;
    margin: 0 !important;
    right: 18px;
    bottom: 58px;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    z-index: 10;
  }

  .note__add__text {
    @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
      display: none;
    }
  }

  .note__add__icon {
    @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
      display: none;
    }
  }
`;

const NewNote = () => {
  const intl = useIntl();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Modal
        title={intl.formatMessage({ id: "addNote" })}
        isOpen={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onConfirm={() => setIsModalOpen(false)}
      >
        <NoteForm onConfirm={() => setIsModalOpen(false)} />
      </Modal>
      <StyledNoteAddButton
        onClick={() => setIsModalOpen(true)}
        className="note__add"
        width="auto"
        title={intl.formatMessage({ id: "addNote" })}
      >
        <span className="note__add__text">
          {intl.formatMessage({ id: "addNote" })}
        </span>
        <Icon name="plus" width={18} className="note__add__icon"></Icon>
      </StyledNoteAddButton>
    </>
  );
};

export default NewNote;
