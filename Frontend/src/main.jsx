import ReactDOM from 'react-dom/client'
import {useState} from 'react'

import {BrowserRouter as Router, Routes, Route,Link, Navigate, useParams, useNavigate, useMatch} from "react-router-dom"


const Home = () => (
    <div>
      <h2>Yours notes app</h2>
      <p>Association football, more commonly known as football or soccer,[a] is a team sport played between two teams of 11 players each, who primarily use their feet to propel a ball around a rectangular field called a pitch. The objective of the game is to score more goals than the opposing team by moving the ball beyond the goal line into a rectangular-framed goal defended by the opposing team. Traditionally, the game has been played over two 45-minute halves, for a total match time of 90 minutes. With an estimated 250 million players active in over 200 countries and territories, it is the world's most popular sport.

      The game of association football is played in accordance with the Laws of the Game, a set of rules that has been in effect since 1863 and maintained by the IFAB since 1886. The game is played with a football that is 68–70 cm (27–28 in) in circumference. The two teams compete to get the ball into the other team's goal (between the posts and under the bar), thereby scoring a goal. When the ball is in play, the players mainly use their feet, but may use any other part of their body, except for their hands or arms, to control, strike, or pass the ball. Only the goalkeepers may use their hands and arms, and only then within the penalty area. The team that has scored more goals at the end of the game is the winner. Depending on the format of the competition, an equal number of goals scored may result in a draw being declared, or the game goes into extra time or a penalty shoot-out.</p>
    </div>
)

const Note = ({ note }) => {

    return (
      <div>
        <h2>{note.content}</h2>
        <div>{note.user}</div>
        <div><strong>{note.important ? 'important' : ''}</strong></div>
      </div>
    )
}

const Notes = ({ notes }) => (
    <div>
      <h2>Notes</h2>
      <ul>
        {notes.map(note =>
          <li key={note.id}>
            <Link to={`/notes/${note.id}`}>{note.content}</Link>
          </li>
        )}
      </ul>
    </div>
)

const Users = () => (
<div>
    <h2>Your notes app</h2>
    <ul>
    <li>Sagar Rana</li>
    <li>Tanu Lamba</li>
    <li>Sadhana Rana</li>
    </ul>
</div>
)  

const Login = (props) => {
    const navigate = useNavigate()
  
    const onSubmit = (event) => {
      event.preventDefault()
      props.onLogin('sagar')
      navigate('/')
    }  
    return (
        <div>
          <h2>login</h2>
          <form onSubmit={onSubmit}>
            <div>
              username: <input />
            </div>
            <div>
              password: <input type='password' />
            </div>
            <button type="submit">login</button>
          </form>
        </div>
      )
}  

const App = () => {
    const [notes, setNotes] = useState([
      {
        id: 1,
        content: 'CR7 is the epitome of hardwork',
        important: true,
        user: 'Sagar Rana'
      },
      {
        id: 2,
        content: 'Messi is the GOAT of Football',
        important: false,
        user: 'Tanu Lamba'
      },
      {
        id: 3,
        content: 'Bhai acha lag raha hai',
        important: true,
        user: 'Sagar Rana'
      }
    ])
  
    const [user, setUser] = useState(null)
  
    const match = useMatch('/notes/:id')
  
    const note = match
      ? notes.find(note => note.id === Number(match.params.id))
      : null
  
  
    const login = (user) => {
      setUser(user)
    }
  
    const padding = {
      padding: 5
    }
  
    return (
        <div>
            <div>
                <Link style={padding} to="/">home</Link>
                <Link style={padding} to="/notes">notes</Link>
                <Link style={padding} to="/users">users</Link>
                {user? <em>{user} logged in</em>: <Link style={padding} to="/login">login</Link>}

            </div>
            <Routes>
                <Route path="/notes/:id" element={<Note note={note} />} />
                <Route path ="/notes" element ={<Notes notes ={notes} />} />
                <Route path ="/login" element ={<Login onLogin={login} />} />
                <Route path ="/users" element ={user?<Users />:<Navigate replace to="/login" />} />
                <Route path="/" element={<Home />} />
            </Routes>

            <div>
                <br />
                <em>Welcome to the world of sports lovers</em>
            </div>


           



        </div>
    )

}

ReactDOM.createRoot(document.getElementById('root')).render(<Router><App /></Router>)