import { GraphQLInputObjectType, GraphQLInt } from 'graphql';

export default new GraphQLInputObjectType({
  name: 'TimeInput',
  fields: {
    hour: { type: GraphQLInt },
    minute: { type: GraphQLInt },
    second: { type: GraphQLInt },
  },
});
