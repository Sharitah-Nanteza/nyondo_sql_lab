// const Database = require('better-sqlite3');
// const db = new Database('nyondo_stock.db');

// function searchProductSafe(name) {
//     const stmt = db.prepare("SELECT * FROM products WHERE name = ?");
//     return stmt.all(name);
// }

// function loginSafe(username, password) {
//     const stmt = db.prepare("SELECT * FROM users WHERE username = ? AND password = ?");
//     return stmt.get(username, password);
// }

// // Tests
// console.log('Test 1:', searchProductSafe("' OR 1=1--"));
// console.log('Test 2:', searchProductSafe("' UNION SELECT id,username,password,role FROM users--"));
// console.log('Test 3:', loginSafe("admin'--", 'anything'));
// console.log('Test 4:', loginSafe("' OR '1'='1", "' OR '1'='1"));




// no5


const Database = require('better-sqlite3');
const db = new Database('nyondo_stock.db');

// Helper validation functions
function isValidName(name) {
    return typeof name === 'string' &&
           name.length >= 2 &&
           !/[<>;]/.test(name);
}

function isValidUsername(username) {
    return typeof username === 'string' &&
           username.length > 0 &&
           !username.includes(' ');
}

function isValidPassword(password) {
    return typeof password === 'string' &&
           password.length >= 6;
}

// Secure + validated functions
function searchProductSafe(name) {
    if (!isValidName(name)) {
        console.log("Invalid product name");
        return null;
    }

    const stmt = db.prepare("SELECT * FROM products WHERE name = ?");
    return stmt.all(name);
}

function loginSafe(username, password) {
    if (!isValidUsername(username)) {
        console.log("Invalid username");
        return null;
    }

    if (!isValidPassword(password)) {
        console.log("Invalid password");
        return null;
    }

    const stmt = db.prepare("SELECT * FROM users WHERE username = ? AND password = ?");
    return stmt.get(username, password);
}

// Tests
console.log('Test 1:', searchProductSafe('cement'));        // works
console.log('Test 2:', searchProductSafe(''));              // rejected
console.log('Test 3:', searchProductSafe('<script>'));      // rejected

console.log('Test 4:', loginSafe('admin', 'admin123'));     // works
console.log('Test 5:', loginSafe('admin', 'ab'));           // rejected
console.log('Test 6:', loginSafe('ad min', 'pass123'));     // rejected