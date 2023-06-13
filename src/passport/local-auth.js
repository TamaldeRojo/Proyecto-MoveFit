const passport = require('passport')
const LocalStrategy =  require('passport-local').Strategy
const flash = require('connect-flash')
const bcrypt = require('bcrypt-nodejs')

var User = require('../models/user.js') //user es el schema


passport.use("local-signup",new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
},
    async (req,email,password,done)=>{
        const u = await User.findOne({'email': email})
        if(u) {
            console.log("abajo de mi")
          return done(null, false, req.flash('signupMessage','The Email is already Taken.'));
          
        } else {
          const newUser = new User();
          newUser.email = email;
          newUser.password = newUser.encryptPassword(password);
        //console.log(newUser)
          await newUser.save();
          done(null, newUser);
        }
}))

passport.use('local-signin',new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
},async (req,email,password,done)=>{
  const u = await User.findOne({'email':email});

  if(!u) return done(null,false,req.flash('uwu','User not found.'));
  bcrypt.compare(password,u.password,(err,res)=>{

    if (err) return done(null,false,res.status(500).send('An error occurred while comparing passwords'));
    if(res === false) return done(null,false,req.flash('uwu','Incorrect password'))

  })
 
  return done(null,u);

}))


passport.serializeUser((newUser,done)=>{// guardar al usuario en un archivo de la web
    return done(null,newUser.id)
    
})

passport.deserializeUser(async (id,done)=>{// manda de vuelta el id al servidor
    const userFound = await User.findById(id)
    return done(null, userFound)
})
