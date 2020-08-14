//Basic REST API with CRUD operations in Single file
//Only dependency required here is Express JS
//dotenv is optional

//Import dependency modules
/* *********************************************** */
const express = require('express')
const app = express()
require('dotenv').config({ path: '.env' })

app.use(express.json())
/* *********************************************** */

//List of courses
/* *********************************************** */
const courses = [
    { id: 1, name: 'AWS Certified Solutions Architect - Associate 2020', price: 399 },
    { id: 2, name: 'Learn Ethical Hacking From Scratch', price: 299 },
    { id: 3, name: 'Learn Advanced C++ Programming', price: 299 },
    { id: 4, name: 'Learn and Understand AngularJS', price: 499 },
    { id: 5, name: 'Modern React With Redux', price: 499 }
]
/* *********************************************** */

//Root of the API
/* *********************************************** */
app.get('/', (req, res) => {
    res.send('Hello World')
});
/* *********************************************** */

// 1.Read Operations
/* *********************************************** */
app.get('/api/courses', (req, res) => {
    res.send(courses)
})
app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(e => e.id === parseInt(req.params.id))

    if (!course) res.status(404).send('No course found')
    res.send(course)
})
/* *********************************************** */

// 2.Create Operation
/* *********************************************** */
app.post('/api/courses', (req, res) => {
    const course = {
        id: courses.length + 1,
        name: req.body.name,
        price: req.body.price
    }
    courses.push(course)
    res.send(course)
})
/* *********************************************** */

/* *********************************************** */
// 3.Update Operation
app.put('/api/courses/:id', (req, res) => {
    const course = courses.find(e => e.id === parseInt(req.params.id))

    if (!course) res.status(404).send('No course found')

    course.name = req.body.name
    course.price = req.body.price
    res.send(course)
})
/* *********************************************** */

// 4.Delete Operation
app.delete('/api/courses/:id', (req, res) => {
    const course = courses.find(e => e.id === parseInt(req.params.id))

    if (!course) res.status(404).send('No course found')

    const index = courses.indexOf(course)
    courses.splice(index, 1)
    res.send(`'${course.name}' is deleted successfully`)
})

//Port
/* *********************************************** */
const port = process.env.PORT || 5000
/* *********************************************** */

//Server spinup
/* *********************************************** */
app.listen(port, () => console.log(`Listening on port ${port}..`))
/* *********************************************** */

