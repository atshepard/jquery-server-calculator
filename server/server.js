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

//serve static files:
app.use(express.static('server/public'));
app.use(bodyParser.urlencoded({extended: true}));


//GET & POSTs here: 

app.get('/calc', function(req, res) {
    console.log('GET calculations!');
    res.send(calculations);
});

// app.post('/calc', (req, res) => {
//     console.log('POST result', req.body);
//     calculations.push(req.body);
//     //200 OK
//     //201 CREATED
//     res.sendStatus(201);
// });

app.listen(PORT, function(){
console.log('server running on PORT', PORT);
});