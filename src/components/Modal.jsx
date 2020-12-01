import React from "react";
import styled from "styled-components";
import Title from "./Title";
import Button from "./Button";
import Icon from "./Icon";

const StyledModal = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1200;

  .modal__close {
    position: absolute;
    right: 24px;

    button {
      border-radius: 50%;
      width: 32px;
      height: 32px;
      padding: 0;
      margin: 0;
      color: #64748b;
      background-color: #edf2f7;
    }
  }

  .modal__header {
    h2 {
      margin-top: 0;
    }
  }

  .modal__content {
    position: relative;
    padding: 24px;
    margin: 0 auto;
    background-color: ${({ theme }) => theme.colors.background};
    border-radius: 8px;
    width: 100%;
    max-width: 620px;
    height: auto;
    max-height: 90vh;
  }
`;

const Modal = ({
  children,
  isOpen,
  title,
  onConfirm = null,
  onCancel = null
}) => {
  if (!isOpen) {
    return null;
  }

  return (
    <StyledModal className="modal" id="modal">
      <div className="modal__content">
        <div className="modal__close">
          {typeof onCancel === "function" && (
            <Button onClick={onCancel}>
              <Icon name="close" width={16} />
            </Button>
          )}
        </div>
        <div className="modal__header">
          <Title level={2}>{title}</Title>
        </div>
        <div className="modal__body">{children}</div>
        <div className="modal__actions"></div>
      </div>
    </StyledModal>
  );
};

export default Modal;
