import { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLFloat } from 'graphql'
import { Stub } from '../model/stub'
import {StubType,UserType} from './DataType'
import { User } from '../model/user'
const RootQuery = new GraphQLObjectType({
    name: "rootQuery",
    fields: {
        stub: {
            type: StubType,
            args: {
                _id: {
                    type: GraphQLString
                }
            },
            resolve(_, args, context) {
                if (context) {
                    return Stub.findById(args._id).then(stub => {
                        return stub
                    })
                }
            }
        },
        user: {
            type: UserType,
            resolve(_, args, context) {
                if (context) {
                    return User.findById(context._id).populate('stubs').then(user => {
                        return user
                    })
                }
            }
        },
        hourlyIncome: {
            type: GraphQLFloat,
            resolve(_, args, context) {
                if (context) {
                    return User.findById(context._id.toString()).then(user => {
                        return user.hourlyIncome
                    })
                }
            }
        },
        stubList: {
            type: new GraphQLList(StubType),
            resolve(_, args, context) {
                if (context) {
                    return Stub.find({
                        author: context._id.toString()
                    }).then(stubs => {
                        return stubs
                    })
                }
            }
        }


    }
})
module.exports = {
    RootQuery
}