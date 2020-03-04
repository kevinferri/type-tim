const Group = require('../models/group_model');

exports.GET = async (req, res) => {
  const groups = await Group.find({ creatorId: req.user._id });

  return res.json(groups);
};

exports.POST = async (req, res) => {
  const group = new Group();

  group.name = req.body.name;
  group.description = req.body.description;
  group.creatorId = req.user._id;
  group.picture = req.body.picture;

  await group.save();
  const groups = await Group.find({ creatorId: req.user._id });

  return res.json(groups);
};
