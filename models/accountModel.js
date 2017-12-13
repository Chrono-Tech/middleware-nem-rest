/** 
 * Mongoose model. Accounts
 * @module models/accountModel
 * @returns {Object} Mongoose model
 * @requires factory/addressMessageFactory
 */

const mongoose = require('mongoose'),
  messages = require('../factories/messages/addressMessageFactory');

require('mongoose-long')(mongoose);

const Account = new mongoose.Schema({
  address: {
    type: String,
    unique: true,
    required: true,
    validate: [a => /^[0-9A-Z]{40}$/.test(a), messages.wrongAddress]
  },
  balance: {type: mongoose.Schema.Types.Long, default: 0},
  created: {type: Date, required: true, default: Date.now}
});

module.exports = mongoose.model('NemAccount', Account);
