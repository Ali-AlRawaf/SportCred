const jwt = require('jsonwebtoken')

module.exports = function (req, res, next){
  const token = req.header('auth-token');
  if (!token) return res.status(401).send('Access Denied!');

  try{
    const verified_user = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verified_user;
    next();
  }catch(err){
    res.status(400).send('Bad token')
  }
};