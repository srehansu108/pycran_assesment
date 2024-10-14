const Property = require('../models/propertyModel');

exports.getProperties = async (req, res) => {
  try {
    const properties = await Property.getAllProperties();
    res.json(properties);
  } catch (err) {
    console.error('Error fetching properties:', err); // Log the error
    res.status(500).json({ error: 'Server error' });
  }
};
