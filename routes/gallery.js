const { Router } = require("express");
const sharp = require("sharp");
const lang = require("../language/lang.json");
const { validationResult } = require("express-validator");
const { imageValidators } = require("../utils/validators");
const Image = require("../models/image");
const langHandler = require("../middleware/lang");
const router = Router();

router.get("/:lang/gallery", langHandler, async (req, res) => {
  try {
    let images = await Image.find()
      .select("picUrl picUrlMin isVerified")
      .lean();

    res.render("gallery", {
      title: "Galerii",
      lang: req.params.lang,
      currentRoute: "gallery",
      pictures: images.reverse(),
      contactError: req.session.errorMessage,
      navbar: lang[req.params.lang].partials.navbar,
      footer: lang[req.params.lang].partials.footer,
      gallery: lang[req.params.lang].gallery,
      contact: lang[req.params.lang].partials.contact,
      urlEE: "et/gallery",
      urlRU: "ru/gallery",
    });

    req.session.errorMessage = null;
  } catch (err) {
    console.log(err);
  }
});

router.get("/:lang/gallery/image/:id", langHandler, async (req, res) => {
  const image = await Image.findById(req.params.id);
  let { picUrl, author, source, time } = image;
  if (source) {
    source = source.toLowerCase();
  }
  res.render("image", {
    title: "Fotod",
    picUrl,
    author,
    source,
    time,
    lang: req.params.lang,
    currentRoute: "gallery",
    navbar: lang[req.params.lang].partials.navbar,
    footer: lang[req.params.lang].partials.footer,
    contact: lang[req.params.lang].partials.contact,
    urlEE: `et/gallery/image/${req.params.id}`,
    urlRU: `ru/gallery/image/${req.params.id}`,
  });
});

router.post("/:lang/gallery/image/add", imageValidators, async (req, res) => {
  if (!req.file) {
    return res.status(404).redirect(`/${req.params.lang}/gallery`);
  }

  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      req.session.errorMessage = errors.array()[0].msg;
      return res.status(422).redirect(`/${req.params.lang}/gallery`);
    }

    const { buffer, originalname } = req.file;
    const timestamp = new Date().toISOString().replace(/:/g, "-");
    const ref = `${timestamp}-${originalname}`;
    await sharp(buffer)
      .jpeg({ quality: 30, progressive: true })
      .rotate()
      .toFile(`images/gallery/${ref}.jpeg`);

    await sharp(buffer)
      .webp({ quality: 20, progressive: true })
      .rotate()
      .resize({ width: 615, height: 350 })
      .blur(3)
      .toFile(`images/min/${ref}.webp`);

    let { author, source } = req.body;
    source = source ? source : null;
    const image = new Image({
      picUrl: `images/gallery/${ref}.jpeg`,
      picUrlMin: `images/min/${ref}.webp`,
      author,
      source,
    });

    await image.save();
    res.redirect(`/${req.params.lang}/gallery`);
  } catch (err) {
    throw new Error(err);
  }
});

module.exports = router;
