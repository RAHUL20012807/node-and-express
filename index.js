const express = require('express');
const dotenv = require('dotenv');
const sql = require('mssql');


// const port = 3000
dotenv.config();

const app = express();
const port = process.env.PORT||3000;

app.get('/', (req, res) => {
  res.send('Express + TypeScript Server');
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});


const config = {
  user: 'sa',
  password: 'Pa$$w00rd',
  server: '192.168.2.12',
  database: 'testdb',
  options: {
    encrypt: false, // Use encryption
    trustServerCertificate: false, // Trust self-signed certificates
  },
};

async function connectToDatabase() {
  try {
    await sql.connect(config);
    console.log('Connected to MSSQL Database');
  } catch (err) {
    console.error('Error connecting to MSSQL Database', err);
  }
}

app.get('/items', async (req, res) => {
    try {
      const result = await sql.query`SELECT * FROM emoloyees`; // Replace "YourTable" with your table name
      const a = result.recordset
      res.send(a)
    } catch (err) {
      console.error('Error fetching data', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  

  app.put('/items1', async (req, res) => {
    // Add new item to the database
    const request = new sql.Request();
    // request.input('itemName', sql.NVarChar, req.body.itemName);
    request.query("INSERT INTO emoloyees (emp_id,ename,age,address) VALUES (11,'Hari',20,'Vadodra');", (err, result) => {
      if (err) {
        console.error('Error inserting into the database:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        res.status(201).json({ message: 'Item created successfully' });
        res.send(result)
      }
    });
  });
  
//   PUT: Update an existing item by ID
  app.post('/items2', (req, res) => {
    // Update item in the database
    const request = new sql.Request();
    // request.input('id', sql.Int, req.params.id);
    // request.input('newName', sql.NVarChar, req.body.newName);
    request.query("UPDATE emoloyees set ename = 'RAHUL' WHERE emp_id = 6", (err, result) => {
      if (err) {
        console.error('Error updating the database:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        res.json({ message: 'Item updated successfully' });
        res.send(result)
      }
    });
  });



  


connectToDatabase();
