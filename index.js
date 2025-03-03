// imports

require("dotenv").config();
const express = require("express");
const path = require("path");
const csrf = require("csurf");
const mongoose = require("mongoose");
const compression = require("compression");
const session = require("express-session");
const exphbs = require("express-handlebars");
const homeRouter = require("./routes/home");
const galleryRouter = require("./routes/gallery");
const rulesRouter = require("./routes/rules");
const adminRouter = require("./routes/admin");
const errorRouter = require("./routes/error");
const mappingRouter = require("./routes/mapping");
const contactForm = require("./routes/contact");
const aidRouter = require("./routes/aid");
const errorHandler = require("./middleware/error");
const varMiddleware = require("./middleware/variables");
const fileMiddleware = require("./middleware/file");
const helmet = require("helmet");
const Admin = require("./models/admin");

const app = express();

const hbs = exphbs.create({
  defaultLayout: "main",
  extname: "hbs",
  helpers: require("./utils/hbs-helpers"),
});

app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", "views");

app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "images")));
app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/min", express.static(path.join(__dirname, "min")));
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(fileMiddleware.single("file"));
app.use(csrf());

const defaultDirectives = helmet.contentSecurityPolicy.getDefaultDirectives();

app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        ...defaultDirectives,
        "img-src": ["'self'", "https:"],
        "script-src-elem": ["'self'"],
        "frame-src": ["'self", "https://gis.tallinn.ee/"]
      },
    },
  })
);
app.use(compression());
app.use(varMiddleware);

app.use("/", homeRouter);
app.use("/", galleryRouter);
app.use("/", rulesRouter);
app.use("/", contactForm);
app.use("/", adminRouter);
app.use("/", mappingRouter);
app.use("/", aidRouter);
app.use("/", errorRouter);

app.use(errorHandler);

require("dns").lookup(require("os").hostname(), function (_, add, _) {
  console.log("addr: " + add);
});

const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
}).then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}..`);
  });
  createAdminByDefault()
}).catch((err) => {
  throw new Error(err);
});

function createAdminByDefault() {
  Admin.countDocuments({}, (err, count) => {
    if (count <= 0) {
      const admin = {
        name: "Admin",
        password: "Admin",
        isCreator: "true"
      };

      Admin.create(admin, (e) => {
        if (e) throw e;
        console.log(`Created new admin with login ${admin.name} and password ${admin.password}`);
      })
    }
  })
}