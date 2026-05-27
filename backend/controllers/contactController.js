const Contact = require("../models/Contact");

exports.createContact = async (req, res) => {
  try {
    console.log("Incoming data:", req.body);

    const contact = await Contact.create(req.body);

    console.log("Saved to MongoDB:", contact);

    return res.status(201).json({
      success: true,
      message: "Form submitted successfully!",
      contact
    });

  } catch (error) {
    console.error("MongoDB save error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to save form data",
      error: error.message
    });
  }
};