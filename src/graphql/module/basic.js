import {
  graphql,
  GraphQLFloat,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';


// Dummy Data
const campaignData = [
  {
    campaignId: 'campaignId1',
    name: 'Campaign 1',
    adSet: ['adSetId1', 'adSetId2'],
  },
  {
    campaignId: 'campaignId2',
    name: 'Campaign 2',
    adSet: ['adSetId3', 'adSetId4'],
  },
];

const adSetData = [
  {
    adSetId: 'adSetId1',
    name: 'Ad Group 1',
    creative: ['creativeId1', 'creativeId2'],
  },
  {
    adSetId: 'adSetId2',
    name: 'Ad Group 2',
    creative: [],
  },
  {
    adSetId: 'adSetId3',
    name: 'Ad Group 3',
    creative: ['creativeId3'],
  },
  {
    adSetId: 'adSetId4',
    name: 'Ad Group 4',
    creative: [],
  },
];

const creativeData = [
  {
    creativeId: 'creativeId1',
    url: 'url1',
  },
  {
    creativeId: 'creativeId2',
    url: 'url2',
  },
  {
    creativeId: 'creativeId3',
    url: 'url3',
  },
];


// Type Definition
const CreativeType = new GraphQLObjectType({
  name: 'CreativeType',
  fields: {
    creativeId: { type: GraphQLString },
    url: { type: GraphQLString },
  },
});

const AdSetType = new GraphQLObjectType({
  name: 'AdSetType',
  fields: {
    adSetId: { type: GraphQLString },
    name: { type: GraphQLString },
    creative: {
      type: new GraphQLList(CreativeType),
      resolve: (adSet) => {
        return creativeData.filter(d => adSet.creative.indexOf(d.creativeId) >= 0 );
      }
    }
  },
});

const CampaignType = new GraphQLObjectType({
  name: 'CampaignType',
  fields: {
    campaignId: { type: GraphQLString },
    name: { type: GraphQLString },
    adSet: {
      type: new GraphQLList(AdSetType),
      resolve: (campaign) => {
        return adSetData.filter(d => campaign.adSet.indexOf(d.adSetId) >= 0 );
      }
    }
  },
});

const CampaignListType = new GraphQLObjectType({
  name: 'CampaignListType',
  fields: {
    list: {
      type: new GraphQLList(CampaignType),
    },
  },
});

// Query Definition
export const listCampaign = {
  type: CampaignListType,
  args: {
  },
  resolve: () => {
    return {
      list: campaignData
    };
  },
}

export const queryCampaign = {
  type: CampaignType,
  args: {
    campaignId: { type: new GraphQLNonNull(GraphQLString) },
  },
  resolve: (_, {campaignId}) => {
    return campaignData.filter(d=> d.campaignId === campaignId)[0];
  },
}