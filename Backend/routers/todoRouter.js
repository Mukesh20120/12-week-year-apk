const router = require('express').Router();
const {getAllTodo,deleteTodo,updateTodo,createNewTodo} = require('../controller/todoController')

router.route('/').get(getAllTodo).post(createNewTodo);
router.route('/:id').delete(deleteTodo).put(updateTodo);


module.exports = router;