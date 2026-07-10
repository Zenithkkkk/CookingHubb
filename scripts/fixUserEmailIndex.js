require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');

async function main() {
  await mongoose.connect(process.env.MONGO_URI);

  const indexes = await User.collection.indexes();
  const emailIndex = indexes.find((idx) => idx.name === 'email_1');
  const phoneIndex = indexes.find((idx) => idx.name === 'phone_1');

  console.log('Current email_1 index:', JSON.stringify(emailIndex));
  console.log('Current phone_1 index:', JSON.stringify(phoneIndex));

  if (emailIndex) {
    await User.collection.dropIndex('email_1');
    console.log('Dropped email_1 index.');
  }

  if (phoneIndex) {
    await User.collection.dropIndex('phone_1');
    console.log('Dropped phone_1 index.');
  }

  await User.syncIndexes();
  console.log('Synced indexes from User schema.');

  const updated = await User.collection.indexes();
  console.log('Updated indexes:', JSON.stringify(updated, null, 2));

  await mongoose.disconnect();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
