const { Router } = require("express");
const indexController = require("../controllers/indexController");

const indexRouter = Router();

indexRouter.get("/games", indexController.getAllGames);
// indexRouter.post("/");

module.exports = indexRouter;
