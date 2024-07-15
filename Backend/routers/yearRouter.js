const {
  getYearList,
  createNewYearlyGoal,
  getAllYearlyGoal,
} = require("../controller/yearController");
const {updateGoal,deleteGoal} = require('../controller/goalController')

const Router = require("express").Router();

Router.get("/", getYearList);
Router.route("/goal")
  .post(createNewYearlyGoal)
  .get(getAllYearlyGoal)
  .put(updateGoal)
  .delete(deleteGoal); 

module.exports = Router;
