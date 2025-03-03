const { Schema, model } = require("mongoose");

const imageSchema = new Schema({
  picUrl: {
    type: String,
    required: true,
  },
  picUrlMin: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  source: {
    type: String,
    required: false,
  },
  isVerified: {
    type: Boolean,
    required: true,
    default: false,
  },
  time: {
    type: Date,
    default: Date.now,
  },
});

module.exports = model("gallery", imageSchema);
