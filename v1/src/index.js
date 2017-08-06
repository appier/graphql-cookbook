import express from 'express';
import config from './config';
import graphqlHTTP from 'express-graphql';
import {
  schema
} from './graphql/schema';

import {
  setup,
} from './serverUtil';

const main = () => {
  let app = setup(express(), {config});

  app.use('/graphql', graphqlHTTP({
    schema,
    rootValue: {
      config
    },
    graphiql: true
  }));

  app.listen(config.server.port);
};

main();
