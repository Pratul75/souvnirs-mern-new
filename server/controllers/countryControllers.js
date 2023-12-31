const Country = require("../schema/countryModal");

// Create a new country
const addCountry = async (req, res) => {
  try {
    const country = new Country(req.body);
    await country.save();
    res.status(201).json(country);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "somthing went wrong" });
  }
};

// Get all countries
const getAllCountries = async (req, res) => {
  try {
    const countries = await Country.find();
    res.json(countries);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "somthing went wrong" });
  }
};

const getCountryById = async (req, res) => {
  try {
    const country = await Country.findById(req.params.id.substring());
    if (!country) {
      return res.status(404).json({ message: "Country not found" });
    }
    res.json(country);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "somthing went wrong" });
  }
};

// Update a country
const updateCountry = async (req, res) => {
  try {
    const country = await Country.findByIdAndUpdate(
      req.params.id.substring(1),
      req.body,
      {
        new: true,
      }
    );
    if (!country) {
      return res.status(404).json({ message: "Country not found" });
    }
    res.json(country);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "somthing went wrong" });
  }
};

// Delete a country
const deleteCountryById = async (req, res) => {
  try {
    const country = await Country.findByIdAndRemove(req.params.id.substring(1));
    if (!country) {
      return res.status(404).json({ message: "Country not found" });
    }
    res.json({ message: "Country deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "somthing went wrong" });
  }
};

module.exports = {
  addCountry,
  getAllCountries,
  getCountryById,
  deleteCountryById,
  updateCountry,
};
