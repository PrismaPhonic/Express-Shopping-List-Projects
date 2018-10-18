const { write } = require('./writetofile');

let seedJSON = JSON.stringify([
  {
    id: 1,
    product: 'orange',
    price: '$5'
  },
  {
    id: 2,
    product: 'milk',
    price: '$1000'
  },
  {
    id: 3,
    product: 'sheep',
    price: '$2'
  },
  {
    id: 4,
    product: 'chainsaw',
    price: '$0.50'
  },
  {
    id: 5,
    product: 'juan',
    price: '$0.25'
  },
]);

write(seedJSON, 'items.json')