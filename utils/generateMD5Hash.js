const crypto = require('crypto');
function generateMD5Hash(string){
    return crypto.createHash('md5').update(string).digest('hex');
}
module.exports = generateMD5Hash;