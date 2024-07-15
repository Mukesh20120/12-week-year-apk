const { asyncWrapper } = require("../middleware");
const { getAllYear } = require("../utils/generateFunctions");
const YearModel = require("../model/years");
const GoalModel = require("../model/goalModel");
const { default: mongoose } = require("mongoose");
const pattern = /^\d+$/;

const getYearList = asyncWrapper(async (req, res) => {
  let { inputYear } = req.query;

  if (!inputYear || !pattern.test(inputYear)) {
    inputYear = new Date().getFullYear();
  }

  const extractedYear = parseInt(inputYear, 10);

  const yearsCountInYear = await YearModel.countDocuments({
    year: extractedYear,
    $or: [{type: 'year',type: 'break'}]
  });

  if (yearsCountInYear === 0) {
    // If not found, generate the 4 blocks of 12 weeks
    const newYearData = getAllYear(extractedYear).map((singleYearBlock) => {
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

    await YearModel.insertMany(newYearData);
  }
  const allYearInYear = await YearModel.find({ year: extractedYear,$or: [
    { type: 'year' },
    { type: 'break' }
  ]}).sort('startDate');
  // Send the data back to the user
  res.status(200).json({ success: true, data: allYearInYear });
});

const createNewYearlyGoal = asyncWrapper(async(req,res)=>{
  const {yearId,task,value} = req.body;
  if(!yearId || !mongoose.isValidObjectId(yearId)){
    throw new Error('Year Id Not found')
  }
  const newGoal = await GoalModel.create({yearId,task,value});
  res.json({success: true,message: 'New goal created Successfully',newGoal});
})
const getAllYearlyGoal = asyncWrapper(async(req,res)=>{
  const {yearId} = req.query;
  if(!yearId || !mongoose.isValidObjectId(yearId)){
    throw new Error('Year Id Not found')
  }
  const allGoal = await GoalModel.find({
    yearId: { $eq: yearId, $exists: true },
    monthId: { $exists: false }
  }).sort({value: -1});
  res.json({success: true,message: 'list of goal fetch Successfully',allGoal});
})


module.exports = {
  getYearList,
  createNewYearlyGoal,
  getAllYearlyGoal,
};
