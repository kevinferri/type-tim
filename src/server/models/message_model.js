var mongoose = require('mongoose');

var messageSchema = mongoose.Schema({
  text: {
    type: String,
  },
  groupId: {
    type: Object,
    auto: true,
    index: true,
  },
  sentBy: {
    type: Object,
    auto: true,
    index: true,
  },
  sentAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Message', messageSchema);
