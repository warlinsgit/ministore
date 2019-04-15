$(document).ready(function(){

  $("#btnSubmit").click(function() {
	  $(".error").remove();
		var name = $("#name").val();
		var email = $("#email").val();
		var address = $("#address").val();
		var zipCodePattern = /^\d{6}$/ ;
		//var password = $("#password").val();
		var emailReg = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}/igm;
        var strongPassword = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
        var mediumPassword = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})");
		var emailblockReg =  /^([\w-\.]+@(?!gmail.com)(?!yahoo.com)(?!hotmail.com)([\w-]+\.)+[\w-]{2,4})?$/;
		var emailIndex = email.indexOf("@");
		var emailBlock = email.substr(emailIndex);
		if (name == ""){
			  $("#name").after('<span class="error">Please enter your name.</span>');
		}
		if(email == ""){
			 $("#email").after('<span class="error">Please enter your Email ID</span>');

		}
		if(email != "" && !emailReg.test(email)){
			 $("#email").after('<span class="error">Please Enter a Valid Email ID</span>');

		}
		if(email != "" && !emailReg.test(email) && emailBlock == "@gmail.com" || emailBlock == "@yahoo.com" || emailBlock == "@hotmail.com"){
			 $("#email").after('<span class="error">No yahoo, gmail or hotmail emails.</span>');

		}
		if(address == ""){
			 $("#zipCode").after('<span class="error">Please enter your Zip code</span>');
			
		}
	    if(zipCode != "" && !zipCodePattern.test(zipCode)){
			 $("#zipCode").after('<span class="error">Please enter a 6 digit Valid Zip Code</span>');

		}
		if(password == ""){
			 $("#password").after('<span class="error">Please enter a Password</span>');

		}
		if(password != "" && !strongPassword.test(password)){
			 $("#password").after('<span class="error">Please enter a Valid Password  Use a number Uppercase</span>');

		}


  });

});
