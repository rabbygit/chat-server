const users = [];

function userJoin(id, userName) {
    const user = { id, userName }

    users.push(user)

    return user
}

function userLeft(id) {
    const index = users.findIndex(user => user.id === id);

    if (index !== -1) {
        return users.splice(index, 1)[0];
    }
}

module.exports = {
    userJoin,
    userLeft
}