var mongoose = require("mongoose");

var warbleSchema = new mongoose.Schema({
  text: String,
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

warbleSchema.pre('save', function(next) {
  let warble = this;
  if (warble.isNew) {
    mongoose.model('User').findById(warble.user_id)
    .then(function(user) {
      user.warbles.push(warble._id);
      return user.save();
    })
    .then(function() {
      next();
    })
    .catch(function(error) {
      next(error);
    });
  } else {
    next();
  }
});

warbleSchema.pre('remove', function(next) {
  let warble = this;
  console.log(warble);
  if (warble.isNew) { // ???
    mongoose.model('User').findById(warble.user_id)
    .then(function(user) {
      user.warbles.(warble._id); // concat the separate parts of it??
      return user.save();
    })
    .then(function() {
      next();
    })
    .catch(function(error) {
      next(error);
    });
  } else {
    next();
  }
});

var Warble = mongoose.model('Warble', warbleSchema);

module.exports = Warble;