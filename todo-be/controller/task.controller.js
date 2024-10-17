const Task = require("../model/Task");

const taskController = {}

taskController.createTask = async(req, res) => {
    try {
        const {task, isComplete} = req.body;
        const newTask = new Task({task, isComplete})
        await newTask.save();
        res.status(200).json({status: 'ok', data: newTask})
    } catch(err){
        res.status(400).json({status: 'fail', error: err})
    }
}
taskController.getTask = async(req, res) => {
    try {
        const taskList = await Task.find({}).select("-__v")
        res.status(200).json({status: 'ok', data: taskList})
    } catch(err){
        res.status(400).json({status: 'fail', error: err})
    }
}
taskController.updateTask = async(req, res) => {
    try {
        const { id } = req.params; // URL에서 ID를 가져옵니다.
        const { task, isComplete } = req.body;
        const updateList = await Task.findByIdAndUpdate(id, { task, isComplete }, { new: true, runValidators: true });
        
        if (!updateList) {
            return res.status(404).json({ status: 'fail', error: 'Task not found' });
        }
        res.status(200).json({status: 'ok', data: updateList})
    } catch(err){
        res.status(400).json({status: 'fail', error: err})
    }
}
taskController.deleteTask = async(req, res) => {
    try {
        const { id } = req.params; // URL에서 ID를 가져옵니다.
        const deleteList = await Task.findByIdAndDelete(id);
        
        
        if (!deleteList) {
            return res.status(404).json({ status: 'fail', error: 'Task not found' });
        }
        res.status(200).json({status: 'ok', data: deleteList})
    } catch(err){
        res.status(400).json({status: 'fail', error: err})
    }
}

module.exports = taskController;