const express = require("express");
const router = express.Router();
const { body } = require("express-validator");

const controllerBlogs = require("../controller/blogs");

router.post(
  "/post",
  [
    body("title")
      .isLength({ min: 5 })
      .withMessage("kesalahan input pada title"),
    body("body").isLength({ min: 5 }).withMessage("kesalahan input pada body"),
  ],
  controllerBlogs.postBlog
);
router.get("/", controllerBlogs.getBlog);
router.patch("/update", controllerBlogs.updateBlog);
router.delete("/delete", controllerBlogs.deleteBlog);

module.exports = router;
