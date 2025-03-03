const Router = require("express");
const lang = require("../language/lang");
const router = Router();

router.get("/:lang/mapping", (req, res) => {
  res.render("mapping", {
    lang: req.params.lang,
    mapping: lang[req.params.lang].mapping,
    contact: lang[req.params.lang].partials.contact,
    navbar: lang[req.params.lang].partials.navbar,
    footer: lang[req.params.lang].partials.footer,
    urlEE: "et/mapping",
    urlRU: "ru/mapping",
  });
});

module.exports = router;
