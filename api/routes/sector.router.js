const express = require('express');
const {addSector, getAllSectors} = require("../controllers/sector.controller");
const router = express.Router();

// Add a new sector of activity
router.post('/add', addSector);

// Get all sectors of activity
router.get('/getAll', getAllSectors);

module.exports = router;
