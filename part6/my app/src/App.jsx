import NewNote from "./component/NewNote";
import Notes from "./component/Notes";
import VisibilityFilter from "./component/VisibilityFilter";
import { initialiseNotes } from "./reducer/noteReducer";
import { useEffect } from "react";
import { useDispatch} from 'react-redux'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initialiseNotes()) 
  }, [dispatch]) 

  return (
    <div>
      <NewNote />
      <VisibilityFilter />
      <Notes />
    </div>
  )
}
export default App