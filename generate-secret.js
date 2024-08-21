const crypto = require('crypto');

// Generate a secure random 32-byte key and convert it to a hexadecimal string
const secret = crypto.randomBytes(32).toString('hex');

console.log(`NEXTAUTH_SECRET=${secret}`);
