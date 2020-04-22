import loki from 'lokijs';
import { getSortedSuppliers } from '../services/supplierServices';

export const resolvers = (db: loki) => ({
  Query: {
    pagedSuppliers: (_, { offset, pageSize }) =>
      getSortedSuppliers(db, offset, pageSize),
  },
});
