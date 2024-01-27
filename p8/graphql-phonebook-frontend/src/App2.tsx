import {gql,useQuery} from '@apollo/client'
import BookForm from './component/PersonFormC'
import Books from './component/Books'
const GET_ALLBOOKS = gql`
    query{
        allBooks{
            title,
            author,
            published,
            genres
        }
    }
`



const App2 =()=>{

    const results =useQuery(GET_ALLBOOKS)
  
  if(results.loading){
    return(
      <div> Loading...</div>
    )
  }
    return(
        <div>
          <BookForm />
          <Books books={results.data.allBooks} />
        </div>
    )
}
export default App2