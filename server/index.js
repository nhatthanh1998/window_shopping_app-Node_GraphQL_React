import express from 'express'
import { mongoose } from './database/mongoose'
import { dataSchema } from './schema/Schema'
import cors from 'cors'
import bodyParser from 'body-parser'
import { graphiqlExpress, graphqlExpress } from 'apollo-server-express'
import passport from 'passport'
import cookieSession from 'cookie-session'
import key from './config/keys'



const app = express()
app.use(cors())


require('./services/passport')
app.use(cookieSession({
    maxAge: 1000 * 60 * 60 * 24 * 30,
    keys: [key.COOKIE_KEY]
}))
app.use(passport.initialize())
app.use(passport.session())

require('./routes/authRoute')(app)


app.use('/graphql', bodyParser.json(), graphqlExpress(req => {
    return {
        schema: dataSchema,
        context: req.user
    }
}))

app.use(graphiqlExpress({
    endpointURL: 'graphql'
}))
app.listen(key.PORT, () => {
    console.log(`graphql Server is start on port ${key.PORT}`)
})