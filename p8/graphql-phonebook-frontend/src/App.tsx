
import {gql, useQuery } from '@apollo/client'
import Persons from './component/Persons.jsx'
import PersonForm from './component/PersonForm.js'

const ALL_PERSONS =gql`
query{
  allPersons{
    name
    phone
    id
  }
}
`

const App =()=>{
  const result =useQuery(ALL_PERSONS)
  
  if(result.loading){
    return(
      <div> Loading...</div>
    )
  }

  return(
    <div>
      <PersonForm />
      <Persons persons = {result.data.allPersons} />
    </div>
  )
}

export default App