import { useParams } from "react-router-dom";
import { Note, NotesList, SEO } from "../components";

const Notes = () => {
  const { id } = useParams();
  if (id) {
    return (
      <>
        <SEO title={"Note"} />
        <Note id={id} />
      </>
    );
  }
  return (
    <>
      <SEO title={"Notes"} />
      <NotesList />
    </>
  );
};

export default Notes;
