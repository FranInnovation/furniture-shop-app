import sql from 'better-sqlite3';

const db = sql('furnitureshop.db');

export function getClients() {
    return db.prepare('SELECT * FROM client').all();
}

export function getClient(clientId) {
    return db.prepare('SELECT * FROM client WHERE id = ?').get(clientId);
}