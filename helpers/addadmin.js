const User = require('../models/User');
const bcrypt = require('bcryptjs');

module.exports = async () => {
  const salt = bcrypt.genSaltSync(10);
  const passwordHash = bcrypt.hashSync('admin', salt);

  const newAdmin = new User({
    firstName: 'Admin',
    lastName: 'Admin',
    email: 'admin@admin.com',
    phone: '2937489327483',
    verified: true,
    verification: '123456',
    password: passwordHash,
    role: 'admin',
  });
  await newAdmin.save();
  return;
}