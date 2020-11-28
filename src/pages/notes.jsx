import { useParams } from "react-router-dom";
import { Note, NotesList } from "../components";

const Notes = () => {
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
