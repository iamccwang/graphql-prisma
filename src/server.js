import { GraphQLServer, PubSub } from 'graphql-yoga';
import db from "./db";
import { resolvers, fragmentReplacements } from "./resolvers/index"
import prisma from './prisma'

const pubsub = new PubSub()

const server =  new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers,
    context(request) {
        return {
            pubsub,
            db,
            prisma,
            request
        }
    },
    fragmentReplacements
})

export { server as default }