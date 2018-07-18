import { GraphQLObjectType, GraphQLString, GraphQLFloat } from 'graphql'
import { StubType, UserType } from './DataType'
import { Stub } from '../model/stub'
import { User } from '../model/user'
import 'babel-polyfill'
const mutation = new GraphQLObjectType({
    name: "mutation",
    fields: {
        addStub: {
            type: StubType,
            args: {
                name: {
                    type: GraphQLString
                },
                description: {
                    type: GraphQLString
                },
                type: {
                    type: GraphQLString
                },
                price: {
                    type: GraphQLFloat
                },
                shop: {
                    type: GraphQLString
                }
            },
            async resolve(_, args, context) {
                if (context) {
                    var name, description, type, price = 0, shop, author
                    args.name ? name = args.name : " "
                    args.description ? description = args.description : " "
                    args.type ? type = args.type : " "
                    args.price ? price = args.price : price
                    args.shop ? shop = args.shop : " ",
                        author = context

                    const newStub = await new Stub({
                        name,
                        description,
                        type,
                        price,
                        shop,
                        author
                    }).save()
                    await context.stubs.push(newStub)
                    await context.save()
                    return newStub
                }
            }
        },
        deleteStub: {
            type: StubType,
            args: {
                _id: {
                    type: GraphQLString
                }
            },
            async resolve(_, args, context) {
                if (context) {
                    context.stubs = context.stubs.filter(stub => stub._id !== args._id)
                    await context.save()
                    return Stub.findById(args._id).then(stub => {
                        stub.remove()
                        return stub
                    })

                }
            }
        },
        updateStub: {
            type: StubType,
            args: {
                _id: {
                    type: GraphQLString
                },
                name: {
                    type: GraphQLString
                },
                description: {
                    type: GraphQLString
                },
                type: {
                    type: GraphQLString
                },
                price: {
                    type: GraphQLFloat
                },
                shop: {
                    type: GraphQLString
                }
            },
            async resolve(_, args, context) {
                if (context, args._id) {
                    return Stub.findById(args._id).then(stub => {
                        args.name ? stub.name = args.name : stub.name
                        args.description ? stub.description = args.description : stub.description
                        args.type ? stub.type = args.type : stub.type
                        args.price ? stub.price = args.price : stub.price
                        args.shop ? stub.shop = args.shop : stub.shop
                        return stub.save().then(updatedStub=>{
                            return updatedStub
                        })
                    })
                }
            }
        },
        updateUser: {
            type: UserType,
            args: {
                firstName: {
                    type: GraphQLString
                },
                lastName: {
                    type: GraphQLString
                },
                hourlyIncome: {
                    type: GraphQLFloat
                },
                address: {
                    type: GraphQLString
                },
                displayName: {
                    type: GraphQLString
                }
            },
            resolve(_, args, context) {
                if (context) {
                    args.firstName ? context.firstName = args.firstName : context.firstName
                    args.lastName ? context.lastName = args.lastName : context.lastName
                    args.hourlyIncome ? context.hourlyIncome = args.hourlyIncome : context.hourlyIncome
                    args.address ? context.address = args.address : context.address
                    args.displayName ? context.displayName = args.displayName : context.displayName
                    return context
                }

            }
        },
        deleteUser: {
            type: UserType,
            resolve(_, args, context) {
                if (context) {
                    return User.findById(context._id).then(user => {
                        user.remove()
                        context.logout()
                        return user
                    })
                }
            }
        }
    }
})
module.exports = {
    mutation
}