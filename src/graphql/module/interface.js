import {
  GraphQLFloat,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInterfaceType,
} from 'graphql';


// Dummy Data
const appPerformanceData = [
  {
    appId: 'appId1',
    cost: 10,
    action: 5,
    click: 12,
    impression: 200,
  },
  {
    appId: 'appId2',
    cost: 20,
    action: 6,
    click: 14,
    impression: 400,
  },
];

const creativePerformanceData = [
  {
    creativeId: 'creativeId1',
    cost: 1,
    action: 2,
    click: 3,
    impression: 40,
  },
  {
    creativeId: 'creativeId2',
    cost: 2,
    action: 3,
    click: 4,
    impression: 500,
  },
];

// Interface Definition

const PerformanceInterface = new GraphQLInterfaceType({
  name: 'PerformanceInterface',
  fields: {
    cost: { type: GraphQLFloat },
    action: { type: GraphQLInt },
    click: { type: GraphQLInt },
    impression: { type: GraphQLInt },
  }
});

// Type Definition

const AppPeroformanceType = new GraphQLObjectType({
  name: 'AppPeroformanceType',
  interfaces: [PerformanceInterface],
  fields: {
    appId: { type: GraphQLString },
    cost: { type: GraphQLFloat },
    action: { type: GraphQLInt },
    click: { type: GraphQLInt },
    impression: { type: GraphQLInt },
  },
  isTypeOf: (value) => {
  	return value.appId;
  }
});

const CreativePeroformanceType = new GraphQLObjectType({
  name: 'CreativePeroformanceType',
  interfaces: [PerformanceInterface],
  fields: {
    creativeId: { type: GraphQLString },
    cost: { type: GraphQLFloat },
    action: { type: GraphQLInt },
    click: { type: GraphQLInt },
    impression: { type: GraphQLInt },
  },
  isTypeOf: (value) => {
  	return value.creativeId;
  }
});


// Query Definition

export const queryAppPerformance = {
	type: AppPeroformanceType,
	args: {
    appId: { type: new GraphQLNonNull(GraphQLString) },
  },
	resolve: (_, {appId}) => {
		return appPerformanceData.filter(d=> d.appId === appId)[0];
	},
}

export const queryCreativePerformance = {
	type: CreativePeroformanceType,
	args: {
    creativeId: { type: new GraphQLNonNull(GraphQLString) },
  },
	resolve: (_, {creativeId}) => {
		return creativePerformanceData.filter(d=> d.creativeId === creativeId)[0];
	},
}