import { GraphQLObjectType, GraphQLString, GraphQLInt } from 'graphql';

export default new GraphQLObjectType({
  name: 'Person',
  fields: {
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
  },
});
