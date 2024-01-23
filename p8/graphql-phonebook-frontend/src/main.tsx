// import ReactDOM from 'react-dom/client'
// import App from './App'

// import { ApolloClient,InMemoryCache, gql} from '@apollo/client'

// const client = new ApolloClient({
//   uri: 'http://localhost:7111/',
//   cache: new InMemoryCache(),
// })
// const query = gql`
//   query {
//   allPersons{
//     name,
//     phone,
//     address{
//       street,
//       city
//     }
//     id
//   }
//   }
// `

// client.query({query})
//     .then((response)=>{
//       console.log(response.data)
//     })

// ReactDOM.createRoot(document.getElementById('root')).render(<App />)    


import  ReactDOM from "react-dom/client";
import App from "./App";
import { ApolloProvider,InMemoryCache, ApolloClient } from "@apollo/client";

const client = new ApolloClient({
  uri: 'http://localhost:7111',
  cache: new InMemoryCache
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
)