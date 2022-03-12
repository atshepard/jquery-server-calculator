//server requirements:
const express = require('express');
const bodyParser = require('body-parser');

//server structure:
const app = express();
const PORT = 5000;

//module imports:
//can access functions by using .functionName(params)
//accessible with addition.add(numA, numB)
let addition = require('./modules/addition.js');
//accessible with division.div(numA, numB)
let division = require('./modules/division.js');
//accessible with multiplication.mul(numA, numB)
let multiplication = require('./modules/multiplication.js');
//accessible with subtraction.sub(numA, numB)
let subtraction = require('./modules/subtraction.js');

let calculations = require('./modules/calculations.js');

let solution;

//serve static files:
app.use(express.static('server/public'));
app.use(bodyParser.urlencoded({extended: true}));

function solveIt(object) {
    if(object.operator == '+'){
        solution = addition.add(object.numA, object.numB);
        object.solution = solution;
    } else if(object.operator == '-'){
        solution = subtraction.sub(object.numA, object.numB);
        object.solution = solution;
    } else if(object.operator == '/'){
        solution = division.div(object.numA, object.numB);
        object.solution = solution;
    } else if(object.operator == '*'){
        solution = multiplication.mul(object.numA, object.numB);
        object.solution = solution;
    }
return solution;
}


//GET & POSTs here: 
app.get('/calc', function(req, res) {
    console.log('GET calculations!');
    res.send(calculations);
});

app.post('/calc', (req, res) => {
    console.log('POST result', req.body);
    calculations.push(req.body);
    //200 OK
    //201 CREATED
    res.sendStatus(201);
});

app.get('/solve', function(req, res) {
    console.log('GET solution!');
    solveIt(calculations[calculations.length-1]);
    res.send(calculations[calculations.length-1]);
});

app.listen(PORT, function(){
console.log('server running on PORT', PORT);
});