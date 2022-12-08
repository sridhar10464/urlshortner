require("dotenv").config();
const express = require ("express");
const db = require ("./db/connect");
const cors = require("cors")
const urlRoutes = require ("./routes/url.routes")


const app = express();

db();

app.use (express.json());
app.use (cors());
// app.use("/", urlRoutes);
app.use("/", require("./routes/urlredirect.routes"));
app.use("/shorten", require("./routes/url.routes"));

app.get("/", (request, response) => {
    response.send("Initiate URL app in my computer 👍👍👍")
});

const PORT = process.env.PORT || 6001;

app.listen(PORT, () => {
    console.log(`App is running in ${PORT}`);
});