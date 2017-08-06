import express from 'express';
import bodyParser from 'body-parser';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import schema from './graphql/schema';

const PORT = process.env.PORT || 3000;

const app = express();

app.post('/graphql', bodyParser.json(), graphqlExpress({ schema }));
app.get('/graphql', graphiqlExpress({ endpointURL: '/graphql' }));

app.listen(PORT, () => {
  console.log(`Server ready at http://localhost:${PORT}`);
});
