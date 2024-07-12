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
  });

  if (yearsCountInYear === 0) {
    // If not found, generate the 4 blocks of 12 weeks
    const newYearData = getAllYear(extractedYear).map((singleYearBlock) => {
      const {
        yearNumber,
        type,
        startDate,
        endDate,
        formatStartDate,
        formatEndDate,
        color,
      } = singleYearBlock;
      return {
        yearNumber,
        type,
        year: extractedYear,
        startDate,
        endDate,
        formatStartDate,
        formatEndDate,
        color,
        goal: [],
      };
    });

    await YearModel.insertMany(newYearData);
  }
  const allYearInYear = await YearModel.find({ year: extractedYear });
  // Send the data back to the user
  res.status(200).json({ success: true, data: allYearInYear });
});

const createNewYearlyGoal = asyncWrapper(async(req,res)=>{
  const {yearId,task} = req.body;
  if(!yearId || !mongoose.isValidObjectId(yearId)){
    throw new Error('Year Id Not found')
  }
  const newGoal = await GoalModel.create({yearId,task});
  res.json({success: true,message: 'New goal created Successfully',newGoal});
})
const getAllYearlyGoal = asyncWrapper(async(req,res)=>{
  const {yearId} = req.query;
  if(!yearId || !mongoose.isValidObjectId(yearId)){
    throw new Error('Year Id Not found')
  }
  const allGoal = await GoalModel.find({yearId});
  res.json({success: true,message: 'New goal created Successfully',allGoal});
})

const updateGoal = asyncWrapper(async(req,res)=>{
  const {goalId,task,done} = req.body;
  if(!goalId || !mongoose.isValidObjectId(goalId)){
    throw new Error('Goal Id is invalid');
  }
  let updateGoadData = {};
  if(task){
    updateGoadData['task']=task;
  }
  if(done!==undefined){
    updateGoadData['done']=done;
  }
  const newUpdatedGoal = await GoalModel.findByIdAndUpdate(goalId,updateGoadData,{new: true});
  res.json({success: true,message: 'Goal updated Successfully',newUpdatedGoal});
})
const deleteGoal = asyncWrapper(async(req,res)=>{
  const {goalId} = req.query;
  if(!goalId || !mongoose.isValidObjectId(goalId)){
    throw new Error('Goal Id is invalid')
  }
  await GoalModel.findByIdAndDelete(goalId);
  res.json({success: true,message: 'Delete goal Successfully'});
})

module.exports = {
  getYearList,
  createNewYearlyGoal,
  getAllYearlyGoal,
  updateGoal,
  deleteGoal
};
