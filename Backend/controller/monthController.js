const { asyncWrapper } = require("../middleware");
const { generate12Weeks } = require("../utils/generateFunctions");
const YearModel = require("../model/years");
const GoalModel = require("../model/goalModel");
const { isValidObjectId } = require("../utils/validateFunction");
const pattern = /^\d+$/;

const getMonthList = asyncWrapper(async (req, res) => {
  let { startDate, inputYear } = req.query;

  if (!inputYear || !pattern.test(inputYear)) {
    inputYear = new Date().getFullYear();
  }

  const extractedYear = parseInt(inputYear, 10);

  const yearsCountInYear = await YearModel.countDocuments({
    year: extractedYear,
    type: "month",
  });

  if (yearsCountInYear === 0) {
    // If not found, generate the 4 blocks of 12 weeks
    const newMonthData = generate12Weeks(startDate).map((singleYearBlock) => {
      const {
        blockNumber,
        type,
        startDate,
        endDate,
        formatStartDate,
        formatEndDate,
        color,
      } = singleYearBlock;
      return {
        blockNumber,
        type,
        year: extractedYear,
        startDate,
        endDate,
        formatStartDate,
        formatEndDate,
        color,
      };
    });

    await YearModel.insertMany(newMonthData);
  }
  const allMonthInYear = await YearModel.find({
    year: extractedYear,
    type: "month",
  });
  // Send the data back to the user
  res.status(200).json({ success: true, data: allMonthInYear });
});

const createNewMonthlyGoal = asyncWrapper(async (req, res) => {
  const { yearId, monthId, task } = req.body;
  if (!isValidObjectId(yearId) || !isValidObjectId(monthId)) {
    throw new Error("Id Not valid");
  }
  const newGoal = await GoalModel.create({ yearId, monthId, task });
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
  });
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
