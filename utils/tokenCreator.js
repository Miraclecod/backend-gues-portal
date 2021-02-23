const crypto = require('crypto');

module.exports = function(password) {
    const hash = crypto.createHash('sha256').update(password).digest('hex');
    return hash;
}