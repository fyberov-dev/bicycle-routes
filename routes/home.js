const { Router } = require("express");
const Image = require("../models/image");
const lang = require("../language/lang.json");
const langHandler = require("../middleware/lang");
const router = Router();

router.get("/", (_, res) => {
  res.status(404).redirect("/et");
});

router.get("/:lang", langHandler, async (req, res) => {
  try {
    if (req.params.lang === "ru" || req.params.lang === "et") {
      const images = await Image.find({ isVerified: true })
        .sort({ time: -1 })
        .limit(5)
        .lean();
      res.render("index", {
        title: lang[req.params.lang].home.pageTitle,
        lang: req.params.lang,
        contactError: req.session.errorMessage,
        images,
        text: lang[req.params.lang].home,
        navbar: lang[req.params.lang].partials.navbar,
        footer: lang[req.params.lang].partials.footer,
        contact: lang[req.params.lang].partials.contact,
        urlEE: "et",
        urlRU: "ru",
      });

      req.session.errorMessage = null;
    } else {
      res.status(404).redirect("/ru");
    }
  } catch (err) {
    throw new Error(err);
  }
});

module.exports = router;
