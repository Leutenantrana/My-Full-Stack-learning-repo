import { ApolloProvider,InMemoryCache,createHttpLink, ApolloClient, split} from "@apollo/client";
import {setContext} from '@apollo/client/link/context'
import { getMainDefinition } from "@apollo/client/utilities";
import {GraphQLWsLink }from '@apollo/client/link/subscription'
import { createClient } from 'graphql-ws'

import App from "./App";
import App2 from "./App2";


const authLink = setContext((_, { headers})=>{
    const token = localStorage.getItem('phonenumbers-user-token')
    return{
        headers : {
            ...headers,
            authorization : token ? `Bearer ${token}` : null
        }
    }

})

const httpLink = createHttpLink({
    uri:'http://localhost:7111',
})

const wsLink = new GraphQLWsLink(
    createClient({url: 'ws://localhost:4000'})
)

const splitLink = split(({query})=>{
    const definition = getMainDefinition(query)
    return(
        definition.kind === 'OperationDefinition' && 
        definition.operation === 'subscription'

    )
},
wsLink,
authLink.concat(httpLink))


const client = new ApolloClient({
    link: splitLink,
    cache: new InMemoryCache
})

const Component1 = ()=>{
    return(
        <div>

            <ApolloProvider client={client}>

                <App /> 
            </ApolloProvider>

            <br></br>
            <br></br>
            <br></br>
            <br></br>



           

        </div>
        
       
    )
}

export default Component1