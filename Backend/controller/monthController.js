const { asyncWrapper } = require("../middleware");
const { generate12Weeks } = require("../utils/generateFunctions");
const YearModel = require("../model/years");
const GoalModel = require("../model/goalModel");
const { isValidObjectId } = require("../utils/validateFunction");

const getMonthList = asyncWrapper(async (req, res) => {
  let { startDate, yearId } = req.query;

  if(!isValidObjectId(yearId)){
    throw new Error('invalid yearId');
  }

  const yearsCountInYear = await YearModel.countDocuments({
    type: "month",
    yearId
  });

  if (yearsCountInYear === 0) {
    // If not found, generate the 4 blocks of 12 weeks
    const newMonthData = generate12Weeks(startDate).map((singleYearBlock) => {
      const {
        blockNumber,
        type,
        year,
        startDate : monthStart,
        endDate: monthEnd,
        formatStartDate,
        formatEndDate,
        color,
      } = singleYearBlock;
      return {
        blockNumber,
        type,
        year,
        yearId,
        startDate: monthStart,
        endDate: monthEnd,
        formatStartDate,
        formatEndDate,
        color,
      };
    });

    await YearModel.insertMany(newMonthData);
  }
  const allMonthInYear = await YearModel.find({
    yearId,
    type: "month",
  }).sort({blockNumber: 1});
  // Send the data back to the user
  res.status(200).json({ success: true, data: allMonthInYear });
});

const createNewMonthlyGoal = asyncWrapper(async (req, res) => {
  const { yearId, monthId, task,value } = req.body;
  if (!isValidObjectId(yearId) || !isValidObjectId(monthId)) {
    throw new Error("Id Not valid");
  }
  const newGoal = await GoalModel.create({ yearId, monthId, task,value});
  res.json({
    success: true,
    message: "New goal created Successfully",
    newGoal,
  });
});
const getAllMonthlyGoal = asyncWrapper(async (req, res) => {
  const { yearId, monthId } = req.query;
  if (!isValidObjectId(yearId) || !isValidObjectId(monthId)) {
    throw new Error("Id Not valid");
  }
  const allGoal = await GoalModel.find({
    yearId: { $eq: yearId, $exists: true },
    monthId: { $eq: monthId, $exists: true }
  }).sort({value: -1});
  res.json({
    success: true,
    message: "list of all goal fetch Successfully",
    allGoal,
  });
});

module.exports = {
  getMonthList,
  createNewMonthlyGoal,
  getAllMonthlyGoal,
};
