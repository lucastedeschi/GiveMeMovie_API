function usersDAO(connection) {
    this._connection = connection;
}

usersDAO.prototype.list = function(callback) {
    this._connection.query('select * from users', callback);
}

module.exports = function() {
    return usersDAO;
}