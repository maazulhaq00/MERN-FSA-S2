import jwt from 'jsonwebtoken';

function Auth(req, res, next) {
  try {
    const token = req.headers["authorization"];

  
    if (!token) {
      return res.status(403).json({ message: "Token is required" });
    }

    const decoded = jwt.verify(token, process.env.secret_key);
    req.user = decoded.user; 
    next();
  } catch (err) {
    return res.status(403).json({ message: "Token is invalid or expired" });
  }
}

export default Auth;
