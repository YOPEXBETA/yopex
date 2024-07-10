const express = require('express');
const { addOrganizationRole,getAllOrganizationRoles } = require('../controllers/OrganizationRoles.controllers');
const {
    authenticateToken,
} = require("../middlewares/authenticateToken.middleware");

const router = express.Router();

router.post('/add', authenticateToken, addOrganizationRole);
router.get('/getAll', authenticateToken, getAllOrganizationRoles);


module.exports = router;
