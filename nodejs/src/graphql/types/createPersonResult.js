import { GraphQLObjectType, GraphQLBoolean } from 'graphql';
import Person from './person';

export default new GraphQLObjectType({
  name: 'CreatePersonResult',
  fields: {
    ok: { type: GraphQLBoolean },
    person: { type: Person },
  },
});
