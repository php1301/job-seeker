const passport = require('passport');
const { User } = require('../models/User');
const config = require('../config/index');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;




const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromHeader('token'),
    secretOrKey: config.secretKey
};

const jwtLogin = new JwtStrategy(jwtOptions, function (payload, done) {
    console.log(payload);
    User.findById(payload._id, function (err, user) {
        if (err) {
            return done(err, false);
        }
        return user ? done(null, user) : done(null, false)
    });
});

passport.use(jwtLogin);

module.exports = {
    initialize: () => passport.initialize(),
    authenticateJWT: passport.authenticate('jwt', { session: false }),
};
module.exports.authorize = (userTypeArr) => (req, res, next) => {

    const { userType } = req.user
    let index = userTypeArr.findIndex(e => e === userType)
    if (index != -1)
        return next()
    else
        res.status(401).json({ message: "You are not allowed" })
}