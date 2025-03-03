const Router = require("express");
const lang = require("../language/lang.json");
const langHandler = require("../middleware/lang");
const router = Router();

router.get("/:lang/404", langHandler, (req, res) => {
  res.render("404", {
    title: "Lehekülg pole leitud",
    lang: req.params.lang,
    navbar: lang[req.params.lang].partials.navbar,
    footer: lang[req.params.lang].partials.footer,
    contact: lang[req.params.lang].partials.contact,
  });
});

module.exports = router;
