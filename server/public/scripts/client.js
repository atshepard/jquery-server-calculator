$(readyNow);

function readyNow() {
    //click listeners go here:
    $('.number').on('click', inputNum);
    $('.operate').on('click', inputOp);
    $('#submitBtn').on('click', postCalc);
    $('#submitBtn').on('click', getSolution);
    $('#clearBtn').on('click', clearInput);
    $('#historyList').on('click', '.list', handleListClick);
    //initial get request goes here:
getCalc();
}

let input = "";

function getCalc() {
    $.ajax({
        url: '/calc',
        method: 'GET'
      }).then(function (response) {
        //console.log the 'results' array sent from the app.get server side
        console.log(response);
        
        if(response.length > 0){
          getSolution();
        }
        // renderCalc(response);
      }).catch(function (error) {
        console.log(error);
        alert('error in GET');
      })
}

function inputNum(){
  console.log('inputting number: ', $(this).data("val"));
  input = input + $(this).data("val");
  $('#input').val(input);
}

function inputOp(){
  console.log('inputting operator: ', $(this).data("op"));
  input = `${input} ${$(this).data("op")} ` ;
  $('#input').val(input); 
}

function postCalc() {
  let output = input;
  let calcToSend = output.split(" ");

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

//TODO: add calculation.solution when added
function getSolution() {
  $.ajax({
    url: '/solve',
    method: 'GET'
  }).then(function (response) {
    //console.log the 'results' array sent from the app.get server side
    console.log(response);
    renderCalc(response);
    renderSolve(response);
  }).catch(function (error) {
    console.log(error);
    alert('error in GET');
  })
}

function renderCalc(response) {
  $('#historyList').empty();
  for (const calculation of response) {
    $('#historyList').append(`
    <li class="list" data-eq="${calculation.numA} ${calculation.operator} ${calculation.numB}"> 
    ${calculation.numA} ${calculation.operator} ${calculation.numB} = ${calculation.solution}</li>
    `)
  }
}

function renderSolve(array) {
  $('#currentCalc').empty();
  let solve = array[array.length-1].solution;
  // $('#historyList').closest("li").append(` = ${solution.solution}`);
  $('#currentCalc').append(`${solve}`);
}

function handleListClick(){
  input = String($(this).data("eq"));
  $('#input').val(input);
//  
}

function clearInput(){
  input = "";
  $('#input').val('');
}