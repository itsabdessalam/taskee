import { useIntl } from "react-intl";
import { useParams } from "react-router-dom";
import { Note, NotesList, SEO } from "../components";

const Notes = () => {
  const { id } = useParams();
  const intl = useIntl();
  let title = intl.formatMessage({ id: "notes" });

  if (id) {
    title = intl.formatMessage({ id: "note" });

    return (
      <>
        <SEO title={title} />
        <Note id={id} />
      </>
    );
  }

  return (
    <>
      <SEO title={title} />
      <NotesList />
    </>
  );
};

export default Notes;
