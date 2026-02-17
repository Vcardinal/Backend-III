const mongoose = require('mongoose');

async function connectDB() {
  const MONGO_URL = process.env.MONGO_URL;
  if (!MONGO_URL) throw new Error('MONGO_URL missing in .env');

  await mongoose.connect(MONGO_URL);
  console.log('✅ Connected to MongoDB');
}

module.exports = { connectDB };
