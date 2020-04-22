import loki from 'lokijs';
import { sampleSuppliers } from './sampleData';
import { config } from '../config';

const supplierTableName = 'suppliers';

const initDb = () => {
  console.log('Connecting to db...');

  let suppliers = db.getCollection(supplierTableName);

  if (suppliers !== null) {
    db.removeCollection(supplierTableName);
  }

  suppliers = db.addCollection(supplierTableName);

  console.log('Seeding suppliers');

  suppliers.insert(sampleSuppliers);

  db.save();

  const results = suppliers.find();

  console.log(results);
};

const db = new loki(config.dbPath, {
  autoload: true,
  autoloadCallback: initDb,
});
