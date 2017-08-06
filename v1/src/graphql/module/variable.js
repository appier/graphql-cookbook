import {
  GraphQLFloat,
  GraphQLInt,
  GraphQLList,
  GraphQLObjectType,
  GraphQLInputObjectType,
} from 'graphql';

const CalculatorType = new GraphQLObjectType({
  name: 'CalculatorType',
  fields: {
    max: { type: GraphQLFloat },
    min: { type: GraphQLFloat },
    sum: { type: GraphQLFloat },
  },
});

const ProductType = new GraphQLObjectType({
  name: 'ProductType',
  fields: {
    result: { type: GraphQLFloat },
  }
});

const MultiplierInputType = new GraphQLInputObjectType({
  name: 'MultiplierInputType',
  fields: {
    x:  { type: GraphQLFloat, defaultValue: 0  },
    y: { type: GraphQLFloat, defaultValue: 0 },
  }
});


export const getStatistic = {
  type: CalculatorType,
  args: {
    list: { type: new GraphQLList(GraphQLFloat) },
  },
  resolve: (_, {list}) => {
    const max = Math.max(...list);
    const min = Math.min(...list);
    const sum = list.reduce((acc, d)=> acc+d, 0);
    return {
      max, min, sum,
    }
  },
}

export const getProduct = {
  type: ProductType,
  args: {
    input: { type: MultiplierInputType },
  },
  resolve: (_, {input}) => {
    return {
      result: input.x*input.y
    }
  },
}