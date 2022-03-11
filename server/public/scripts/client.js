$(readyNow);

function readyNow() {
    //click listeners go here:


    //initial get request goes here:
    getCalc();
}

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


function postCalc() {
    $.ajax({
        url: '/calc',
        method: 'POST',
        // data should ALWAYS be a object
        //this data turns in to the 'req.body' on the server side post
        data: {
          numA: numA,
          operator: operator,
          numB: numB
        },
  
      }).then(function (response) {
        console.log(response);
        // $('.input').val('');
      })
}