import {
  GraphQLObjectType,
  GraphQLSchema,
} from 'graphql';

import {
  listCampaign,
  queryCampaign,
} from './module/basic';

import {
  getStatistic,
  getProduct,
} from './module/variable';

import {
  queryAppPerformance,
  queryCreativePerformance,
} from './module/interface';

import {
  listCreative
} from './module/unionType';

import {
  listCompany,
  createCompany,
  updateCompany,
} from './module/mutation';


export const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      listCampaign,
      queryCampaign,
      getStatistic,
      getProduct,
      queryAppPerformance,
      queryCreativePerformance,
      listCreative,

      listCompany,
    },
  }),
  mutation: new GraphQLObjectType({
    name: 'RootMutationType',
    fields: {
      createCompany,
      updateCompany,
    }
  }),
});
