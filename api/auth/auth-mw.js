const jwt = require('jsonwebtoken');
const secrets = require('../../data/secret');

module.exports = {
    restricted: (req, res, next) => {
        const token = req.headers.authorization;
    
        token
        ? jwt.verify(token, secrets.jwtSecret, (err, decodeToken) => {
            err
            ? res.status(401).json({ message: 'Invalid credentials.' })
            : req.user = { id: decodeToken.subject, username: decodeToken.username }, next()
        })
        : res.status(400).json({ message: 'No token provided.' });
    }
} 