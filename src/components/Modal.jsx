import React from "react";
import styled from "styled-components";
import Title from "./Title";

const Modal = ({ isVisible, children }) => {
  if (!isVisible) {
    return null;
  }

  const getChildBySlot = (children, slot) => {
    if (!children || !slot) {
      return null;
    }
    const slotItem = children.find(child => child.props["data-slot"] === slot);
    return slotItem ? slotItem.props.children : null;
  };

  const header = getChildBySlot(children, "header");
  const body = getChildBySlot(children, "body");
  const footer = getChildBySlot(children, "footer");

  return (
    <StyledModal className="modal" id="modal">
      <div className="modal__content">
        <div className="modal__header">
          <Title level={2}>{header}</Title>
        </div>
        <div className="modal__body">{body}</div>
        <div className="modal__footer">{footer}</div>
      </div>
    </StyledModal>
  );
};

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

  .modal__content {
    position: relative;
    padding: 24px;
    margin: 0 auto;
    background-color: white;
    border-radius: 8px;
    width: 50vw;
  }
`;

export default Modal;
