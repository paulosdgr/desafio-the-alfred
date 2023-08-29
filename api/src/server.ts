import express, { Express, json } from 'express';
import { ApolloServer } from '@apollo/server';

import { typeDefs, resolvers } from './graphql';
import * as dotenv from 'dotenv';
import { expressMiddleware } from '@apollo/server/express4';
import http from 'http';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import cors from 'cors';
const app: Express = express();
const httpServer = http.createServer(app);

dotenv.config();

const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

server.start().then(() => {
    app.use('/', cors(), json(), expressMiddleware(server));
});

const PORT = Number(process.env.PORT) || 4000
app.listen(PORT, () => {
    console.log('Server is listening on http://localhost:4000/graphql');
});
