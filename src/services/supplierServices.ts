import loki from 'lokijs';
import { Supplier, WorkOrder } from '../types/Supplier';
import moment from 'moment';
import { config } from '../config';

const suppliersCollectionName = 'suppliers';
const { priorityWeighMatrix, messageRatioWeigh } = config;

export const getSortedSuppliers = (
  db: loki,
  offset: number = null,
  pageSize: number = null,
): Supplier[] => {
  let sortedSuppliers = db
    .getCollection(suppliersCollectionName)
    .chain()
    .simplesort('rating', true)
    .offset(offset || 0);

  sortedSuppliers = pageSize
    ? sortedSuppliers.limit(pageSize)
    : sortedSuppliers;

  return sortedSuppliers.data();
};

export const updateSuppliersRating = (db: loki) => {
  const suppliersCount = getNumberOfSuppliers(db);
  const suppliers = db.getCollection(suppliersCollectionName);

  for (let i = 0; i <= suppliersCount; i++) {
    let supplier = getSupplierByLokiId(db, i + 1);

    if (supplier) {
      supplier = updateSupplierRating(supplier);
      suppliers.update(supplier);
    }
  }

  db.save();
};

export const updateSupplierRating = (supplier: Supplier) => {
  supplier = {
    ...supplier,
    rating: calculateSupplierRating(supplier),
    lastRatedDate: moment().format('YYYY-MM-DD'),
  };

  return supplier;
};

export const calculateSupplierRating = (supplier: Supplier): number => {
  const { workOrders } = supplier;
  const workOrderRating = workOrders
    .map(calculateWorkOrderWeighedRating)
    .reduce((aggregate, current) => aggregate + current, 0);

  const finalWorkOrderWeighedRating = workOrderRating * (1 - messageRatioWeigh);

  const messageRatioWeighedRating = calculateMessageWeighedRating(supplier);
  const rating = finalWorkOrderWeighedRating + messageRatioWeighedRating;

  return parseFloat(rating.toFixed(2));
};

export const calculateWorkOrderWeighedRating = (
  workOrder: WorkOrder,
): number => {
  const finishedBeforeDueDate =
    moment(workOrder.dateCompleted).unix() <= moment(workOrder.dateDue).unix();

  const priorityWeigh = priorityWeighMatrix[workOrder.priority];
  return priorityWeigh * (finishedBeforeDueDate ? 1 : 0);
};

export const calculateMessageWeighedRating = (supplier: Supplier): number => {
  const { numOfSentMessages, numOfReceivedMessages } = supplier;
  return numOfReceivedMessages === 0
    ? 0
    : (numOfSentMessages / numOfReceivedMessages) * messageRatioWeigh;
};

const getSupplierByLokiId = (db: loki, id: number): Supplier =>
  db.getCollection(suppliersCollectionName).get(id);

const getNumberOfSuppliers = (db: loki): number =>
  db.getCollection(suppliersCollectionName).count();
