//get inbox pae
const getInbox = (req, res) => {
    res.render("inbox", {
        title: "Inbox - Chat Application",
    });
};
module.exports = {
    getInbox,
};
