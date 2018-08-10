(function () {
  
  var url = "https://simple-nodejs-email.herokuapp.com/api/sendemail";
// var url = "http://localhost:8080/api/sendemail";

  var sending = false;

  function sendEmail(nameVal, emailVal, messageVal){
    sending = true;
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
        sending = false;
        $('#emailBtn').empty();
        $('#emailBtn').text('Send Email');
        if(response.statusCode)
          if(response.statusCode !== 200) throw response.statusCode 
          else $('.alert-success').show();
        else {
          $('.alert-success').show();
        }
      })
      .catch(error => {
        sending = false;
        $('.alert-danger').show();
        $('.alert-danger').text('Unable to send mail at this time.');
        // console.error('Error:', error);
        $('#emailBtn').empty();
        $('#emailBtn').text('Send Email');
      });
  }

  $('#emailBtn').click(function(event){
    $('.alert-danger').hide();
    $(event.target).empty();
    $(event.target).append("<i class='fa fa-spinner fa-spin'></i>");
    event.preventDefault();
    // console.log('clicked', $('#name').val(), $('#email').val(), $('#message').val());
    if ($('#name').val() === "" || $('#email').val() === "" || $('#message').val() === ""){
      $('#emailBtn').empty();
      $('#emailBtn').text('Send Email');
      $('.alert-danger').show();
      return;
    }
    if (!sending) sendEmail($('#name').val(), $('#email').val(), $('#message').val());
  
      
  });

  $('.close').click( function(event){
    if($(event.target).has('.alert-danger'))
      $('.alert-danger').hide();
    if ($(event.target).has('.alert-success'))
      $('.alert-success').hide();
  });

})();