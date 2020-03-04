const Message = require('../models/message_model');

exports.GET = async (req, res) => {
  const messages = await Message.find({ groupId: req.params.id });

  return res.json(messages);
};

exports.POST = async (req, res) => {
  const message = new Message();

  message.text = req.body.text;
  message.groupId = req.params.id;
  message.sentBy = {
    _id: req.user.id,
    picture: req.user.picture,
    name: req.user.name,
  };

  // Do validation on groupId, make sure
  // user is in that group

  await message.save();
  const messages = await Message.find({ groupId: req.params.id });

  return res.json(messages);
};
