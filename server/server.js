//server requirements:
const express = require('express');
const bodyParser = require('body-parser');
//server structure:
const app = express();
const PORT = 5000;
//module imports:
let addition = require('./modules/addition.js');
let division = require('./modules/division.js');
let multiplication = require('./modules/multiplication.js');
let subtraction = require('./modules/subtraction.js');

let calculations = require('./modules/calculations.js');

//serve static files:
app.use(express.static('server/public'));
app.use(bodyParser.urlencoded({extended: true}));


//GET & POSTs here: 

// app.get('/url', function(req, res) {
//     console.log('GET !');
//     res.send(calculation);
// });

// app.post('/url', (req, res) => {
//     console.log('POST result', req.body);
//     //200 OK
//     //201 CREATED
//     res.sendStatus(201);
// });


//
app.listen(PORT, function(){
console.log('server running on PORT', PORT);
});