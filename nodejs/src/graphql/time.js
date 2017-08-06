import { GraphQLObjectType, GraphQLInt } from 'graphql';

export default new GraphQLObjectType({
  name: 'Time',
  fields: {
    hour: {
      type: GraphQLInt,
      resolve(obj) {
        return obj.getHours();
      },
    },
    minute: {
      type: GraphQLInt,
      resolve(obj) {
        return obj.getMinutes();
      },
    },
    second: {
      type: GraphQLInt,
      resolve(obj) {
        return obj.getSeconds();
      },
    },
  },
});
