import { useParams } from 'react-router-dom';
import { NotesEditor } from '../components';

const Note = () => {
  const {id} = useParams();
  return (
   <>
     <NotesEditor id={id}/>
   </>
  );
};

export default Note;