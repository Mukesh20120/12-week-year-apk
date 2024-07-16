const {
  getDaysList,
  createDailyGoal,
  getCurrentDayGoals,
} = require("../controller/dayController");
const {updateGoal,deleteGoal} = require('../controller/goalController')
  
const Router = require("express").Router();

Router.get("/", getDaysList);
Router.route("/goal")
  .post(createDailyGoal)
  .get(getCurrentDayGoals)
  .put(updateGoal)
  .delete(deleteGoal); 

module.exports = Router;
