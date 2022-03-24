const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// format model
const blogPost = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    author: {
      type: Object,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// module.exports = mongoose.model(nama model, format model);
module.exports = mongoose.model("blogPost", blogPost);
