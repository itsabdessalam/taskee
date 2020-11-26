import styled from "styled-components";
import { useHistory } from "react-router-dom";

const NoteCard = ({ note }) => {
  const history = useHistory();

  const redirectTo = page => {
    return history.push(page);
  };
  // @TODO use something like moment for the dates and deadline display ?
  return (
    <Container onClick={() => redirectTo(`/notes/${note._id}`)}>
      <p>{note.title}</p>
      <p>
        <small>last edited {note.updatedAt}</small>
      </p>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  background-color: white;
  margin-bottom: 10px;
  padding: 10px 15px;
  border-radius: 5px;
  :hover {
    cursor: pointer;
  }
`;

export default NoteCard;
