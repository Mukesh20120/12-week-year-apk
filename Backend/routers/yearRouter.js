const {
  getYearList,
  createNewYearlyGoal,
  getAllYearlyGoal,
  updateGoal,
  deleteGoal,
} = require("../controller/yearController");

const Router = require("express").Router();

Router.get("/", getYearList);
Router.route("/goal")
  .post(createNewYearlyGoal)
  .get(getAllYearlyGoal)
  .put(updateGoal)
  .delete(deleteGoal); 

module.exports = Router;
