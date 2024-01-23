import {useState} from 'react'
import {gql, useMutation} from '@apollo/client'
import styled from 'styled-components'

const Button = styled.button`
  background: Bisque;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid Chocolate;
  border-radius: 3px;
`

const Input = styled.input`
  margin: 0.25em;
`
const Page = styled.div`
  padding: 1em;
  background: papayawhip;
`
const Divas = styled.div`
  background: Skyblue;
  padding: 1em;
  margin-top: 0.2em;
  
`

const CREATE_PERSON = gql`
mutation createPerson($name: String!, $street: String!, $city: String!, $phone: String) {
    addPerson(
      name: $name,
      street: $street,
      city: $city,
      phone: $phone
    ) {
      name
      phone
      id
      address {
        street
        city
      }
    }
  }
`
const ALL_PERSONS = gql`
  query  {
    allPersons  {
      name
      phone
      id
    }
  }
`
const PersonForm = () =>{
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [street, setStreet] = useState('')
    const [city, setCity] = useState('')

    const [createPerson] = useMutation(CREATE_PERSON, {
        refetchQueries: [{query: ALL_PERSONS}]
    })

    const submit =(event) =>{
        event.preventDefault()
        createPerson({variables: {name,phone,street,city}})
        setName('')
        setCity('')
        setStreet('')
        setPhone('')


    }

    return(

        <Page>
            <form onSubmit={submit}>
                <Divas>
                    name : <Input value={name} 
                      onChange={({target})=> setName(target.value)}/>
                </Divas>
                <Divas>
                    phone : <Input value={phone} 
                      onChange={({target})=> setPhone(target.value)}/>
                </Divas>
                <Divas>
                    street : <Input value={street} 
                      onChange={({target})=> setStreet(target.value)}/>
                </Divas>
                <Divas>
                    city : <Input value={city} 
                      onChange={({target})=> setCity(target.value)}/>
                </Divas>
                <Button type='submit'>add!</Button>
            </form>
        </Page>
    )

}

export default PersonForm
