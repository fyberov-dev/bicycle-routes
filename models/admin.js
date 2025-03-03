const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");

const adminSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  isCreator: {
    type: Boolean,
    required: true,
    default: false,
  },
});

adminSchema.pre("save", async function(next) {
  const admin = this;
  if (admin.isModified('password')) {
    try {
      const hashPassword = await bcrypt.hash(admin.password, 10);
      admin.password = hashPassword;
    } catch (err) {
      console.log(err);
    }
  }
  next();
})

module.exports = model("Admin", adminSchema);
