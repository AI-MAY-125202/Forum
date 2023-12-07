// const jwt = require('jsonwebtoken');

// // Middleware để kiểm tra và xác thực token
// const authenticateToken = (req, res, next) => {
//     if (req.path === '/user/login' || req.path === '/user/nopassword') {
//         return next();
//     }

//     const tokenHeader  = req.header('Authorization');

//     if (!tokenHeader ) {
//         return res.status(401).json({ error: 'Unauthorized: Token is missing' });
//     }

//     const [tokenType, token] = tokenHeader.split(' ');

//     if (tokenType !== 'Bearer') {
//         return res.status(401).json({ error: 'Unauthorized: Invalid token type' });
//     }

//     // Xác thực token
//     jwt.verify(token, '123456', (err, user) => {
//         if (err) {
//         return res.status(403).json({ error: 'Forbidden: Invalid token' });
//         }
//         req.user = user;
//         next();
//     });
// };

// module.exports = authenticateToken;
