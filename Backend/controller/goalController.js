const { asyncWrapper } = require("../middleware");
const GoalModel = require("../model/goalModel");
const { default: mongoose } = require("mongoose");
const {isValidObjectId} = require('../utils/validateFunction')

const updateGoal = asyncWrapper(async(req,res)=>{
    const {goalId,task,done,value} = req.body;
    if(!isValidObjectId(goalId)){
      throw new Error('Goal Id is invalid');
    }
    let updateGoadData = {};
    if(task){
      updateGoadData['task']=task;
    }
    if(done!==undefined){
      updateGoadData['done']=done;
    }
    if(value!==undefined){
      updateGoadData['value']=value;
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
    updateGoal,
    deleteGoal
  };