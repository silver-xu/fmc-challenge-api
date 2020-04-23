> This is the api side of FMClarity challenge

## Summary

This project uses lokijs as a offline no-sql database to store suppliers information, and exposes a single graphql endpoint

## Features

- Generates 100 mock suppliers in the database
- Asynchronously update their ratings based on WorkOrders and Message Ratios every 5 mins
- Graphql with server-side pagination

## Default GraphQL Playground

[http://localhost:4000/graphql](http://localhost:4000/graphql)

## Sample Queries

### Get a single supplier

```graphql
query Suppliers($id: String!) {
  supplier(id: $id) {
    id
    name
    number
    services
    workOrders {
      dateDue
      dateCompleted
      priority
      serviceReportProvided
    }
    numOfSentMessages
    numOfReceivedMessages
    rating
    lastRatedDate
  }
}
```

### Get a pasged suppliers list

```graphql
query Suppliers($offset: Int, $pageSize: Int) {
  pagedSuppliers(offset: $offset, pageSize: $pageSize) {
    suppliers {
      id
      name
      number
      services
      workOrders {
        dateDue
        dateCompleted
        priority
        serviceReportProvided
      }
      numOfSentMessages
      numOfReceivedMessages
      rating
      lastRatedDate
    }
    total
  }
}
```

## Install all dependencies

```
yarn install
```

## Reseed database

```
yarn seed
```

## Build

```
yarn build
```

## Start

```
yarn start
```

## Test

```
yarn test
```

## Linting

```
yarn lint
```

## Fix Linting

```
yarn format
```
