//get users
const getUsers = (req, res) => {
    res.render("users", {
        title: "Users - Chat application",
    });
};
module.exports = {
    getUsers,
};
