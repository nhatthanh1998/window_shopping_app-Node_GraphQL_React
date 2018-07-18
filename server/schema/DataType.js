import { GraphQLObjectType, GraphQLString, GraphQLFloat, GraphQLList } from 'graphql'
import { Stub } from '../model/stub'
import { User } from '../model/user'
const StubType = new GraphQLObjectType({
    name:"stub",
    fields:()=>({
        author:{
             type:UserType,
        },
        _id:{
            type:GraphQLString
        },
        name:{
            type:GraphQLString
        },
        description:{
            type:GraphQLString
        },
        type:{
            type:GraphQLString
        },
        price:{
            type:GraphQLFloat
        },
        shop:{
            type:GraphQLString
        }
    })
})




const UserType = new GraphQLObjectType({
    name: "user",
    fields:()=> ({
        _id: {
            type: GraphQLString
        },
        firstName: {
            type: GraphQLString
        },
        lastName: {
            type: GraphQLString
        },
        address: {
            type: GraphQLString
        },
        facebookId: {
            type: GraphQLString
        },
        googleId: {
            type: GraphQLString
        },
        username: {
            type: GraphQLString
        },
        password: {
            type: GraphQLString
        },
        hourlyIncome: {
            type: GraphQLFloat
        },
        displayName:{
            type:GraphQLString
        },
        stubs: {
            type: new GraphQLList(StubType)
        }
    })
})

module.exports = {
    UserType,
    StubType
}