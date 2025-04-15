const session = require("express-session");
const sessionStorage = require("node-sessionstorage");

class CustomStore extends session.Store {
  constructor() {
    super();
  }

  get(sid, callback) {
    const data = sessionStorage.getItem(sid);
    callback(null, data ? JSON.parse(data) : null);
  }

  set(sid, session, callback) {
    sessionStorage.setItem(sid, JSON.stringify(session));
    callback(null);
  }

  destroy(sid, callback) {
    sessionStorage.removeItem(sid);
    callback(null);
  }
}

const sessionMiddleware = session({
  secret: "your-secret-key",
  resave: false,
  saveUninitialized: true,
  store: new CustomStore(),
  cookie: {
    secure: false, // true nếu dùng HTTPS
    maxAge: 1000 * 60 * 60, // 1 giờ
  },
});
module.exports = sessionMiddleware;
