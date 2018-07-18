import { GraphQLSchema } from 'graphql'
import { RootQuery } from './rootQuery'
import { mutation } from './mutation'
const dataSchema = new GraphQLSchema({
    query:RootQuery,
    mutation:mutation
})

module.exports = {
    dataSchema
}