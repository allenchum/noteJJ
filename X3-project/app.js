const express = require('express');
const app = express();
const session = require('express-session');
const bodyParser = require('body-parser');
const port = process.env.PORT || 8000;

//passport - facebook strategy
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
require('dotenv').config();

// for knex connection
const knexConfig = require('./knexfile').development;
const knex = require('knex')(knexConfig);

app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());

//passport for facebook-login ---- separate into another .js and module.exports?

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
}

app.use(session({
  secret: 'supersecret'
}));

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_ID,
  clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
  callbackURL: `/auth/facebook/callback`,
  profileFields: ['id', 'displayName', 'name', 'gender', 'profileUrl', 'picture.type(large)']
}, (accessToken, refreshToken, profile, cb) => {
  return cb(null, {
    profile: profile,
    accessToken: accessToken,
  });
}));

// facebook log-in
app.get('/auth/facebook/callback',
  passport.authenticate('facebook', {
    authType: 'reauthenticate',
    scope: ['public_profile', 'user_friends', 'manage_pages'],
    failureRedirect: '/login'
  }),
  (req, res) => {
    console.log(req.user)
    // check if user exist in the users table
    let query = knex
      .select('id')
      .from('users')
      .where('users.facebookID', req.user.profile.id);
    return query.then((rows) => {
        // user already in the table
        console.log(rows.length, "row found");
        if (rows.length === 1) {
          console.log("user exists.", req.user.profile.displayName, req.user.profile.id)
        } else {
          // user not in the table, insert one to the table now
          return knex.insert({
            name: req.user.profile.displayName,
            gender: req.user.profile.gender,
            facebookID: req.user.profile.id,
            created_at: knex.fn.now()
          }).into('users');
          console.log("user inserted to table.");
        }
      })
      .then(() => {
        // re-direct to index page
        res.redirect('/');
        console.log("redirect to index")
        console.log(req.user.profile.photos[0])
      })
  });

// facebook login session logout
app.get('/logout', (req, res) => {
//  req.logout();
  req.session.destroy((err)=>{
    if (err) {
      console.log(err)
    } else {
      res.redirect('/');
    }
  })
});

// serve the login and index page
app.get('/login', (req, res) => {
  res.sendFile(__dirname + '/views/login.html');
});

app.get('/', isLoggedIn, (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

// serving static files in folder "views"
app.use(express.static(__dirname + "/views"));

// get input from drawing insert as a form of object
app.post('/', (req, res) => {
  // each time to insert node to nodes table
  return knex.insert({
      category: req.body.category,
      imagePath: req.body.imgPath,
      image_x1: req.body.x1,
      image_y1: req.body.y1,
      created_at: knex.fn.now(),
      user_id: req.body.userID,
    }).into('notes')
    .then(() => {
      res.sendFile(__dirname + '/views/success.html');
      console.log("drawing object inserted to table.");
    })
})

//express port 8000s
app.listen(port, () => {
  console.log("listening to port", port);
  console.log(knexConfig);
})
