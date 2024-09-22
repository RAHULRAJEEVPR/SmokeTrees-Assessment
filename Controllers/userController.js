const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const Address = require("../models/addressModel");

const registerUser = async (req, res) => {
    try {
      const { name, password, street, city, country, postalCode } = req.body;
  
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      const user = new User({ name, password: hashedPassword });
      await user.save();
  
  
      const address = new Address({
        street,
        city,
        country,
        postalCode,
        user: user._id
      });
      await address.save();
  
      user.addresses.push(address._id);
      await user.save();
  
      res.status(201).json({ message: 'User and address added successfully' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

const addAddress = async (req, res) => {
  try {
    const { street, city, country, postalCode } = req.body;
    const { userId } = req.params;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const address = new Address({
      street,
      city,
      country,
      postalCode,
      user: user._id,
    });
    await address.save();

    user.addresses.push(address._id);
    await user.save();

    res.status(201).json({ message: "Address added successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  registerUser,
  addAddress,
};
