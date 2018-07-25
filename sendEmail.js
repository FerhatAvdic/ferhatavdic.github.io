var url = "https://simple-nodejs-email.herokuapp.com/api/sendemail";
// var url = "http://localhost:8080/api/sendemail";

function sendEmail(nameVal, emailVal, messageVal){
  var data = {
    subject: nameVal + ' reached out to you',
    email: emailVal,
    text: messageVal
  };
  return fetch(url, {
      method: 'POST', 
    body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
  }).then(res => res.json())
    .then(response => {
      if(response.statusCode)
        if(response.statusCode !== 200) throw response.statusCode 
        else $('.alert-success').show();
      else {
        $('.alert-success').show();
      }
    })
    .catch(error => console.error('Error:', error));
}

$('#emailBtn').click(function(event){
  $('.alert-danger').hide();
  event.preventDefault();
  // console.log('clicked', $('#name').val(), $('#email').val(), $('#message').val());
  if ($('#name').val() === "" || $('#email').val() === "" || $('#message').val() === ""){
    $('.alert-danger').show();
    return;
  }
  sendEmail($('#name').val(), $('#email').val(), $('#message').val());
    
});

$('.close').click( function(event){
  if($(event.target).has('.alert-danger'))
    $('.alert-danger').hide();
  if ($(event.target).has('.alert-success'))
    $('.alert-success').hide();
});