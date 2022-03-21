exports.register = (req, res, next) => {
  const name = req.body.name;
  const password = req.body.password;
  const email = req.body.email;

  const data = {
    message: "Register Success",
    data: {
      id: 1,
      name: name,
      password: password,
      email: email,
    },
  };

  res.status(201).json(data);
  next();
};
