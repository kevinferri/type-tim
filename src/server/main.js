const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const nunjucks = require('nunjucks');
const socketIo = require('socket.io');
const Message = require('./models/message_model');

const Config = require('./lib/Config');

const app = express();
const port = Config.get('PORT');

const sessionConfig = {
  name: Config.get('SESSION_NAME'),
  secret: Config.get('SESSION_SECRET'),
  cookie: {
    maxAge: 3600000 * 24 * 30,
  },
  resave: true,
  saveUninitialized: true,
  rolling: true,
  store: new MongoDBStore({
    uri: Config.get('DB_URL'),
    collection: 'user_sessions',
  }),
};

/**
 * Connect to database
 */
mongoose.connect(Config.get('DB_URL'), {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.set('useCreateIndex', true);

/**
 * Set up passport
 */
require('./lib/passport')(passport);
app.use(session(sessionConfig));
app.use(passport.initialize());
app.use(passport.session());

/**
 * Parse application/json
 */
app.use(bodyParser.json());

/**
 * Set up routes
 */
require('./router.js')(app, passport);

/**
 * Set static path
 */
app.use(express.static(path.join(__dirname, './../../')));

/**
 * Use nunjucks as view engine
 */
app.set('view engine', 'nunjucks');
nunjucks.configure(path.join(__dirname, 'views'), {
  autoescape: false,
  express: app,
});

/**
 * Start the HTTP server
 */
const server = app.listen(port, () => {
  /* eslint no-console: 0 */
  console.info(`🚀  Tim started on port ${port}`);
});

const getMessagesForGroup = async id => {
  return await Message.find({ groupId: id })
    .sort('-sentAt')
    .limit(50)
    .exec();
};

/**
 * Start the web socket server
 */
const io = socketIo(server);

io.on('connection', function(socket) {
  socket.on('MESSAGE_SENT', async message => {
    const m = new Message();

    m.text = message.text;
    m.groupId = message.group_id;
    m.sentBy = {
      _id: message.user.id,
      picture: message.user.picture,
      name: message.user.name,
    };

    // Do validation on groupId, make sure
    // user is in that group

    await m.save();
    const messages = await getMessagesForGroup(message.group_id);

    io.emit('MESSAGE_SENT', messages);
  });
});
