const express = require("express");
const mongoose = require("mongoose");
const config = require("config");
const bodyParser = require("body-parser");
const cors = require("cors");

const corsOptions = {
	origin: "*",
	credentials: true, //access-control-allow-credentials:true
	optionSuccessStatus: 200,
};

const app = express();
app.use(cors(corsOptions));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true }));

const db = config.get("mongoURI");
mongoose
	.connect(db)
	.then(() => console.log("Mongo Online ....."))
	.catch((err) => console.log(err));

const port = process.env.PORT || 5000;

app.use("/api/applications", require("./routes/api/Application"));
app.use("/api/balance-sheets", require("./routes/api/BalanceSheet"));
app.use("/api/Decision", require("./routes/api/Decision"));




app.listen(port, () => console.log(`Port Started and listening on ${port}`));
