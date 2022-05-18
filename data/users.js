const bcrypt = require('bcryptjs');

const users = [
    {
        name: 'Admin User',
        email: 'admin@admin.com',
        password: bcrypt.hashSync('123456789', 10),
        isAdmin: true
    },
    {
        name: 'Chris Vergara',
        email: 'chrisvd99@gmail.com',
        password: bcrypt.hashSync('123456789', 10),
    },
    {
        name: 'Cristiano Ronaldo',
        email: 'cr7@gmail.com',
        password: bcrypt.hashSync('123456789', 10),
    },

]

module.exports = users;
