import React from 'react'
import { ApolloProvider } from 'react-apollo'
import { ApolloLink } from 'apollo-link'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import Routes from './routes'
const cache = new InMemoryCache({
    dataIdFromObject: object => object._id
})

const link = createHttpLink({
    uri: "/graphql",
    credentials:"same-origin"
})

export const client = new ApolloClient({
    cache,
    link: ApolloLink.from([link])
})



export default class App extends React.Component {
    render() {
        return (
            <ApolloProvider client={client}>
            
                <Routes/>
            </ApolloProvider>
        )
    }
}