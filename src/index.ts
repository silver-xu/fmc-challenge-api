import loki from 'lokijs';
import express from 'express';
import cors from 'cors';
import { ApolloServer } from 'apollo-server-express';

import { config } from './config';
import { ratingServiceWorker as startRatingServiceWorker } from './serviceWorker';
import { typeDefs } from './schemas/supplierSchema';
import { resolvers } from './resolvers/supplierResolver';

const supplierTableName = 'suppliers';

const initDb = () => {
  console.log('Connecting to db...');
  const suppliersCollection = db.getCollection(supplierTableName);

  if (suppliersCollection === null) {
    db.addCollection(supplierTableName);
  }

  // This simulates an asynchronous processer which updates rating
  // every 60 minutes. In real production system it should be
  // a seperate lambda which listens to work order events
  startRatingServiceWorker(db);

  startApollo();
};

const db = new loki(config.dbPath, {
  autoload: true,
  autoloadCallback: initDb,
});

const startApollo = () => {
  const server = new ApolloServer({ typeDefs, resolvers: resolvers(db) });
  const app = express();
  app.use(cors());
  server.applyMiddleware({ app });
  app.listen({ port: 4000 }, () =>
    console.log(
      `🚀 Server ready at http://localhost:4000${server.graphqlPath}`,
    ),
  );
};
