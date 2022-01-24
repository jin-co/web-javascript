var mongoose = require('mongoose');
mongoose.set('debug', true)
mongoose.connect('mongodb//localhost/todo-api')
mongoose.Promise = Promise  // to use promise syntax instead of callback
