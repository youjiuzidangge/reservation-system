import { ApolloServer } from '@apollo/server';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { koaMiddleware } from '@as-integrations/koa';
import { join } from 'path';
import Koa from 'koa';
import http from 'http';
import resolvers from '@/graphql/resolvers';
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader'
import { loadSchema } from '@graphql-tools/load'


export async function startApolloServer(app: Koa, httpServer: http.Server) {
  const schemas = join(__dirname, '../graphql/**/*.graphql')
  const typeDefs = await loadSchema(schemas, { loaders: [new GraphQLFileLoader()] })
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();

  app.use(
    koaMiddleware(server, {
      context: async ({ ctx }) => ctx.state
    })
  );
}