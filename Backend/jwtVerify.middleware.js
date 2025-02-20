const jwt = require("jsonwebtoken");
const createHttpErrors = require("http-errors");

function jwtVerify(req, res, next) {
  try {
    const token = req.cookies?.token;

    if (!token) throw createHttpErrors(401, "Unauthorized, no token provided.");
    if (!req.query?.email)
      throw createHttpErrors(401, "Unauthorized, no email provided.");

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) throw createHttpErrors(401, "Unauthorized, invalid token.");
      if (decoded.email !== req.query.email)
        throw createHttpErrors(403, "Forbidden, email mismatch.");

      req.user = decoded;
      next();
    });
  } catch (error) {
    next(error);
  }
}

module.exports = jwtVerify;
