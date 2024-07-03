const { notFoundError } = require("../error");
const { asyncWrapper } = require("../middleware");
const todoModel = require("../model/todoModel");
const Todo = require('../model/todoModel');

const getAllTodo = asyncWrapper(async(req,res)=>{
    const getList = await todoModel.find({});
    res.json({status: true,message: 'List fetch successfully','Todo List': getList});
})

const createNewTodo = asyncWrapper(async(req,res)=>{
    const {task} = req.body;
    if(!task)
        throw new notFoundError("please provide require data");
    const newTodo = await todoModel.create({task});
    res.json({status: true,message: 'New todo created successfully',todo: newTodo});
})
const updateTodo = asyncWrapper(async(req,res)=>{
    const {id} = req.params;
    const {task,done} = req.body;
    let upTodo = {};
    if (task !== undefined)
        upTodo.task = task;
    if (done !== undefined)
        upTodo.done = done;
    if (!id || (task === undefined && done === undefined))
        throw new notFoundError("Please provide the required data");
    const updated = await todoModel.findByIdAndUpdate(id,upTodo,{new: true});
    res.json({status: true,message: 'update todo successfully',todo: updated});
})

const deleteTodo = asyncWrapper(async(req,res)=>{
    const {id} = req.params;
    if(!id)
        throw new notFoundError('please provide the require data');
    await todoModel.findByIdAndDelete(id);
    res.json({status: true,message: 'todo delete successfully'});
})

module.exports = {getAllTodo,createNewTodo,updateTodo,deleteTodo};