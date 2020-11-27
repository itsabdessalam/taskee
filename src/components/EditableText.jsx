import { forwardRef } from "react";
import TextareaAutosize from "react-textarea-autosize";
import styled from "styled-components";

const EditableText = (props, ref) => {
  return <StyledTextarea wrap="soft" ref={ref} {...props} />;
};

const StyledTextarea = styled(TextareaAutosize)`
  resize: none;
  padding: 7px 5px;
  border: none;
  color: ${({ theme }) => theme.colors.text};
  :disabled {
    background: none;
  }
  :focus {
    outline: none;
  }
`;
export default forwardRef(EditableText);
