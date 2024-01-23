import { useState } from "react";
import { gql, useQuery} from '@apollo/client'

const FIND_PERSON = gql`
query findPersonsByName($nameToSearch: String!){
    findPerson(name: $nameToSearch){
        name
        phone
        id
        address{
            street,
            city
        }

    }
}
`

const Person = ({person , onclose}) =>{
    return(
        <div>
           <h2> {person.name}</h2>
           <div>
              {person.address.street} {person.address.city}
           </div>
           <div> {person.phone}</div>
           <button onClick={onclose}> close</button>
        
        </div>
    )
}

const Persons =({persons})=>{
    const [nameToSearch, setNameToSearch] = useState(null)
    const results = useQuery(FIND_PERSON, {
        variables: {nameToSearch},
        skip: !nameToSearch,
    })

    if(nameToSearch&& results.data){
        return(
            <Person 
              person={results.data.findPerson}
              onclose={()=> setNameToSearch(null)}
            />  
        )
    }

    return (
        <div>
           <h2>Persons</h2>
           {persons.map((p)=>(
              <div key={p.name}>
                 {p.name}  {p.phone}
                 <button onClick={()=> setNameToSearch(p.name)}>
                    show address
                 </button>
               </div>  
           ))}
        
        </div>
    )
}

export default Persons