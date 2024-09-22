const express = require('express');
const router = express.Router();
const { registerUser, addAddress } = require("../Controllers/userController");



router.post('/register', registerUser);
router.post('/:userId/address', addAddress);

module.exports = router;
