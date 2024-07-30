const {
  getYearList,
  createNewYearlyGoal,
  getAllYearlyGoal,
} = require("../controller/yearController");
const {updateGoal,deleteGoal} = require('../controller/goalController');
const authentication = require("../middleware/fullAuthMiddleware");
const Router = require('express').Router();

Router.get("/", getYearList);
Router.use(authentication);
Router.route("/goal")
  .post(createNewYearlyGoal)
  .get(getAllYearlyGoal)
  .put(updateGoal)
  .delete(deleteGoal); 

module.exports = Router;
