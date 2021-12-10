const express = require('express')
const app = express()
const mysql = require('mysql2')
const cors = require('cors')

const db = mysql.createConnection({
    host: 'localhost', //should be same, or 127.0.0.1
    user: 'root', //might differ depending on your user account settings within myphpadmin under 'User accounts'
    password:'', //might differ depending on your user account settings within myphpadmin under 'User accounts'
    database: 'olympics',
    port: 3307 //your port might differ, check what port your SQL DB is running on from XAMPP
})

app.use(cors())

app.get('/api/athletes', (req, res)=>{
    const sqlSelect = "SELECT * FROM Athlete"
    db.query(sqlSelect, (err, result)=>{
        res.send(result)
    })
})

app.get('/api/athletes/:name', (req, res)=>{
    const name = req.params.name
    const sqlSelect = "SELECT * FROM Athlete WHERE Name = ?"
    db.query(sqlSelect, name, (err, result)=>{
        res.send(result)
    })
})

app.get('/api/coaches', (req, res)=>{
    const sqlSelect = "SELECT * FROM Coaches"
    db.query(sqlSelect, (err, result)=>{
        res.send(result)
    })
})

app.get('/api/coaches/:name', (req, res)=>{
    const name = req.params.name
    const sqlSelect = "SELECT * FROM Coaches WHERE Name = ?"
    db.query(sqlSelect, name, (err, result)=>{
        res.send(result)
    })
})

app.get('/api/countries', (req, res)=>{
    const sqlSelect = 
    "SELECT country, SUM(Total) AS 'medalSum' FROM (SELECT country, (gold + silver + bronze) AS Total FROM team JOIN competesIn ON team.TID = competesIn.TID) AS t GROUP BY country"
    db.query(sqlSelect, (err, result)=>{
        res.send(result)
    })
})

app.get('/api/countries/teams', (req, res)=>{
    const sqlSelect = 
    "SELECT Tname, country FROM team"
    db.query(sqlSelect, (err, result)=>{
        res.send(result)
    })
})

app.get('/api/countries/:countryName', (req, res)=>{
    const Cname = req.params.countryName
    const sqlSelect = 
    "SELECT country, SUM(Total) AS 'medalSum' FROM (SELECT country, (gold + silver + bronze) AS Total FROM team JOIN competesIn ON team.TID = competesIn.TID) AS t WHERE country = ?"
    db.query(sqlSelect, Cname, (err, result)=>{
        res.send(result)
    })
})

app.get('/api/teams', (req, res)=>{
    const sqlSelect = 
    "SELECT Tname, country, gold, silver, bronze FROM team JOIN competesIn ON team.TID = competesIn.TID"
    db.query(sqlSelect, (err, result)=>{
        res.send(result)
    })
})

app.get('/api/teams/:teamName', (req, res)=>{
    const Tname = req.params.teamName
    const sqlSelect = 
    "SELECT Tname, country, gold, silver, bronze FROM team JOIN competesIn ON team.TID = competesIn.TID WHERE Tname = ?"
    db.query(sqlSelect, Tname, (err, result)=>{
        res.send(result)
    })
})

app.get('/api/dates', (req, res)=>{
    const sqlSelect = 
    "SELECT Date.DayNum, Day, Month, YEAR, vName, Ename, time FROM Date JOIN heldOn ON Date.DayNum = heldOn.DayNum JOIN event ON heldOn.EID = event.EID JOIN heldAt ON heldOn.EID = heldAT.EID"
    db.query(sqlSelect, (err, result)=>{
        res.send(result)
    })
})

app.get('/api/dates/:dayNum', (req, res)=>{
    const Dnum = req.params.dayNum
    const sqlSelect = 
    "SELECT Date.DayNum, Day, Month, YEAR, vName, Ename, time FROM Date JOIN heldOn ON Date.DayNum = heldOn.DayNum JOIN event ON heldOn.EID = event.EID JOIN heldAt ON heldOn.EID = heldAT.EID WHERE Date.DayNum = ?"
    db.query(sqlSelect, Dnum, (err, result)=>{
        res.send(result)
    })
})

const portNumber = 3001 //port might differ, look for an unused port on your computer
app.listen(portNumber, () =>{
    console.log("running on port", portNumber)
})