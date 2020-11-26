import Title from "./Title";
import { useEffect, useState } from "react";
import until from "../utils/until";
import NoteService from "../services/NoteService";

const NotesEditor = ({id}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [note, setNote] = useState({});
  useEffect(async () => {
    let oneNote = await until(NoteService.get(id));
    setNote(oneNote[1].data.data);
  }, []);
  return (
   <>
     <Title level={2}>{note.title}</Title>
   </>
  );
};

export default NotesEditor;