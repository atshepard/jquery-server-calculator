$(readyNow);

function readyNow() {
    //click listeners go here:
    $('.number').on('click', inputNum);
    $('.operate').on('click', inputOp);
    $('#submitBtn').on('click', postCalc);
    $('#submitBtn').on('click', getSolution);
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
        renderCalc(response);
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
  let output = $('#input').val();
  let calcToSend = output.split(" ");

  console.log('testing split: ', calcToSend);
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

$('#input').val('');
input = ""

getCalc();
}

//TODO: add calculation.solution when added
function renderCalc(response) {
  $('#historyList').empty();
  for (const calculation of response) {
    $('#historyList').append(`
    <li> ${calculation.numA} ${calculation.operator} ${calculation.numB}</li>
    `)
  }
}

function getSolution() {
  $.ajax({
    url: '/solve',
    method: 'GET'
  }).then(function (response) {
    //console.log the 'results' array sent from the app.get server side
    console.log(response);
    renderSolve(response);
  }).catch(function (error) {
    console.log(error);
    alert('error in GET');
  })
}

function renderSolve(solution) {
  $('#currentCalc').empty();
  // $('#historyList').closest("li").append(` = ${solution.solution}`);
  $('#currentCalc').append(`${solution.solution}`);
}