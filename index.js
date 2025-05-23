require("dotenv").config();
const express = require("express")
const app = express()

const cors = require("cors")
const bodyParser = require('body-parser')
const port = process.env.PORT || 3000

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const messageRoutes = require("./routes/Message");
app.use("/api/messages", messageRoutes);

const replyMessageRoutes = require("./routes/ReplyMessage");
app.use("/api/messages", replyMessageRoutes);

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(statusCode).json({
        status: false,
        message,
    });
});

app.listen(port, () => {
    console.log(`app running at http://localhost:${port}`);
})