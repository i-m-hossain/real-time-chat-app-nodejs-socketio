//external imports
const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const path = require("path");
const cookieParser = require("cookie-parser");

//internal imports
const { notFoundHandler, errorHandler } = require("./middlewares/common");
const loginRouter = require("./router/loginRouter");
const usersRouter = require("./router/usersRouter");
const inboxRouter = require("./router/inboxRouter");
//creating app instance
const app = express();
dotenv.config();

//database connection
const dbConnect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_CONNECTION_STRING);
        console.log("connection successful");
    } catch (err) {
        console.log(err);
    }
};
dbConnect();

//request parser
app.use(express.json());
app.use(express.urlencoded({ extended: true })); //parsing query parameter

//set view engine
app.set("view engine", "ejs");

//set static folder
app.use(express.static(path.join(__dirname, "public")));

//parse cookies
app.use(cookieParser(process.env.COOKIE_SECRET));

//routing setup
app.use("/", loginRouter);
app.use("/users", usersRouter);
app.use("/inbox", inboxRouter);

//404 not found handler
app.use(notFoundHandler);

//common error handler
app.use(errorHandler);
//start server
app.listen(process.env.PORT, () => {
    console.log(`app is listening at port ${process.env.PORT}`);
});
