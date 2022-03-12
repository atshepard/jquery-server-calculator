$(readyNow);

function readyNow() {
    //click listeners go here:
    $('.number').on('click', inputNum);

    //initial get request goes here:
    // getCalc();
}

let numA = "";

function getCalc() {
    $.ajax({
        url: '/calc',
        method: 'GET'
      }).then(function (response) {
        //console.log the 'results' array sent from the app.get server side
        console.log(response);
        // render(response);
      }).catch(function (error) {
        console.log(error);
        alert('error in GET');
      })
}

function inputNum(){
  console.log('inputting number: ', $(this).data("val"));
  numA = numA + $(this).data("val");
  $('#input').val(Number(numA));
}

// function postCalc() {
//     $.ajax({
//         url: '/calc',
//         method: 'POST',
//         // data should ALWAYS be a object
//         //this data turns in to the 'req.body' on the server side post
//         data: {
//           numA: numA,
//           operator: operator,
//           numB: numB,
//           result: 0
//         },
  
//       }).then(function (response) {
//         console.log(response);
//         // $('.input').val('');
//       })
// }

// function renderCalc(response) {
// for (const calculation of response) {
  
// }

// }