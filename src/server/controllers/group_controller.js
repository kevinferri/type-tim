const Group = require('../models/group_model');
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;

exports.GET = async (req, res) => {
  const group = await Group.findById(ObjectId(req.params.id));
  return res.json(group);
};
