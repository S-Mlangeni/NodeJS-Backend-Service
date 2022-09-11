const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const checkRoutes = require("./routes/checkRoutes");

const app = express();

app.listen(process.env.PORT, () => {
    console.log("Server is running");
});

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    next();
});

app.use(express.json());

app.use("/video-api", checkRoutes);

app.get("/", (req, res) => {
    res.send("<h1>Server Page</h1>")
});