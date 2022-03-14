//server requirements:
const express = require('express');
const bodyParser = require('body-parser');

//server structure:
const app = express();
const PORT = process.env.PORT || 5000;

//module imports:
//accessible with addition.add(numA, numB)
let addition = require('./modules/addition.js');
//accessible with division.div(numA, numB)
let division = require('./modules/division.js');
//accessible with multiplication.mul(numA, numB)
let multiplication = require('./modules/multiplication.js');
//accessible with subtraction.sub(numA, numB)
let subtraction = require('./modules/subtraction.js');
//array of objects with equations and solutions:
let calculations = require('./modules/calculations.js');
//declaration of solution:
let solution;

//serve static files:
app.use(express.static('server/public'));
app.use(bodyParser.urlencoded({
    extended: true
}));

//takes an object and applies a math function (stored in modules)
//based on the operator inside the object:
function solveIt(object) {
    if (object.operator == '+') {
        solution = addition.add(object.numA, object.numB);
        object.solution = solution;
    } else if (object.operator == '-') {
        solution = subtraction.sub(object.numA, object.numB);
        object.solution = solution;
    } else if (object.operator == '/') {
        solution = division.div(object.numA, object.numB);
        object.solution = solution;
    } else if (object.operator == '*') {
        solution = multiplication.mul(object.numA, object.numB);
        object.solution = solution;
    }
    return solution;
}

//GET & POSTs here: 
//handshake for get to retrieve the current calculations array
app.get('/calc', function (req, res) {
    console.log('GET calculations!');
    res.send(calculations);
});
//handshake for post to push to calculations array
app.post('/calc', (req, res) => {
    console.log('POST result', req.body);
    calculations.push(req.body);
    //200 OK
    //201 CREATED
    res.sendStatus(200);
});
//handshake for get to retrieve calculations array with solution property:
app.get('/solve', function (req, res) {
    console.log('GET solution!');
    solveIt(calculations[calculations.length - 1]);
    res.send(calculations);
});
//handshake for delete route:
app.delete('/calc', (req, res) => {
    console.log('Delete called at /calc route');

    calculations.length = 0;

    res.send('DELETED');
});

app.delete('/solve', (req, res) => {
    console.log('Delete called at /solve route');

    solution = undefined;

    res.send('DELETED');
});

//listen
app.listen(PORT, function () {
    console.log('server running on PORT', PORT);
});