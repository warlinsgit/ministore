var stripe = Stripe('');

var $form = $('#checkout-form');

$form.submit(function(event){
  $('#charge-error').addClass('hidden');
  $form.find('button').prop('disabled', true);
  Stripe.card.createToken({
    number: $('#card-number').val(),
    cvc: $('#card-cvc').val(),
    exp_month: $('#card-expiry-month').val(),
    exp_year: $('#card-expiry-year').val(),
    name: $('#card-name').val()

  }, stripeResponseHandler);
  return false;
});
function stripeResponseHandler(status, response){
  if(response.error){
    //show the errors on the form
    $('#charge-error').text(response.error.message);
      $('#charge-error').removeClass('hidden');
    $('button').prop('disabled', false); //re-enable submission


  }else{
    var token = response.id;

    $form.append($('<input type="hidden"  name="stripeToken" />').val(token));

    $form.get(0).submit();
  }
}

/*
// Create a token or display an error when the form is submitted.
var form = document.getElementById('checkout-form');
form.addEventListener('submit', function(event) {
  event.preventDefault();

  stripe.createToken(card).then(function(result) {
    if (result.error) {
      // Inform the customer that there was an error.
      var errorElement = document.getElementById('card-errors');
      errorElement.textContent = result.error.message;
    } else {
      // Send the token to your server.
      stripeTokenHandler(result.token);
    }
  });
});
*/
