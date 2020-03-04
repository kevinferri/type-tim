const mongoose = require('mongoose');
const { Schema } = mongoose;

const groupSchema = Schema({
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  creatorId: {
    type: Schema.ObjectId,
    auto: true,
    index: true,
  },
  picture: {
    type: String,
  },
});

module.exports = mongoose.model('Group', groupSchema);
