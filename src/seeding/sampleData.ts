import moment from 'moment';
import { v4 as uuid } from 'uuid';

import { Supplier, Service, WorkOrder } from '../types/Supplier';

export const sampleSuppliers: Supplier[] = [];

const allServices: Service[] = [
  'electrical',
  'plumbing',
  'carpentry',
  'handyman',
  'gardening',
  'locksmith',
  'painting',
  'blacksmith',
  'lawnmowing',
  'brickworks',
];

const sampleNames = [
  'James',
  'John',
  'Robert',
  'Michael',
  'William',
  'David',
  'Richard',
  'Joseph',
  'Thomas',
  'Charles',
  'Christop',
  'Daniel',
  'Matthew',
  'Anthony',
  'Donald',
  'Mark',
  'Paul',
  'Steven',
  'Andrew',
  'Kenneth',
  'Joshua',
  'George',
  'Kevin',
  'Brian',
  'Edward',
  'Ronald',
  'Timothy',
  'Jason',
  'Jeffrey',
  'Ryan',
  'Jacob',
  'Gary',
  'Nicholas',
  'Eric',
  'Stephen',
  'Jonathan',
  'Larry',
  'Justin',
  'Scott',
  'Brandon',
  'Frank',
  'Benjamin',
  'Gregory',
  'Samuel',
  'Raymond',
  'Patrick',
  'Alexande',
  'Jack',
  'Dennis',
  'Jerry',
  'Tyler',
  'Aaron',
  'Jose',
  'Henry',
  'Douglas',
  'Adam',
  'Peter',
  'Nathan',
  'Zachary',
  'Walter',
  'Kyle',
  'Harold',
  'Carl',
  'Jeremy',
  'Keith',
  'Roger',
  'Gerald',
  'Ethan',
  'Arthur',
  'Terry',
  'Christian',
  'Sean',
  'Lawrence',
  'Austin',
  'Joe',
  'Noah',
  'Jesse',
  'Albert',
  'Bryan',
  'Billy',
  'Bruce',
  'Willie',
  'Jordan',
  'Dylan',
  'Alan',
  'Ralph',
  'Gabriele',
  'Roy',
  'Juan',
  'Wayne',
  'Eugene',
  'Logan',
  'Randy',
  'Louis',
  'Russell',
  'Vincent',
  'Philip',
  'Bobby',
  'Johnny',
  'Bradley',
];

const getRandomInt = (lower: number, upper: number) =>
  Math.round(Math.random() * (upper - lower) + lower);

const getRandomService = (): Service => allServices[getRandomInt(0, 9)];
const getRandomServices = (): Service[] => {
  const services: Service[] = [];
  for (let i = 0; i < getRandomInt(0, allServices.length); i++) {
    services.push(getRandomService());
  }
  return services;
};

const getRandomWorkOrder = (): WorkOrder => ({
  dateDue: '2020-01-01',
  dateCompleted: moment('2020-01-01')
    .add(getRandomInt(-10, 10), 'day')
    .format('YYYY-MM-DD'),
  priority: getRandomInt(1, 3),
  serviceReportProvided: [false, true][getRandomInt(0, 1)],
});

const getRandomWorkOrders = (): WorkOrder[] => {
  const workOrders: WorkOrder[] = [];
  for (let i = 0; i < getRandomInt(0, 10); i++) {
    workOrders.push(getRandomWorkOrder());
  }
  return workOrders;
};

for (let i = 0; i < 100; i++) {
  const numOfReceivedMessages = getRandomInt(1, 100);
  sampleSuppliers.push({
    id: uuid(),
    name: sampleNames[i % sampleNames.length],
    number: `040${getRandomInt(0, 10000000)}`,
    services: getRandomServices(),
    workOrders: getRandomWorkOrders(),
    numOfReceivedMessages,
    numOfSentMessages: getRandomInt(1, numOfReceivedMessages),
  });
}
