import { GraphQLSchema, GraphQLObjectType, GraphQLString } from 'graphql';
import Time from './types/time';
import TimeInput from './types/timeInput';

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
});

function getOffsetMillisecond({ hour = 0, minute = 0, second = 0 }) {
  return 1000 * (hour * 3600 + minute * 60 + second);
}
