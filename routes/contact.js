const { Router } = require("express");
const { validationResult } = require("express-validator");
const { contactValidators } = require("../utils/validators.js");
const Contact = require("../models/contact");
const router = Router();

router.post("/:lang/contact", contactValidators, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      req.session.errorMessage = errors.array()[0].msg;
      return res.status(422).redirect(`/${req.params.lang}`);
    }

    const { name, suggestion } = req.body;
    const contact = new Contact({
      name,
      suggestion,
    });

    await contact.save();
    res.redirect(`/${req.params.lang}`);
  } catch (err) {
    throw new Error(err);
  }
});

module.exports = router;
