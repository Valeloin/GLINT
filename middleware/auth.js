const jwt = require('jsonwebtoken');
const { Auth } = require('../models/authsModel');

// Vérification de l'user ID et du Token
module.exports = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const userId = decodedToken.userId;
    const user = await Auth.findOne({_id: userId, token});
    if (!user) {
      throw 'Invalid user ID';
    } else {
      req.user = user;
      next();
    }
  } catch(e) {
    console.log(e)
    res.status(401).json({
      error: new Error('Invalid request!')
    });
  }
};