import loki from 'lokijs';
import {
  getSortedSuppliers,
  getSupplierById,
  getNumberOfSuppliers,
} from '../services/supplierServices';

export const resolvers = (db: loki) => ({
  Query: {
    pagedSuppliers: (_, { offset, pageSize }) => ({
      suppliers: getSortedSuppliers(db, offset, pageSize),
      total: getNumberOfSuppliers(db),
    }),
    supplier: (_, { id }) => getSupplierById(db, id),
  },
});
