$(readyNow);

function readyNow() {
    //click listeners go here:
    $('.number').on('click', inputNum);
    $('.operate').on('click', inputOp);
    $('.secret').on('click', secret);
    $('#submitBtn').on('click', postCalc);
    $('#submitBtn').on('click', getSolution);
    $('#clearBtn').on('click', clearInput);
    $('#historyList').on('click', '.list', handleListClick);
    $('#deleteHistBtn').on('click', serverDelete);
    //initial get request goes here:
getCalc();
}
//declaration of input to hold string for splitting:
let input = "";

//inputs number to input field based on button clicked:
function inputNum(){
  console.log('inputting number: ', $(this).data("val"));
  input = input + $(this).data("val");
  $('#input').val(input);
}
//inputs operator to input field based on button clicked:
function inputOp(){
  console.log('inputting operator: ', $(this).data("op"));
  input = `${input} ${$(this).data("op")} ` ;
  $('#input').val(input); 
}
//handshake for get to retrieve calculations array
function getCalc() {
  //hey ajax go get the calculations array
    $.ajax({
        url: '/calc',
        method: 'GET'
      }).then(function (response) {
        //console.log the 'results' array sent from the app.get server side
        console.log(response);
        //when you have it, if it is greater than zero
        //go get the solutions and display them also
        if(response.length > 0){
          getSolution();
        }
      }).catch(function (error) {
        console.log(error);
        alert('error in GET');
      })
}
//handshake for posting to calculations array
function postCalc() {
  // let output = input;
  let calcToSend = input.split(" ");

  console.log('testing split: ', calcToSend);

    if(calcToSend.length === 3){
    //hey ajax, go post:
    $.ajax({
        url: '/calc',
        method: 'POST',
        // data should ALWAYS be a object
        //this data turns in to the 'req.body' on the server side post
        data: {
          numA: calcToSend[0],
          operator: calcToSend[1],
          numB: calcToSend[2],
        }
      }).then(function (response) {
        console.log(response);
      })
    } else {
      alert('You must have a number, an operator, and another number for this calculator');
    }
$('#input').val('');
input = ""

getCalc();
}
//handshake for retrieving calculations array with solutions
function getSolution() {
  $.ajax({
    url: '/solve',
    method: 'GET'
  }).then(function (response) {
    //console.log the 'results' array sent from the app.get server side
    // console.log(response);
    renderCalc(response);
    renderSolve(response);
  }).catch(function (error) {
    console.log(error);
    alert('error in GET');
  })
}
//renders the calculations to the DOM as a list
function renderCalc(response) {
  $('#historyList').empty();
  for (const calculation of response) {
    $('#historyList').append(`
    <li class="list" data-eq="${calculation.numA} ${calculation.operator} ${calculation.numB}"> 
    ${calculation.numA} ${calculation.operator} ${calculation.numB} = ${calculation.solution}</li>
    `)
  }
}
//renders current solution to the DOM
function renderSolve(array) {
  $('#currentCalc').empty();
  let solve = array[array.length-1].solution;
  // $('#historyList').closest("li").append(` = ${solution.solution}`);
  $('#currentCalc').append(`${solve}`);
}
//adds the equation for list items clicked on to the input field
function handleListClick(){
  input = String($(this).data("eq"));
  $('#input').val(input);
//  
}
//clears user input
function clearInput(){
  input = "";
  $('#input').val('');
}
//sends ajax on delete mission
function serverDelete() {
  $.ajax({
    url: '/calc',
    method: 'DELETE',
  }).then(function(response){
    console.log(response);
  }).catch(function (error) {
    console.log(error);
    alert('error in DELETE');
  });

  $.ajax({
    url: '/solve',
    method: 'DELETE'
  }).then(function(response){
    console.log(response);
  }).catch(function (error) {
    console.log(error);
    alert('error in DELETE');
  });

  clearDOM(); //dom would also clear on browser refresh but insurance
  getCalc();
}
//clears DOM 
function clearDOM() {
  $('#historyList').empty();
  $('#currentCalc').empty();
}
//secret
function secret(){
  console.log('keep it secret');
  console.log('keep it safe');
}