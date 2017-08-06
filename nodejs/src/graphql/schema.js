import { GraphQLSchema, GraphQLObjectType, GraphQLString } from 'graphql';
import Time from './time';

export default new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: {
      serverTime: {
        type: GraphQLString,
        resolve() {
          return new Date().toISOString();
        },
      },
      serverTimeObj: {
        type: Time,
        resolve() {
          return new Date();
        },
      },
    },
  }),
});
