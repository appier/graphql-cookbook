import {
  graphql,
  GraphQLFloat,
  GraphQLInt,
  GraphQLList,
  GraphQLObjectType,
  GraphQLString,
  GraphQLUnionType,
} from 'graphql';


// Dummy Data

const creativeData = [
	{
	  creativeId: 'creativeId1',
	  type: 'Text',
	  text: 'Best Ad',
	},
	{
	  creativeId: 'creativeId2',
	  type: 'Text',
	  text: 'Call to Action',
	},
	{
	  creativeId: 'creativeId3',
	  type: 'Banner',
	  url: 'imgur.com/G6qJ75i',
	  width: 160,
	  height: 600,
	},
	{
	  creativeId: 'creativeId4',
	  type: 'Banner',
	  url: 'imgur.com/HaeJ8aN5',
	  width: 300,
	  height: 250,
	},
	{
	  creativeId: 'creativeId5',
	  type: 'Video',
	  file: 'somewhere.in.AWS',
	},
];


// Type Definition

const TextType = new GraphQLObjectType({
  name: 'TextType',
  fields: {
    creativeId: { type: GraphQLString },
    type: { type: GraphQLString },
    text: { type: GraphQLString },
  },
});

const BannerType = new GraphQLObjectType({
  name: 'BannerType',
  fields: {
    creativeId: { type: GraphQLString },
    type: { type: GraphQLString },
    url: { type: GraphQLString },
    width: { type: GraphQLInt },
    height: { type: GraphQLInt },
  },
});

const VideoType = new GraphQLObjectType({
  name: 'VideoType',
  fields: {
    creativeId: { type: GraphQLString },
    type: { type: GraphQLString },
    file: { type: GraphQLString },
  },
});

const CreativeItemType = new GraphQLUnionType({
  name: 'CreativeItemType',
  types: [ TextType, BannerType, VideoType ],
  resolveType(value) {
  	if(value.type === 'Text'){
  		return TextType;
  	}
  	else if(value.type === 'Banner'){
  		return BannerType;
  	}
  	if(value.type === 'Video'){
  		return VideoType;
  	}
  }
});

// Query Definition
export const listCreative = {
	type: new GraphQLList(CreativeItemType),
	args: {
  },
	resolve: () => {
		return creativeData;
	},
}