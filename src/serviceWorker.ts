import loki from 'lokijs';

import { updateSuppliersRating } from './services/supplierServices';
import { config } from './config';

export const ratingServiceWorker = function refreshSuppliersRating(db: loki) {
  updateSuppliersRating(db);
  setTimeout(refreshSuppliersRating, config.ratingInterval);
};
