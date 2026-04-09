const session = require('express-session');
const connectMongo = require('connect-mongo');

const MongoStore = connectMongo.default || connectMongo;

function sessionMW({
  mongoUrl = process.env.MONGO_URL,
  secret = process.env.SESSION_SECRET,
  ttlSeconds = Number(process.env.SESSION_TTLSECONDS) || 1800,
} = {}) {
  return session({
    store: MongoStore.create({
      mongoUrl,
      ttl: ttlSeconds,
    }),
    secret,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: ttlSeconds * 1000,
      httpOnly: true,
      sameSite: 'lax',
      secure: String(process.env.COOKIE_SECURE) === 'true',
    },
  });
}

module.exports = { sessionMW };