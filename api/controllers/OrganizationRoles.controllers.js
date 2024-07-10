const OrganizationRole = require('../models/OrganizationRoles.model');

const addOrganizationRole = async (req, res) => {
    const { name, permissions } = req.body;

    try {
        const existingRole = await OrganizationRole.findOne({ name });
        if (existingRole) {
            return res.status(400).json({ message: "Role already exists" });
        }

        const newRole = new OrganizationRole({ name, permissions });
        await newRole.save();
        res.status(201).json({ message: "Role created successfully", role: newRole });
    } catch (error) {
        res.status(500).json({ message: "An error occurred while creating the role", error: error.message });
    }
};

const getAllOrganizationRoles = async (req, res) => {
    try {
        const roles = await OrganizationRole.find();
        res.status(200).json(roles);
    } catch (error) {
        res.status(500).json({ message: "An error occurred while fetching organization roles", error: error.message });
    }
};

module.exports = {
    addOrganizationRole,
    getAllOrganizationRoles
};
