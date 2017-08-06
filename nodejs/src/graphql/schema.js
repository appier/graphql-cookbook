import { GraphQLSchema, GraphQLObjectType, GraphQLString } from 'graphql';
import Time from './types/time';
import TimeInput from './types/timeInput';
import CreatePersonResult from './types/createPersonResult';

export default new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: {
      serverTime: {
        type: GraphQLString,
        resolve() {
          return new Date().toLocaleString();
        },
      },
      serverTimeObj: {
        type: Time,
        resolve() {
          return new Date();
        },
      },
      serverTimeWithInput: {
        type: GraphQLString,
        args: {
          timezone: {
            type: GraphQLString,
            description: 'Timezone name (Area/City)',
          },
          offset: {
            type: TimeInput,
            description:
              'Offsets the returned time with given hour, minute and second.',
          },
        },
        resolve(obj, { timezone = 'Asia/Taipei', offset = {} }) {
          const offsetValue = getOffsetMillisecond(offset);
          const date = new Date(Date.now() + offsetValue).toLocaleString({
            timeZone: timezone,
          });
          return date;
        },
      },
    },
  }),

  mutation: new GraphQLObjectType({
    name: 'Mutation',
    fields: {
      createPerson: {
        type: CreatePersonResult,
        args: { name: { type: GraphQLString } },
        resolve(obj, args) {
          const person = { name: args.name };
          // Should do something that persists
          // the person
          return {
            ok: true,
            person,
          };
        },
      },
    },
  }),
});

function getOffsetMillisecond({ hour = 0, minute = 0, second = 0 }) {
  return 1000 * (hour * 3600 + minute * 60 + second);
}
