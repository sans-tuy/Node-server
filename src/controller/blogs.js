const { validationResult } = require("express-validator");

exports.postBlog = (req, res, next) => {
  const title = req.body.title;
  const image = req.body.image;
  const body = req.body.body;

  const error = validationResult(req);

  const data = {
    message: "Create Blog Success",
    data: {
      post_id: 1,
      title: title,
      image: image,
      body: body,
      created_at: "21/03/2022",
      author: {
        uid: 1,
        name: "sans",
      },
    },
  };
  if (!error.isEmpty()) {
    console.log(error);
    res.status(400).json({
      message: "terdapat kesalahan input mohon dicek kembali",
      data: error.array(),
    });
  } else {
    res.status(201).json(data);
  }

  next(); //next digunakan untuk meneruskan ke fungsi method selanjutnya jika ada
};

exports.getBlog = (req, res, next) => {
  const data = {
    message: "Get API Blog Success",
    data: {
      post_id: 1,
      title: "title blog",
      image: "image.png",
      body: "body blog",
      created_at: "21/03/2022",
      author: {
        uid: 1,
        name: "sans",
      },
    },
  };

  res.status(200).json(data);
  next(); //next digunakan untuk meneruskan ke fungsi method selanjutnya jika ada
};

exports.updateBlog = (req, res, next) => {
  const title = req.body.title;
  const image = req.body.image;
  const body = req.body.body;
  const idBlog = req.body.post_id;

  const data = {
    message: "Update Blog Success",
    data: {
      post_id: 1,
      title: title,
      image: image,
      body: body,
      created_at: "21/03/2022",
      author: {
        uid: 1,
        name: "sans",
      },
    },
  };

  res.status(201).json(data);
  next(); //next digunakan untuk meneruskan ke fungsi method selanjutnya jika ada
};

exports.deleteBlog = (req, res, next) => {
  const title = req.body.title;
  const image = req.body.image;
  const body = req.body.body;

  const data = {
    message: "Delete Blog Success",
    data: {
      post_id: 1,
      title: title,
      image: image,
      body: body,
      created_at: "21/03/2022",
      author: {
        uid: 1,
        name: "sans",
      },
    },
  };

  res.status(201).json(data);
  next(); //next digunakan untuk meneruskan ke fungsi method selanjutnya jika ada
};
