const express = require("express");
const cors = require("cors");
const indexRouter = require("./routes/indexRoutes");

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.use("/", indexRouter);

app.listen(PORT);
