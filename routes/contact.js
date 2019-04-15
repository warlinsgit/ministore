var express=require('express');
var router=express.Router();
var nodemailer=require('nodemailer');

  router.get('/', (req, res)=> {
  res.render('info/contact', {
    title: 'Contact'
    }
  );
}

);
router.post('/send', function(req, res, next) {
  var successMsg1=req.flash('success')[0];
  // Get Errors
  var transporter=nodemailer.createTransport( {
    service: 'gmail', auth: {
      user: '', pass: ''
    }
  }
);
    var mailOptions= {
      from: '"Warlins Oliver ?" <warlins25@gmail.com>', to: 'matutinolife@gmail.com', subject: req.body.subject, text: 'You jave a submission from... Name: '+req.body.name+' Email:  '+req.body.email+' Subject:  '+req.body.subject+'  Message: '+req.body.message, html: '<p>You have a submission from...</p> <ul<li>Name: '+req.body.name+' </li><li>Email:  '+req.body.email+' <li> Subject: '+req.body.subject+' </li> <li> Message: '+req.body.message+' </li></ul>'
  }

    transporter.sendMail(mailOptions, function(error, info) {
      if(error) {
        return console.log(error);
      }
      console.log('Message sent:  '+ info.response);
      req.flash('success', 'Message Sent! Thank you for getting in touch!');
      res.redirect('/');
    }
  );
}

);
module.exports=router;
