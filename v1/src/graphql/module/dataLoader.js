import {
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';

import DataLoader from 'dataloader'


// Dummy Data
const userData = [
  {
    userId: 'userId1',
    friends: ['userId3', 'userId2', 'userId4', 'userId6'],
  },
  {
    userId: 'userId2',
    friends: ['userId1', 'userId3', 'userId3', 'userId4','userId5'],
  },
  {
    userId: 'userId3',
    friends: ['userId1', 'userId2', 'userId6'],
  },
  {
    userId: 'userId4',
    friends: ['userId1', 'userId2', 'userId5'],
  },
  {
    userId: 'userId5',
    friends: ['userId2', 'userId4'],
  },
  {
    userId: 'userId6',
    friends: ['userId1', 'userId6'],
  },
];

const dbEmulator = (userId) => {
  console.log('DB load user: '+ userId);
  return  userData.filter(d=> d.userId === userId)[0];
}

// Type Definition
const PersonType = new GraphQLObjectType({
  name: 'PersonType',
  fields: () => ({
    userId: { type: GraphQLString },
    friends: {
      type: new GraphQLList(PersonType),
      resolve: (person) => {
        return person.friends.map(dbEmulator)
      }
    },
  }),
});

const PersonTypeWithDataLoader = new GraphQLObjectType({
  name: 'PersonTypeWithDataLoader',
  fields: () => ({
    userId: { type: GraphQLString },
    friends: {
      type: new GraphQLList(PersonTypeWithDataLoader),
      resolve: async (person, args, context, ast) => {
        return await context.personLoader.loadMany(person.friends)
      }
    },
  }),
});

export const queryUser = {
  type: PersonType,
  args: {
    userId: { type: new GraphQLNonNull(GraphQLString) },
  },
  resolve: (context, {userId}) => {
    return dbEmulator(userId);
  },
}

export const queryUserWithDataLoader = {
  type: PersonTypeWithDataLoader,
  args: {
    userId: { type: new GraphQLNonNull(GraphQLString) },
  },
  resolve: ({cfg}, {userId}, context) => {
    context.personLoader = new DataLoader(async (userIds) => {
      console.log('batch in dataloader', userIds);
      return userIds.map(dbEmulator)
    });
    return dbEmulator(userId);
  },
}


