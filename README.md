# GraphQL Cookbook

Code example for building a graphql server through graphql-express.


### Dependencies

```sh
npm install
```

### Run Application

```sh
npm start
```

And open browser to http://localhost:18885/graphql .


### Code Structure

src/index.js, config.js, and serverUtil.js demostrate how to setup a graphql server which allow CROS ajax. The server will use the schema in src/graphql/schema.js.

The code in src/graphql/module are organized by the following section.

* basic.js : Type definition and basic resolve implementation.
* variable.js : Use variable to Simplify Query and define input type.
* interface.js : Build an interface for fragment query.
* unionType.js : Define union type for dynamic data schema.
* mutation.js : Implement mutation.
* dataLoader.js : Demonstrate how to use dataload to improve request performance.


### Type definition and basic resolve implementation

- The type, query definiton, and dummy data is located at src/graphql/module/basic.js
- In this section, we implement a common jointed data structure, and use resolve to build an nested an query for that data structure.

Example Query:
```js
query {
  listCampaign {
    list {
      campaignId
    }
  }
  queryCampaign(campaignId: "campaignId1") {
    campaignId
    adSet {
      adSetId
      creative {
        creativeId
      }
    }
  }
}
```


### Use variable to Simplify Query and Define input type

- The type, query definiton, and dummy data is located at src/graphql/module/variable.js
- In this section, we define an input type to check whether query has an right parameter data structure or not. Thanks for this type definition, we can also abstract those query param to variable, and make your query more elegant.

Example Query:
```js
query {
  getStatistic(list: [1, 2, 3]){
    min
    max
    sum
  }
  getProduct(input: {x: 3, y: 5}){
    result
  }
}
```

Example Query (use variable):
```js
query ($array: [Float], $input: MultiplierInputType) {
  getStatistic(list: $array) {
    min
    max
    sum
  }
  getProduct(input: $input) {
    result
  }
}
```

Variable:
```js
{
  "array": [1,2,3],
  "input": {"x": 3, "y": 5}
}
```

### Build an interface for fragment query

- The type, query definiton, and dummy data is located at src/graphql/module/interface.js
- In this section, we define an interface to allow different type to share the same fields. With help of interface definition, we are able to use fragment to simplify our queries involving different type with same fields.

Example Query (Fragment through type definition):
```js
query {
  perofrmance1: queryAppPerformance(appId: "appId1") {
    appId
    ...performance
  }
  performance2: queryAppPerformance(appId: "appId2") {
    appId
    ...performance
  }
}
fragment performance on AppPeroformanceType {
  cost
  action
  click
  impression
}
```

Example Query (Fragment through interface definition):
```js
query {
  queryAppPerformance(appId: "appId1") {
    appId
    ...performance
  }
  queryCreativePerformance(creativeId: "creativeId1") {
    creativeId
    ...performance
  }
}
fragment performance on PerformanceInterface {
  cost
  action
  click
  impression
}
```

### Define union type for dynamic data schema

- The type, query definiton, and dummy data is located at src/graphql/module/unionType.js
- In this section, we define serveral union type for querying data with dynamic structure. Union type and interface is just like the two sides of coin, and we usually choose the one which can describe our data schema best.

```js
query {
  listCreative {
    ... on TextType {
      creativeId
      type
      text
    }
    ... on BannerType {
      creativeId
      type
      width
      height
      url
    }
    ... on VideoType {
      creativeId
      type
      file
    }
  }
}
```


### Implement mutation

- The type, query definiton, and dummy data is located at src/graphql/module/mutation.js
- In this section, we implement simple mutation for creating and updating our data.

```js
query listCompany{
  listCompany{
    companyId,
    name
  }
}

mutation createCompany {
  createCompany(name: "foobar") {
    companyId
    name
  }
}

mutation updateCompany {
  updateCompany(companyId: "companyId1", name: "appier2") {
    companyId
    name
  }
}
```

### DataLoader

When you request the nested data which used before, resolve function will still hit DB to get data everytime. This will cause lots of unnecessary burden to DB. With dataload, it will cache result in top resolve function, and avoid to hit DB in children resolve.

```js
query {
  queryUser(userId: "userId1") {
    userId
    friends {
      userId
      friends {
        userId
      }
    }
  }
}

query {
  queryUserWithDataLoader(userId: "userId1") {
    userId
    friends {
      userId
      friends {
        userId
      }
    }
  }
}