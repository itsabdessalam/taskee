import styled from "styled-components";
import { useHistory } from "react-router-dom";

const NoteCard = ({ note, deleteNote }) => {
  const history = useHistory();

  const redirectTo = page => {
    return history.push(page);
  };
  // @TODO use something like moment for the dates and deadline display ?
  return (
    <Container>
      <button onClick={() => deleteNote(note._id)}>x</button>
      <CardContainer onClick={() => redirectTo(`/notes/${note._id}`)}>
        <p>{note.title}</p>
        <p>
          <small>last edited {note.updatedAt}</small>
        </p>
      </CardContainer>
    </Container>
  );
};
const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-around;
  div {
    flex-grow: 1;
  }
  div,
  button {
    align-self: center;
  }
`;
const CardContainer = styled.div`
  background-color: white;
  margin: 0 0 10px 15px;
  padding: 10px 15px;
  border-radius: 5px;
  :hover {
    cursor: pointer;
  }
`;

export default NoteCard;
