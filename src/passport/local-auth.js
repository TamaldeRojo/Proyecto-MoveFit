const passport = require('passport')
const LocalStrategy =  require('passport-local').Strategy

var User = require('../models/user.js') //user es el schema


passport.use("local-signup",new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
},
    async (req,email,password,done)=>{
        const u = await User.findOne({'email': email})
        console.log(u)
        if(u) {
          return done(null, false, req.flash('signupMessage', 'The Email is already Taken.'));
        } else {
          const newUser = new User();
          newUser.email = email;
          newUser.password = newUser.encryptPassword(password);
        console.log(newUser)
          await newUser.save();
          done(null, newUser);
    }
}))





passport.serializeUser((user,done)=>{// guardar al usuario en un archivo de la web
    process.nextTick(()=>{
        return done(null,user.id)
    })
})

passport.deserializeUser(async (user,done)=>{// manda de vuelta el id al servidor
    const theUser = await User.findById(id)
    return done(null, theUser)
})
