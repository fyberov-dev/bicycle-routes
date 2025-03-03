const { Router } = require("express");
const lang = require("../language/lang.json");
const langHandler = require("../middleware/lang");
const router = Router();

router.get("/:lang/rules", langHandler, (req, res) => {
  res.render("rules", {
    title: "Liiklusreeglid",
    lang: req.params.lang,
    currentRoute: "rules",
    navbar: lang[req.params.lang].partials.navbar,
    footer: lang[req.params.lang].partials.footer,
    rules: lang[req.params.lang].rules,
    contact: lang[req.params.lang].partials.contact,
    urlEE: "et/rules",
    urlRU: "ru/rules",
  });
});

module.exports = router;
