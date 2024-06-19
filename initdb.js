const sql = require('better-sqlite3')
const db = sql('furnitureshop.db');

const dummyClients = [
   {
      name: 'Pedro',
      lastname: 'Pérez',
      document: '12345678A',
      birthdate: '1990-01-01'
   },
   {
      name: 'Fran',
      lastname: 'Martínez',
      document: '12345678A',
      birthdate: '1991-01-01'
   },
   {
      name: 'Pablo',
      lastname: 'Picapiedra',
      document: '12345678A',
      birthdate: '1995-01-01'
   }
]

const dummyProducts = [
   {
      description: 'A pine wardrobe',
      price: 250
   },
   {
      description: 'A pine bed',
      price: 150
   },
   {
      description: 'A mohagany wardrobe',
      price: 550
   },
   {
      description: 'A mohagany bed',
      price: 450
   },
]

db.prepare(`
   CREATE TABLE IF NOT EXISTS client (
       id INTEGER PRIMARY KEY AUTOINCREMENT,
       name TEXT NOT NULL,
       lastname TEXT NOT NULL,
       document TEXT NOT NULL,
       birthdate DATE NOT NULL
   )
`).run();

db.prepare(`
   CREATE TABLE IF NOT EXISTS product (
       id INTEGER PRIMARY KEY AUTOINCREMENT,
       description TEXT NOT NULL,
       price INTEGER NOT NULL
   )
`).run();

db.prepare(`
   CREATE TABLE IF NOT EXISTS estimate (
       id INTEGER PRIMARY KEY AUTOINCREMENT,
       creationDate DATE NOT NULL,
       updateDate DATE
   )
`).run();

db.prepare(`
   CREATE TABLE IF NOT EXISTS user (
       id INTEGER PRIMARY KEY AUTOINCREMENT,
       name TEXT NOT NULL,
       lastName TEXT NOT NULL,
       password TEXT NOT NULL
   )
`).run();

db.prepare(`
   CREATE TABLE IF NOT EXISTS product_estimate (
       id_product INTEGER NOT NULL,
       id_estimate INTEGER NOT NULL,
       quantity INTEGER NOT NULL,
       PRIMARY KEY (id_product, id_estimate),
       FOREIGN KEY (id_product) REFERENCES products(id),
       FOREIGN KEY (id_estimate) REFERENCES estimates(id)
   )
`).run();

db.prepare(`
   CREATE TABLE IF NOT EXISTS client_estimate (
       id_client INTEGER NOT NULL,
       id_estimate INTEGER NOT NULL,
       PRIMARY KEY (id_client, id_estimate),
       FOREIGN KEY (id_client) REFERENCES clients(id),
       FOREIGN KEY (id_estimate) REFERENCES estimates(id)
   )
`).run();


async function initData() {
  const clientInsert = db.prepare(`
      INSERT INTO client 
      ( name, lastname, document, birthdate )
       VALUES (
         @name,
         @lastname,
         @document,
         @birthdate
      )
   `);

   const productInsert = db.prepare(`
      INSERT INTO product 
      ( description, price) VALUES (
         @description,
         @price
      )
   `);

  for (const client of dummyClients) {
    clientInsert.run(client);
  }

  for (const product of dummyProducts) {
   productInsert.run(product);
 }
}

initData();

// CLIENT
// id, name, lastname, document, birthdate

// PRODUCT
// id, description, price

// ESTIMATE
// id, creationDate, updateDate

// USER
// id, name, lastName, password

// PRODUCT_ESTIMATE
// id_product, id_estimate, quantity

// CLIENT_ESTIMATE
// id_client, id_estimate
