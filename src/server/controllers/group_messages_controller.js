const Message = require('../models/message_model');

exports.GET = async (req, res) => {
  const messages = await getMessagesForGroup(req);

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
  const messages = await getMessagesForGroup(req);

  return res.json(messages);
};

const getMessagesForGroup = async req => {
  return await Message.find({ groupId: req.params.id })
    .sort('-sentAt')
    .limit(50)
    .exec();
};
