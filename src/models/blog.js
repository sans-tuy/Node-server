import mongoose from "mongoose";
const { Schema } = mongoose;

// format model
const blogPost = new Schema(
  {
    title: {
      type: String,
      required,
    },
    body: {
      type: String,
      required,
    },
    author: {
      type: Object,
      required,
    },
  },
  {
    timestamps: true,
  }
);

// module.exports = mongoose.model(nama model, format model);
module.exports = mongoose.model("blogPost", blogPost);
