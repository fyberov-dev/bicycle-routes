const { Router } = require("express");
const lang = require("../language/lang.json");
const langHandler = require("../middleware/lang");
const router = Router();

router.get("/:lang/aid", langHandler, (req, res) => {
  res.render("aid", {
    title: "Esmaabi",
    lang: req.params.lang,
    currentRoute: "aid",
    aid: lang[req.params.lang].aid,
    navbar: lang[req.params.lang].partials.navbar,
    footer: lang[req.params.lang].partials.footer,
    contact: lang[req.params.lang].partials.contact,
    urlEE: "et/aid",
    urlRU: "ru/aid",
  });
});

module.exports = router;
