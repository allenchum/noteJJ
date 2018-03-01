const express = require('express');
const app = express();
const hb = require('express-handlebars');
const session = require('express-session');
const bodyParser = require('body-parser');
const multer = require('multer'); //multer

const path = require('path')
const fileUpload = require('express-fileupload');
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

// handlebars
app.engine('handlebars', hb({
  defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

//passport for facebook-login ---- separate into another .js and module.exports?
// check if user is logged in.
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

// facebook strategy
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

// facebook social log-in
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
            firstName: req.user.profile.name.givenName,
            profilePicLink: req.user.profile.photos[0].value,
            gender: req.user.profile.gender,
            facebookID: req.user.profile.id,
            created_at: knex.fn.now()
          }).into('users');
          console.log("user inserted to table.", userNotes);
        }
      })
      .then(() => {
        // re-direct to index page
        res.redirect('/');
        console.log("redirect to index")
      })
  });

// facebook login session logout
app.get('/logout', (req, res) => {
  //  req.logout();
  req.session.destroy((err) => {
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

// when logged in, render create note and profile content
app.get('/', isLoggedIn, (req, res) => {
  res.render(__dirname + '/views/partial/create-form', {
    username: req.user.profile.displayName,
    profileLink: req.user.profile.photos[0].value,
    firstName: req.user.profile.name.givenName,
  });
});

function getUserNotes(userID) {
  let query = knex.select("title", "imagePath").from("notes")
    .innerJoin("users", "user_id", "users.id")
    .where("facebookID", userID);
  query.then((rows) => {
    return rows;
  });
}
app.get('/displayNotes', isLoggedIn, (req, res) => {
      let query = knex.select("title", "imagePath").from("notes")
        .innerJoin("users", "user_id", "users.id")
        .where("facebookID", req.user.profile.id);
      query.then((rows) => {
        res.render(__dirname + '/views/partial/display-notes', {
          notesDisplay: rows,
        });
        console.log(rows)
      });
})


      // post request for creating new note
      app.post('/create-new', isLoggedIn, (req, res) => {
        upload(req, res, (err) => {
          console.log(req.file)
          if (err) {
            console.log(err)
          } else {
            return knex.insert({
                title: req.body.title,
                imagePath: req.file.filename,
                image_x1: 100,
                image_y1: 100,
                created_at: knex.fn.now(),
                user_id: 4
              }).into('notes')
              .then(() => {
                res.render(__dirname + '/views/partial/edit-page', {
                  title: req.body.title,
                  picPath: req.file.path,
                  canvas_width: req.body.width,
                  canvas_height: req.body.height
                });
                console.log("notes inserted")
              })
          }
        })
      });

      // set storage engine
      const storage = multer.diskStorage({
        destination: __dirname + '/views/uploads',
        filename: function(req, file, cb) {
          cb(null, file.fieldname + '-' + Date.now() +
            path.extname(file.originalname))
        }
      })

      const upload = multer({
        storage: storage,
        limits: {
          fileSize: 1000000
        },
        fileFilter: function(req, file, cb) {
          checkFileType(file, cb);
        }
      }).single('imageUpload')

      function checkFileType(file, cb) {
        const filetypes = /jpeg|jpg|png|gif/;
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = filetypes.test(file.mimetype);
        if (mimetype && extname) {
          return cb(null, true);
        } else {
          cb('Error: Images only')
        }
      }

      // re-direct user to create new form when they get into "create-new" route
      // need to review the routing of this re-direct
      app.get('/create-new', isLoggedIn, (req, res) => {
        res.render(__dirname + '/views/partial/create-form');
      });

      // serving static files in folder "views"
      app.use(express.static(__dirname + "/views"));


      // get input from drawing insert as a form of object
      app.post('/create-new/new-node', (req, res) => {
        // each time to insert node to nodes table
        return knex.insert({
          node_x1: req.body.x1,
          node_y1: req.body.y1,
          node_x2: req.body.x2,
          node_y2: req.body.y2,
          node_title: req.body.title,
          node_content: req.body.content,
          note_id: 1,
        }).into('nodes');
      })


      //express port 8000
      app.listen(port, () => {
        console.log("listening to port", port);
      })
