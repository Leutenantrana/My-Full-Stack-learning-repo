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
  margin-top: 1em;
  
`

const CREATE_BOOK = gql`
mutation createPerson($title: String!, $author: String!, $published: String!, $genres: [String!]!) {
    addBook(
      title: $title,
      author: $author,
      published: $published,
      genres: $genres
    ) {
      title
      author
      published
      genres
    }
  }
`
const GET_ALLBOOKS = gql`
  query  {
    allBooks {
      title
      author
      published
      genres

    }
  }
`
const BookForm = () =>{
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [published, setPublished] = useState('')
    const [genres, setGenres] = useState('')

    const [createBook] = useMutation(CREATE_BOOK, {
        refetchQueries: [{query: GET_ALLBOOKS}]
    })

    const submit =(event) =>{
        event.preventDefault()
        createBook({variables: {title,author,published,genres}})
        setTitle('')
        setAuthor('')
        setPublished('')
        setGenres('')


    }

    return(

        <Page>
            <form onSubmit={submit}>
                <Divas>
                    title : <Input value={title} 
                      onChange={({target})=> setTitle(target.value)}/>
                </Divas>
                <Divas>
                    author: <Input value={author} 
                      onChange={({target})=> setAuthor(target.value)}/>
                </Divas>
                <Divas>
                    published : <Input value={published} 
                      onChange={({target})=> setPublished(target.value)}/>
                </Divas>
                <Divas>
                    genres : <Input value={genres} 
                      onChange={({target})=> setGenres(target.value)}/>
                </Divas>
                <Button type='submit'>add!</Button>
            </form>
        </Page>
    )

}

export default BookForm
