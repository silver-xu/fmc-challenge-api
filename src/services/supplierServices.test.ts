import { v4 as uuid } from 'uuid';

import { Supplier } from '../types/Supplier';
import {
  calculateMessageWeighedRating,
  calculateWorkOrderWeighedRating,
  calculateSupplierRating,
} from './supplierServices';

const mockSupplier: Supplier = {
  id: uuid(),
  name: 'Mokc User',
  number: '0401234567',
  services: [],
  workOrders: [],
  numOfSentMessages: 10,
  numOfReceivedMessages: 20,
};

describe('supplier services tests', () => {
  describe('calculateMessageWeighedRating tests', () => {
    it('calculateMessageWeighedRating should return correct weighed rating if supplier has received messages', () => {
      const rating = calculateMessageWeighedRating(mockSupplier);
      expect(rating).toEqual(0.25);
    });

    it('calculateMessageWeighedRating should return 0 if suplier has 0 received message', () => {
      const supplier = {
        ...mockSupplier,
        numOfReceivedMessages: 0,
      };

      const rating = calculateMessageWeighedRating(supplier);
      expect(rating).toEqual(0);
    });
  });

  describe('calculateWorkOrderWeighedRating tests', () => {
    [
      {
        workOrder: {
          dateDue: '2020-01-10',
          dateCompleted: '2020-01-01',
          priority: 1,
          serviceReportProvided: true,
        },
        expectedRating: 1,
      },
      {
        workOrder: {
          dateDue: '2020-01-01',
          dateCompleted: '2020-01-10',
          priority: 1,
          serviceReportProvided: true,
        },
        expectedRating: 0,
      },
      {
        workOrder: {
          dateDue: '2020-01-10',
          dateCompleted: '2020-01-01',
          priority: 2,
          serviceReportProvided: true,
        },
        expectedRating: 0.6,
      },
      {
        workOrder: {
          dateDue: '2020-01-10',
          dateCompleted: '2020-01-01',
          priority: 3,
          serviceReportProvided: true,
        },
        expectedRating: 0.3,
      },
    ].forEach(({ workOrder, expectedRating }) =>
      it(`calculateWorkOrderWeighedRating should return ${expectedRating}`, () => {
        const rating = calculateWorkOrderWeighedRating(workOrder);
        expect(rating).toEqual(expectedRating);
      }),
    );
  });

  describe('calculateSupplierRating tests', () => {
    [
      {
        supplier: {
          ...mockSupplier,
          numOfReceivedMessages: 0,
          workOrders: [
            {
              dateDue: '2020-01-10',
              dateCompleted: '2020-01-01',
              priority: 1,
              serviceReportProvided: true,
            },
          ],
        },
        expectedRating: 0.5,
      },
      {
        supplier: {
          ...mockSupplier,
          numOfReceivedMessages: 10,
          numOfSentMessages: 10,
          workOrders: [
            {
              dateDue: '2020-01-10',
              dateCompleted: '2020-01-01',
              priority: 1,
              serviceReportProvided: true,
            },
            {
              dateDue: '2020-01-01',
              dateCompleted: '2020-01-10',
              priority: 1,
              serviceReportProvided: true,
            },
          ],
        },
        expectedRating: 1,
      },
      {
        supplier: {
          ...mockSupplier,
          numOfReceivedMessages: 10,
          numOfSentMessages: 10,
          workOrders: [
            {
              dateDue: '2020-01-10',
              dateCompleted: '2020-01-01',
              priority: 3,
              serviceReportProvided: true,
            },
            {
              dateDue: '2020-01-01',
              dateCompleted: '2020-01-10',
              priority: 2,
              serviceReportProvided: true,
            },
          ],
        },
        expectedRating: 0.65,
      },
    ].forEach(({ supplier, expectedRating }) =>
      it(`calculateSupplierRating should return ${expectedRating}`, () => {
        const rating = calculateSupplierRating(supplier);
        expect(rating).toEqual(expectedRating);
      }),
    );
  });
});
