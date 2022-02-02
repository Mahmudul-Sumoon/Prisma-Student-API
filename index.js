const express = require("express");
const apiRouter = require("./routes/api.route");
require("dotenv").config();
const cors = require("cors");


const app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
const port = process.env.PORT || 3000;

//connection check with postman
app.get("/", async(req, res, next) => {
    res.send({ message: "good to go" });
});

app.use("/api", apiRouter);
app.use(error404Handler);
app.use(errorHandler);

//404 error handler
function error404Handler(req, res, next) {
    next("no route was found!");
}
//default error handler
function errorHandler(err, req, res, next) {
    if (res.headersSent) {
        next("There was a problem in streaming!!");
    } else {
        if (err.message) {
            res.status(500).json({ error: err.message });
        } else {
            res.status(500).json({ error: err });
        }
    }
}
app.listen(port, () => {
    console.log(`connection established at port ${port} `);
});