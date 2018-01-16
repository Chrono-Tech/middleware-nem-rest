/** 
 * Mongoose model. Accounts
 * @module models/accountModel
 * @returns {Object} Mongoose model
 * @requires factory/addressMessageFactory
 */

const mongoose = require('mongoose'),
  config = require('../config'),
  messages = require('../factories/messages/addressMessageFactory');

require('mongoose-long')(mongoose);

const Account = new mongoose.Schema({
  address: {
    type: String,
    unique: true,
    required: true,
    validate: [a => /^[0-9A-Z]{40}$/.test(a), messages.wrongAddress]
  },
  balance: {
    confirmed: {type: mongoose.Schema.Types.Long, default: 0},
    unconfirmed: {type: mongoose.Schema.Types.Long, default: 0},
    vested: {type: mongoose.Schema.Types.Long, default: 0}
  },
  created: {type: Date, required: true, default: Date.now},
  mosaics: {type: mongoose.Schema.Types.Mixed, default: {}}
});

module.exports = mongoose.accounts.model(`${config.mongo.accounts.collectionPrefix}Account`, Account);
