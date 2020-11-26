import { useParams } from "react-router-dom";
import { Note, NotesList } from "../components";

const Notes = () => {
  // eslint-disable-next-line no-unused-vars
  const { id } = useParams();
  if (id) {
    return (
      <>
        <Note id={id} />
      </>
    );
  }
  return (
    <>
      <NotesList />
    </>
  );
};

export default Notes;
