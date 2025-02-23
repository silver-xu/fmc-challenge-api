import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type Query {
    pagedSuppliers(offset: Int, pageSize: Int): Suppliers
    supplier(id: String!): Supplier
  }

  type Suppliers {
    suppliers: [Supplier]!
    total: Int
  }

  type Supplier {
    id: String!
    name: String!
    number: String!
    services: [String]!
    workOrders: [WorkOrder]!
    numOfSentMessages: Int!
    numOfReceivedMessages: Int!
    rating: Float
    lastRatedDate: String
  }

  type WorkOrder {
    dateDue: String!
    dateCompleted: String!
    priority: Int!
    serviceReportProvided: Boolean!
  }
`;
