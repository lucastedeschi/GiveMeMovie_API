function usersDAO(connection) {
    this._connection = connection;
}

usersDAO.prototype.list = function(callback) {
    this._connection.query('SELECT * FROM users', callback);
}

usersDAO.prototype.getById = function(userId, callback) {
    this._connection.query('SELECT * FROM users WHERE id = ?', [userId], callback);
}

usersDAO.prototype.insert = function(user, callback) {
    this._connection.query('INSERT INTO users SET ?', user, callback);
}

usersDAO.prototype.update = function(user, callback) {
    this._connection.query("UPDATE users SET email = ?, password = ? WHERE id = ?",
                    [user.email, user.password, user.id], callback);
}

usersDAO.prototype.delete = function(userId, callback) {
    this._connection.query('DELETE FROM users WHERE id = ?',
                    [userId], callback);
}

module.exports = function() {
    return usersDAO;
}