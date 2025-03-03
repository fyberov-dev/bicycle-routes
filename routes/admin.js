const { Router } = require("express");
const lang = require("../language/lang.json");
const Admin = require("../models/admin");
const Image = require("../models/image");
const Contact = require("../models/contact");
const bcrypt = require("bcryptjs");
const auth = require("../middleware/auth");
const langHandler = require("../middleware/lang");
const router = Router();

router.get("/:lang/admin", auth, langHandler, async (req, res) => {
  try {
    const admins = await Admin.find().select("name isCreator").lean();
    let images = await Image.find().lean();
    const suggestions = await Contact.find().lean();

    const { name, isCreator } = req.session.admin;

    res.render("admin", {
      title: `Admin paneel - ${name}`,
      lang: req.params.lang,
      images: images.reverse(),
      admins,
      suggestions,
      nameCurrent: name,
      isCreatorCurrent: isCreator,
      contact: lang[req.params.lang].partials.contact,
      navbar: lang[req.params.lang].partials.navbar,
      footer: lang[req.params.lang].partials.footer,
    });
  } catch (err) {
    throw new Error(err);
  }
});

router.get("/:lang/admin/login", langHandler, (req, res) => {
  res.render("login", {
    title: "Sissepääs admin paneelile",
    lang: req.params.lang,
    navbar: lang[req.params.lang].partials.navbar,
    footer: lang[req.params.lang].partials.footer,
    contact: lang[req.params.lang].partials.contact,
  });
});

router.get("/:lang/admin/image/:id", auth, langHandler, async (req, res) => {
  try {
    const image = await Image.findById(req.params.id);
    const { picUrl, author, time, source } = image;

    res.render("adminimage", {
      title: `Kinnita ${author}`,
      lang: req.params.lang,
      id: req.params.id,
      picUrl,
      author,
      time,
      source,
      navbar: lang[req.params.lang].partials.navbar,
      contact: lang[req.params.lang].partials.contact,
      footer: lang[req.params.lang].partials.footer,
    });
  } catch (err) {
    throw new Error(err);
  }
});

router.post("/:lang/admin/login", async (req, res) => {
  try {
    const { name, password } = req.body;

    const candidate = await Admin.findOne({ name });
    if (candidate) {
      const passwordMatch = await bcrypt.compare(password, candidate.password);

      if (passwordMatch) {
        req.session.admin = candidate;
        req.session.isAuthenticated = true;
        res.redirect(`/${req.params.lang}/admin`);
      } else {
        res.redirect(`/${req.params.lang}/admin/login`);
      }
    }
  } catch (err) {
    throw new Error(err);
  }
});

router.post("/:lang/admin/add", async (req, res) => {
  try {
    const { name, password } = req.body;
    const admin = new Admin({
      name,
      password,
    });
    await admin.save();
    res.redirect(`/${req.params.lang}/admin`);
  } catch (err) {
    throw new Error(err);
  }
});

router.post("/:lang/admin/delete", async (req, res) => {
  try {
    await Admin.deleteOne({
      _id: req.body.id,
    });

    res.redirect(`/${req.params.lang}/admin`);
  } catch (err) {
    throw new Error(err);
  }
});

router.post("/:lang/admin/image/:id/verify", async (req, res) => {
  try {
    const image = await Image.findById(req.params.id);

    Object.assign(image, {
      isVerified: true,
    });
    await image.save();
    res.redirect(`/${req.params.lang}/admin`);
  } catch (err) {
    throw new Error(err);
  }
});

router.post("/:lang/admin/image/:id/delete", async (req, res) => {
  try {
    await Image.deleteOne({
      _id: req.params.id,
    });

    res.redirect(`/${req.params.lang}/admin`);
  } catch (err) {
    throw new Error(err);
  }
});

router.post("/:lang/admin/contact/:id/delete", async (req, res) => {
  try {
    await Contact.deleteOne({
      _id: req.params.id,
    });

    res.redirect(`/${req.params.lang}/admin#suggestions`);
  } catch (err) {
    throw new Error(err);
  }
});

router.post("/:lang/admin/leave", async (req, res) => {
  req.session.admin = null;
  req.session.isAuthenticated = false;
  res.redirect(`/${req.params.lang}/admin/login`);
});

module.exports = router;
