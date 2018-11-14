const bcrypt = require("bcrypt");

// ENCRYPT passwords before saving them "hash()" or "hashSync()"
// 1. Signup feature
// 2. Seed for creating users
// 3. Update Password feature
const encryptedFox = bcrypt.hashSync("fox", 10);
console.log(encryptedFox);

const encryptedEmpty = bcrypt.hashSync("", 10);
console.log(encryptedEmpty);



// COMPARE passwords with "compare()" or "compareSync()"
// 1. Login
console.log(bcrypt.compareSync("fox", encryptedFox));
console.log(bcrypt.compareSync("Fox", encryptedFox));
