module.exports = function (req, res, next) {
  const splittedUrl = req.url.split("/");
  let language = "";
  splittedUrl.forEach((element) => {
    if (element === "ru" || element === "et") {
      language = element;
    }
  });

  if (language === "") {
    return res.status(404).redirect(`/ru/404`);
  } else {
    return res.status(404).redirect(`/${language}/404`);
  }
};
