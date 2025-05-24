const jwt = require("jsonwebtoken");
require("dotenv").config();

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;

function authenticateToken(req, res, next) {
  const accessToken = req.cookies?.accessToken;
  const refreshToken = req.cookies?.refreshToken;

  if (!accessToken) {
    // Không có access token, thử refresh
    return tryRefreshToken(refreshToken, req, res, next);
  }

  jwt.verify(accessToken, ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      // accessToken hết hạn → thử refresh
      return tryRefreshToken(refreshToken, req, res, next);
    }

    res.locals.user = user;
    next();
  });
}

function tryRefreshToken(refreshToken, req, res, next) {
  if (!refreshToken) {
    res.locals.user = null;
    return next();
  }
  jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) {
      res.locals.user = null;
      return next();
    }
    // Tạo lại access token
    const userInfo = {
      admin_id: user.admin_id,
      username: user.username,
      email: user.email,
      full_name: user.full_name,
      avatar: user.avatar,
    };

    const newAccessToken = jwt.sign(userInfo, ACCESS_TOKEN_SECRET, {
      expiresIn: "15m",
    });

    res.cookie("accessToken", newAccessToken, {
      httpOnly: true,
      maxAge: 15 * 60 * 1000,
    });

    res.locals.user = userInfo; // Cho middleware tiếp tục
    next();
  });
}

module.exports = authenticateToken;
