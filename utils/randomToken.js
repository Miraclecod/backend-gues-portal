const crypto = require('crypto');

module.exports = function() {
    const token = crypto.randomBytes(64).toString('hex');
    return token;
}