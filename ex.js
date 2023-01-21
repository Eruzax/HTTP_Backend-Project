const express = require('express');
const app = express();
app.use(express.json());

app.get('/', (req,res)=>{
    res.send('Hello There');
});


const courses = [
    {id:1, name:'Web Development'},
    {id:2, name: 'IT'},
    {id:3, name:'Cybersecurity'},
];

//http GET request route
app.get('/api/courses', (req,res)=>
{
    res.send(courses);

});

//request course by id
app.get('/api/courses/:id', (req,res)=>
{
    const course = courses.find(c=> c.id === parseInt(req.params.id));
    if (!course)
    {
        res.status(404).send("The course with the given ID was not found");
        return
    }
    res.send(course);
});

//http Post Request
app.post('/api/courses', (req, res)=>{

    if (req.body.name.length < 4)
    {
        res.status(400).send("Error: Course name must be at least 3 characters long.");
    }
    else
    {
        const course = {id: courses.length + 1, name: req.body.name}
        courses.push(course);
        res.send(course);
    }
    
});

//http delete request
app.delete('/api/courses/:id', (req,res)=>{
    const course = course.find(c => c.id === parseInt(req.params.id));
    if (!course)
    {
        return res.status(404).send("Error: Course not found.");
    }
    const index = courses.indexOf(course);
    courses.splice(index, 1);
    res.send(course);
});


app.listen(3000, () => {
    console.log('Listening on port 3000 ....');
});