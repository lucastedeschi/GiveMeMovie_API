function usersDAO(connection) {
    this._connection = connection;
}

usersDAO.prototype.list = function(callback) {
    this._connection.query('select * from users', callback);
}

usersDAO.prototype.insert = function(user, callback) {
    this._connection.query('insert into users set ?', user, callback);
}

module.exports = function() {
    return usersDAO;
}