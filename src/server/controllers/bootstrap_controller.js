exports.init = (req, res, next) => {
  const bootstrapData = {
    viewer: req.user ? formatUser(req.user) : null,
  };

  return res.render('index.html', {
    bootstrapData: JSON.stringify(bootstrapData),
  });
};

const formatUser = user => {
  return {
    _id: user._id,
    email: user.email,
    name: user.name,
    jwt: user.generateJwt(),
    picture: user.picture,
  };
};
