import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import NoteService from "../services/NoteService";
import Checklist from "../components/Checklist";
import { useDebounce } from "../hooks";
import { Button } from "../components";

const Note = ({ id }) => {
  const history = useHistory();
  const [note, setNote] = useState({});
  const [checklist, setChecklist] = useState({
    title: "Checklist",
    tasks: []
  });

  const debouncedNote = useDebounce(note, 5000);

  const redirectToList = () => {
    return history.push(`/notes`);
  };

  const updateChecklist = async note => {
    delete note.createdAt;
    delete note.updatedAt;
    NoteService.update(note).catch(error => {
      console.error("Error while updating user note", error);
      return null;
    });
  };

  const onTasksChange = tasks => {
    const checklistCopy = { ...checklist, tasks };
    setChecklist(checklistCopy);
    setNote({ ...note, checklist: checklistCopy });
  };

  useEffect(() => {
    NoteService.get(id)
      .then(response => {
        if (!response.data.data) {
          return history.push(`/notes`);
        }
        setNote(response.data.data);
        if (response.data.data.checklist) {
          setChecklist(response.data.data.checklist);
        }
      })
      .catch(error => {
        console.error("Error while getting user note", error);
        return null;
      });
  }, []);

  useEffect(() => {
    console.log(debouncedNote);
    if (debouncedNote._id) {
      updateChecklist(debouncedNote);
    }
  }, [debouncedNote]);
  return (
    <>
      <Button onClick={redirectToList} width="8vw">
        Back
      </Button>
      <h2>{note.title}</h2>
      <div></div>
      <Checklist checklist={checklist} onTasksChange={onTasksChange} />
      <div></div>
    </>
  );
};

export default Note;
