import { useState } from "react";
import { gql, useQuery} from '@apollo/client'

const FIND_BOOKS = gql`
query findBookByName($nameToSearch: String!){
    findBook(name: $nameToSearch){
       title
       author
       published
       genres

    }
}
`

const Book = ({book , onclose}) =>{
    return(
        <div>
           <h2> {book.title}</h2>
           <div>
              {book.author} {book.genres}
           </div>
           <div> {book.published}</div>
           <button onClick={onclose}> close</button>
        
        </div>
    )
}

const Books =({books})=>{
    const [nameToSearch, setNameToSearch] = useState(null)
    const results = useQuery(FIND_BOOKS, {
        variables: {nameToSearch},
        skip: !nameToSearch,
    })

    if(nameToSearch&& results.data){
        return(
            <Book
              book={results.data.findPerson}
              onclose={()=> setNameToSearch(null)}
            />  
        )
    }

    return (
        <div>
           <h2>Books</h2>
           {books.map((p)=>(
              <div key={p.title}>
                 {p.genres}  {p.author}
                 <button >
                    show details
                 </button>
               </div>  
           ))}
        
        </div>
    )
}

export default Books