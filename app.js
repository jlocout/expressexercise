var students = require('./students.json')
var grades = require('./grades.json')

const express = require('express')
const app = express()
const port = 3000

app.get('/', function (req, res) {
    res.send('Hi There')
})

app.get('/student', function (req, res) {
    //returns a list of students
    let search = req.query.search
    console.log(search)
    if(search != undefined){
        res.send(students.students.filter(record => record.name.match(search) ))
    } else{
        res.send(students)
    }
})

app.get('/students/:studentId', function (req, res) {
    //returns details of a specific student by student id

    res.send(students.students.find(record => record.studentId == req.params.studentId))
})

app.get('/grades/:studentId', function (req, res) {
    //returns details of a specific student by student id
    res.send(grades.grades.filter(record => record.studentId == req.params.studentId))
})

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

app.post('/grade', function (req, res) {
    if(req.body.grade != undefined && req.body.studendId != undefined){
        res.status(201).send("Successfully added grade.")
    } else{
        res.status(400).send("Need grade and studentId")
    }
})

app.post('/register', function (req, res) {
    if(req.body.username != undefined && req.body.email != undefined){
        res.status(201).send("Successfully created new user.")
    } else{
        res.status(400).send("Need username and email")
    }
})

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))