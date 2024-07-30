const { asyncWrapper } = require("../middleware");
const { getDatesBetween } = require("../utils/generateFunctions");
const YearModel = require("../model/years");
const dayModel = require("../model/dayModel");
const GoalModel = require("../model/goalModel");
const { isValidObjectId } = require("../utils/validateFunction");
const pattern = /^\d+$/;

const getDaysList = asyncWrapper(async (req, res) => {
  let { startDate, endDate, monthId, yearId } = req.query;

  const daysCount = await dayModel.countDocuments({
    yearId: { $eq: yearId, $exists: true },
    monthId: { $eq: monthId, $exists: true },
  });

  if (daysCount === 0) {
    // If not found, generate the 4 blocks of 12 weeks
    const newMonthData = getDatesBetween(startDate, endDate).map(
      (singleYearBlock) => {
        const { blockNumber, date, formatDate, day, color } = singleYearBlock;
        return {
          blockNumber,
          date,
          formatDate,
          day,
          color,
          yearId,
          monthId,
        };
      }
    );
    await dayModel.insertMany(newMonthData);
  }
  const allMonthInYear = await dayModel.find({
    yearId: {$eq: yearId,$exists: true},
    monthId: {$eq: monthId,$exists: true},
  });
  // Send the data back to the user
  res.status(200).json({ success: true, data: allMonthInYear });
});

const createDailyGoal = asyncWrapper(async (req, res) => {
  const {id: userId} = req.decode;
  const { dayId,yearId,monthId, task,value } = req.body;
  if (!isValidObjectId(dayId) || !isValidObjectId(yearId) || !isValidObjectId(monthId)) {
    throw new Error("Id Not valid");
  }
  const newGoal = await GoalModel.create({ yearId, monthId, dayId, task,value,userId });
  res.json({
    success: true,
    message: "New goal created Successfully",
    newGoal,
  });
});
const getCurrentDayGoals = asyncWrapper(async (req, res) => {
  const {id: userId} = req.decode;
  const { dayId,yearId,monthId } = req.query;
  if (!isValidObjectId(dayId)) {
    throw new Error("Id Not valid");
  }
  const allGoal = await GoalModel.find({
    dayId: { $eq: dayId, $exists: true },
    monthId: { $eq: monthId, $exists: true },
    yearId: { $eq: yearId, $exists: true },
    userId: { $eq: userId, $exists: true },
  });
  res.json({
    success: true,
    message: "list of all goal fetch Successfully",
    allGoal,
  });
});

module.exports = {
  getDaysList,
  createDailyGoal,
  getCurrentDayGoals,
};
