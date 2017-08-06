import { GraphQLSchema, GraphQLObjectType, GraphQLString } from 'graphql';

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
    },
  }),
});
