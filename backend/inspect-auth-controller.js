const fs = require('fs');
const path = 'src/controllers/authController.js';
const text = fs.readFileSync(path, 'utf8');
console.log(text.includes('verificationRequired = process.env.NODE_ENV === "production"'));
console.log(text.includes('Account created successfully. You can sign in now.'));
