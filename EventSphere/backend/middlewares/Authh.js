import jwt from 'jsonwebtoken';

function Authh(req, res, next) {
  try {
    const bearerHeader = req.headers["authorization"];
    if (!bearerHeader || !bearerHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Access token is missing" });
    }

    const token = bearerHeader.split(" ")[1];

    // Safety check for secret key
    if (!process.env.secret_key) {
      return res.status(500).json({ message: "JWT secret key is not defined in environment" });
    }

    const decoded = jwt.verify(token, process.env.secret_key);

    req.user = decoded.userId || decoded.user?._id || decoded.user; // fallback if needed
    next();
  } catch (err) {
    return res.status(401).json({ message: "Token is invalid or expired", err });
  }
}

export default Authh;
