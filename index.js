const express = require("express");
const cors = require("cors");
require("dotenv").config();
const db = require("./utils/database");
const parentRoute = require("./routes/parent");
const childRoute = require("./routes/child");

const app = express();

app.use(express.json());

app.use(cors());

app.use("/api", parentRoute);
app.use("/api", childRoute);

let port = process.env.PORT || 6000;

app.listen(port, () => console.log(`server is running on port ${port}`));
