require('dotenv').config();

const { Client } = require('pg');

const client = new Client({
    user: process.env.user,
    host: process.env.host,
    database: process.env.database,
    password: process.env.password,
    port: process.env.port,
});

client.connect();
console.log("connected succesfully");

function    endconnection(){
    setTimeout(function(){
        client.end();
    }, 1000);
}

function createTable(){
    client.query((`CREATE TABLE IF NOT EXISTS Visitors(
        ID SERIAL,
        Name varchar(50),
        Age int,
        dateOfVisit DATE,
        timeOfVisit TIME,
        assistedBy varchar(50),
        comments varchar(100)
    )`), (err, res) =>{
        if(err){
            throw err;
        }
        console.table(res.rows);
    })
}

createTable();

function    addNewVisitor(fullname, Age, dateOfVisit, timeOfVisit, assistedBy, comments){
    client.query(`INSERT INTO visitors(Name, Age, dateOfVisit, timeOfVisit, assistedBy, comments)
    VALUES($1,$2,$3,$4,$5,$6) RETURNING *;`,[fullname, Age, dateOfVisit, timeOfVisit, assistedBy, comments], 
    (err, res) => {
        if(err){
            throw err;
        }
        console.log(res.rows[0]);
    });
}

// addNewVisitor('kaleem', 22, '2020-09-10', '16:01', 'Harold', 'Services');

function listAllVisitors(){
    client.query(`SELECT Name, ID FROM Visitors;`, (err, res) =>{
        if(err){
            throw err;
        }
        console.table(res.rows);
    })
}

// listAllVisitors();

function    deleteAVisitor(id){
    client.query(`DELETE FROM Visitors WHERE id = $1;`,[id] ,(err, res) => {
        if(err){
            throw err;
        }
        console.log('deleted successfully' + res.rows);
    })
}

// deleteAVisitor('Kim Layne');

function updateVisitor(id, newValue, column){
    client.query(`UPDATE Visitors SET ${column} = $1 WHERE ID = $2`, [newValue, id], (err, res) => {
        if(err){
            throw err;
        }
        console.log('data updated successfully', res.rowCount);
    });
}

// updateVisitor(1, '12:32', 'timeOfVisit');

function    viewVisitor(id){
    client.query(`SELECT * FROM Visitors WHERE ID = $1`, [id], (err, res) => {
        if(err){
            throw err;
        }
        console.table(res.rows);
    });
}

// viewVisitor(1);

function    deleteAllVisitors(){
    client.query(`DELETE FROM Visitors`, (err, res) => {
        if(err){
            throw err;
        }
        console.log('Table cleared successfully', res.rows);
    })
}

// deleteAllVisitors();
// endconnection();
module.exports = { createTable ,client, addNewVisitor, updateVisitor, deleteAVisitor, deleteAllVisitors, viewVisitor, listAllVisitors };