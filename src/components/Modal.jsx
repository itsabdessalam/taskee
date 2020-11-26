import React from "react";
import styled from "styled-components";

const Modal = ({ isVisible, children }) => {
  if (!isVisible) {
    return null;
  }

  return (
    <StyledModal className="modal" id="modal">
      <div className="content">{children}</div>
    </StyledModal>
  );
};

const StyledModal = styled.div`
  position: fixed;
  display: block;
  overflow: auto;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
  cursor: pointer;
  .content {
    margin: 15% auto;
    background-color: white;
    border-radius: 0.25rem;
    width: 50vw;
    padding: 2rem;
    position: relative;
  }
`;

export default Modal;
