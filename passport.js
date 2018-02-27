const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const users = require('./users');
const bcrypt = require('./bcrypt');

module.exports = (app) => {
    app.use(passport.initialize());
    app.use(passport.session());

    passport.use('local-login', new LocalStrategy(
        (email, password, done) => {
            let user = users.find((user)=> user.email == email);
            if (user == null) {
                return done(null, false, { message: 'Incorrect credentials.' });
            }

            if (user.password === password) {
                return done(null, user);
            }

            return done(null, false, { message: 'Incorrect credentials.' });
        }
    ));

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        let user = users.find((user)=> user.id == id);
        if (user == null) {
            done(new Error('Wrong user id.'));
        }

        done(null, user);
    });
    passport.use('local-signup', new LocalStrategy(
        (email, password, done) => {
            let user = users.find((user)=>user.email == email);
            if (user) {
                return done(null, false, { message: 'Email already taken' });
            } else {
                bcrypt.hashPassword(password)
                    .then(hash => {
                        const newUser = {
                            email:email,
                            password: hash
                        };
                        users.push(newUser);
                        done(null, newUser);
                    })
                    .catch(err => console.log(err));
            }
        }
    ));
    passport.use('local-login', new LocalStrategy(
        (email, password, done) => {
            let user = users.find((user)=>user.email == email)
            if (user == null) {
                return done(null, false, { message: 'Incorrect credentials.' });
            }

            bcrypt.checkPassword(password, user.password)
                .then(result => {
                    if(result) {
                        return done(null, user);
                    } else {
                        return done(null, false, { message: 'Incorrect credentials'});
                    }
                })
                .catch(err => console.log(err));
        }
    ));    
};