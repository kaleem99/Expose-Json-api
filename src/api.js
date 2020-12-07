const express = require('express')
const app = express()
require('dotenv').config();
const port = 3000

const {client, createTable, addNewVisitor, viewVisitor, updateVisitor, deleteAVisitor, deleteAllVisitors, listAllVisitors} = require("../src/app");

// const { Client } = require("pg");
// client.connect();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post('/addNewVisitor', function(req, res) {
  createTable();
  const {fullname, Age, dateOfVisit, timeOfVisit, assistedBy, comments} = req.body;
    client.query(`INSERT INTO visitors(Name, Age, dateOfVisit, timeOfVisit, assistedBy, comments)
    VALUES($1,$2,$3,$4,$5,$6) RETURNING *;`,[fullname, Age, dateOfVisit, timeOfVisit, assistedBy, comments], 
    (err, result) => {
        if(err){
            throw err;
        }
        res.json(result.rows);
        console.table(result.rows);
    });
});

app.delete('/deleteVisitor:id', function(req, res) {
  var id = req.params.id;
  client.query(`DELETE FROM Visitors WHERE id = $1;`,[id] ,(err, result) => {
  if(err){
      throw err;
  }
  console.log('deleted successfully' + result.rows);
  res.json(result.rows)
  })
})

app.delete('/deleteAllVisitors', function(req, res) {
  client.query('DELETE FROM Visitors', (err, result) => {
    if(err){
      throw err;
    }
    console.log('data deleted');
    res.json(result.rows);
  })
})

app.get('/viewVisitors', (req, res) => {
  client.query(`SELECT Name, ID FROM Visitors;`, (err, result) =>{
    if(err){
      throw err;
    }
    console.table(result.rows);
    res.json(result.rows);
    })
})

app.get('/viewVisitor:id', (req, res) => {
  var id = req.params.id;
  client.query(`SELECT * FROM Visitors WHERE id = ${id};`, (err, result) =>{
    if(err){
      throw err;
    }
    console.table(result.rows);
    res.json(result.rows);
    })
})

app.put('/updateVisitor:id', (req, res) => {
  const {newValue, column} = req.body;
  var id = req.params.id;
  client.query(`UPDATE Visitors SET ${column} = $1 WHERE ID = $2`, [newValue, id], (err, result) => {
    if(err){
        throw err;
    }
    console.log(result.rowCount);
    res.json(result.rows);
  });
})

let server = app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});

module.exports = {server, express, app};
