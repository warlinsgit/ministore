exports.isUser = function(req, res, next){
  if(req.isAuthenticated()){
    next();

  }else{
    req.flash('danger', 'Please sign in');
    res.redirect('/user/signin');
  }
}

exports.isAdmin = function(req, res, next){
  if(req.isAuthenticated && res.locals.user.admin == 1){
    next();

  }else{
    req.flash('danger', 'Please sign in as admin');
    res.redirect('/user/signin');
  }
}

//https://www.youtube.com/watch?v=sbiXYoKBCrM&list=PLQVFMtitqcm80_a5_jVrw5oFpoSMdtW2o&index=52
