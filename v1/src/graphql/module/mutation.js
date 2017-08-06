import {
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';


// Dummy Data
let companyData = [
	{
		companyId: 'companyId1',
		name: 'Appier',
	},
];


// Type Definition
const CompanyType = new GraphQLObjectType({
  name: 'CompanyType',
  fields: {
    companyId: { type: GraphQLString },
    name: { type: GraphQLString },
  },
});

// Query Definition

export const listCompany = {
	type: new GraphQLList(CompanyType),
	args: {
  },
	resolve: () => {
		return companyData;
	},
}

export const createCompany = {
  type: CompanyType,
  args: {
    name: {type: new GraphQLNonNull(GraphQLString)},
  },
  resolve: (_, {name}) => {
    const newCompany = {
      companyId: `companyId${companyData.length+1}`,
      name,
    }
    companyData.push(newCompany);
    return newCompany;
  }
};

export const updateCompany = {
  type: CompanyType,
  args: {
    companyId: {type: new GraphQLNonNull(GraphQLString)},
    name: {type: new GraphQLNonNull(GraphQLString)},
  },
  resolve: (_, {companyId, name}) => {
    const targetCompany = companyData.filter(d=>d.companyId === companyId)[0];
    if(targetCompany){
      targetCompany.name = name;
     return targetCompany;
    }
    return null;
  }
};