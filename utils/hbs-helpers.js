module.exports = {
  checkLang(currentLang, lang, options) {
    if (currentLang === lang) {
      return options.fn(this);
    }
    return options.inverse(this);
  },
  notEqual(attr, options) {
    if (!attr) return options.fn(this);
    if (attr) return options.inverse(this);
  },
  isEqual(a, b, options) {
    if (a == b) return options.fn(this);

    options.inverse(this);
  },
  isNotEqual(a, b, options) {
    if (a != b) return options.fn(this);

    options.inverse(this);
  },
  isGreater(a, b, options) {
    if (+a > +b) return options.fn(this);
    else return options.inverse(this);
  },
};
