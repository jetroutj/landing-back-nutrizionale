// require('dotenv').config({path:"../.env.local"})
require('dotenv').config()
const database = require("./db");
const config = require("./config/configuration")
const express = require('express');
const cors = require('cors');
const app = express();
const withRouterUser = require('./routes/v1/user/user');
// const statusMonitor = require('express-status-monitor')


app.use(cors());
app.use(express.urlencoded({ limit: '32MB', extended: true }));
app.use(express.json({ limit: '32MB', extended: true }))
withRouterUser(app);

const run = async () => {
	await database.initialize()
	app.listen(
		{
			port: config.port,
			hostname: config.hostname
		},
		() => {
			console.log(`🚀 Server ready at ${config.hostname}:${config.port}`);
		}
	);
}
run();



