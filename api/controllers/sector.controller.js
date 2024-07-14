const SectorOfActivity = require('../models/Sector.model');

// Add a new sector of activity
const addSector = async (req, res) => {
    try {
        const { name } = req.body;

        // Check if the sector already exists
        const existingSector = await SectorOfActivity.findOne({ name });
        if (existingSector) {
            return res.status(400).json({ message: 'Sector already exists' });
        }

        // Create a new sector
        const sector = new SectorOfActivity({ name });
        await sector.save();

        res.status(201).json(sector);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all sectors of activity
const getAllSectors = async (req, res) => {
    try {
        const sectors = await SectorOfActivity.find();
        res.status(200).json(sectors);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    addSector,
    getAllSectors,
}