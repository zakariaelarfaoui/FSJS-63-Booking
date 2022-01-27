const express = require('express');
const router = express.Router()
const clientController = require('../controllers/clientController.js')

router.route("/create").post(clientController.create);
router.route("/update/:id").post(clientController.update);

module.exports = router;