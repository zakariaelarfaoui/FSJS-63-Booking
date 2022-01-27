const express = require('express');
const router = express.Router()
const clientController = require('../controllers/clientController.js')

router.route("/create").post(clientController.create);

module.exports = router;