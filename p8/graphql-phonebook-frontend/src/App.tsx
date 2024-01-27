
import { useApolloClient, useQuery, useSubscription } from '@apollo/client'
import Persons from './component/Persons.jsx'
import PersonForm from './component/PersonForm.js'

import { ALL_PERSONS, PERSON_ADDED} from './component/queries.js'
import { useState } from 'react'
import Notify from './component/Notify.js'
import PhoneForm from './component/PhoneForm.js'
import LoginForm from './component/LoginForm.js'

export const updateCache = (cache, query, addedPerson) => {
  // helper that is used to eliminate saving same person twice
  const uniqByName = (a) => {
    let seen = new Set()
    return a.filter((item) => {
      let k = item.name
      return seen.has(k) ? false : seen.add(k)
    })
  }

  cache.updateQuery(query, ({ allPersons }) => {
    return {
      allPersons: uniqByName(allPersons.concat(addedPerson)),
    }
  })
}


const App =()=>{
  const [errorMessage, setErrorMessage] = useState(null)
  const [token, setToken] = useState(null)
  const result =useQuery(ALL_PERSONS)
  const client = useApolloClient()
  useSubscription(PERSON_ADDED, {
    onData: ({data}) =>{
      const addedPerson = data.data.personAdded 
      notify(`${addedPerson.name} added`)
      updateCache(client.cache, { query: ALL_PERSONS }, addedPerson)

     


    },
  })
  const notify=(message)=>{
     setErrorMessage(message)
     setTimeout(() => {
        setErrorMessage(null)
     }, 10000);
  }
  
  
  if(result.loading){
    return(
      <div> Loading...</div>
    )
  }
  const logout = ()=>{
    setToken(null)
    localStorage.clear()
    client.resetStore()

  }
  if(!token){
    return(
      <>
        <Notify errorMessage={errorMessage}></Notify>
        <LoginForm  setError={notify} setToken={setToken}/>

      </>

    )

  }


   return(
    <div>
      <Notify errorMessage={errorMessage} />
      <button onClick={logout}>logout</button>
      <PersonForm setError={notify}/>
      <Persons persons = {result.data.allPersons} />
      <PhoneForm setError={notify}/>
    </div>
  )

 
}


export default App