const mongoose = require('mongoose');

// Define the Address schema
const addressSchema = new mongoose.Schema({
  street: String,
  city: String,
  country: String,
  postalCode: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

const Address = mongoose.model('Address', addressSchema);

module.exports = Address;
