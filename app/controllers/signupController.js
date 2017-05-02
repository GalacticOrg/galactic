var bcrypt = require('bcrypt'),
    User = require('../model/user.js'),
    passport = require('passport'),
    assets = require('../../utils/assets');

module.exports.show = function (req, res) {
  res.render('signup');
};

module.exports.login  = function (req, res) {
 res.render('login');
};

module.exports.signup = function (req, res) {
  var username = req.body.username;
  var password = req.body.password;
  var email = req.body.email;

  if (!username || !password || !email) {
    req.flash('error', 'Please, fill in all the fields.');
    return res.redirect('signup');
  }

  var salt = bcrypt.genSaltSync(10);
  var hashedPassword = bcrypt.hashSync(password, salt);

  var newUser = {
    username: username,
    salt: salt,
    email: email,
    password: hashedPassword
  };

  User.create(newUser).then(function (user){
    req.logIn(user, err => {
      if (err) req.flash('info', 'Sorry! We are not able to log you in!');
      return res.redirect('/login');
    });
  }).catch(function (error) {
    req.flash('error', 'Please, choose a different username.');
    res.redirect('/signup');
  });
};

module.exports.authenticate = passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
});

/**
 * Update
 */
module.exports.updateImage = function (req, res) {

  const images = req.files[0]
    ? [req.files[0].path]
    : [];
    console.log(images);
    res.send('yayay');
    assets.upload;

};
