const Database = require('better-sqlite3');
const db = new Database('nyondo_stock.db');

function searchProductSafe(name) {
    const stmt = db.prepare("SELECT * FROM products WHERE name = ?");
    return stmt.all(name);
}

function loginSafe(username, password) {
    const stmt = db.prepare("SELECT * FROM users WHERE username = ? AND password = ?");
    return stmt.get(username, password);
}

// Tests
console.log('Test 1:', searchProductSafe("' OR 1=1--"));
console.log('Test 2:', searchProductSafe("' UNION SELECT id,username,password,role FROM users--"));
console.log('Test 3:', loginSafe("admin'--", 'anything'));
console.log('Test 4:', loginSafe("' OR '1'='1", "' OR '1'='1"));