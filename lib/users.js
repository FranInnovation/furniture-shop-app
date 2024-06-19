import sql from 'better-sqlite3';

const db = sql('furnitureshop.db');

export function getUsers() {
    return db.prepare('SELECT * FROM user').all();
}

export function getUser(userId) {
    return db.prepare('SELECT * FROM user WHERE id = ?').get(userId);
}

export function getUserByEmail(email) {
    return db.prepare('SELECT * FROM user WHERE email = ?').get(email);
}