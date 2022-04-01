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
router.get("/post/:idPost", controllerBlogs.getBlogById);
router.put(
  "/post/:idPost",
  [
    body("title")
      .isLength({ min: 5 })
      .withMessage("kesalahan input pada title"),
    body("body").isLength({ min: 5 }).withMessage("kesalahan input pada body"),
  ],
  controllerBlogs.updateBlog
);
router.delete("/post/:idPost", controllerBlogs.deleteBlog);

module.exports = router;
