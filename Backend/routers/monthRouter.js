const {
    createNewMonthlyGoal,
    getAllMonthlyGoal,
    getMonthList
  } = require("../controller/monthController");
  const {updateGoal,deleteGoal} = require('../controller/goalController');
const authentication = require("../middleware/fullAuthMiddleware");
  
  const Router = require("express").Router();
  
  Router.get("/", getMonthList);
  Router.use(authentication);
  Router.route("/goal")
    .post(createNewMonthlyGoal)
    .get(getAllMonthlyGoal)
    .put(updateGoal)
    .delete(deleteGoal); 
  
  module.exports = Router;
  