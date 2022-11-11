const express = require('express');
const mongoose = require('mongoose');
const checkToken = require("../middlewares/checkToken")
const router = express.Router();
const todoSchema = require('../schemas/todoSchema');

const Todo = new mongoose.model('Todo', todoSchema);
// get all the todos

router.get('/',checkToken, async (req, res) => {
    try{
        const results= await Todo.find( ).select({_id:0,data:0});
          if(results.length > 0){

              res.status(200).json({
                  message:'Your todos are here',
                  results
              })
          
          }else{
            res.status(500).json({
                error: 'There was a server side error. data is empty',
            });
          }
    }catch (err) {
        res.status(500).json({
            error: 'There was a server side error',
        });
    }
});

// get a todo by id
router.get('/:id',checkToken, async (req, res) => {
    try{
      const result = await Todo.find({_id:req.params.id})
      res.status(200).json({
        message:'success',
        result
      })
    }catch(err){
        res.status(500).json({
            error: 'There was a server side error',
        });
    }
});
// post todo
router.post('/', async (req, res) => {
    try {
        console.log(req.body);
        const newTodo = new Todo(req.body);

        const result = await newTodo.save();

        res.status(200).json({
            message: 'Todo was inserted successfully',
            result,
        });
    } catch (err) {
        res.status(500).json({
            error: 'There was a server side error',
        });
    }
});
// post multiple todos
router.post('/all', async (req, res) => {
    try {
        const result = await Todo.insertMany(req.body);
        res.status(200).json({
            message: 'Todos were inserted successfully',
            result,
        });
    } catch (err) {
        res.status(500).json({
            error: 'There was a server side error',
        });
    }
});
// put todo
router.put('/:jkononame', async (req, res) => {
    // try {
    //     const result = await Todo.updateOne(
    //         { _id: req.params.id },
    //         {
    //             $set: {
    //                 status: 'active',
    //             },
    //         }
    //     );
    //     res.status(200).json({
    //         message: 'todo was updated successfully',
    //         result,
    //     });
    // } catch (err) {
    //     console.log(err);
    //     res.status(500).json({
    //         error: 'There was a server side error ',
    //     });
    // }
    try {
        const result = await Todo.findByIdAndUpdate(
            { _id: req.params.jkononame },
            {
                $set: {
                    status: 'inactive',
                },
            }
        );
        res.status(200).json({
            message: 'Todo has been updated successfully',
            result,
        });
    } catch (err) {
        res.status(500).json({
            error: 'There was a server side error',
        });
    }
});
// delete many
router.delete('/many', async (req, res) => {
    try {
        const result = await Todo.deleteMany({ title: { $ne: 'kono tile nai' } });
        res.status(200).json({
            message: 'Todos were Deleted successfully',
            result,
        });
    } catch {
        res.status(500).json({
            error: 'There was a server side error',
        });
    }
});
// delete todo
router.delete('/:id', async (req, res) => {
    try {
        const result = await Todo.findByIdAndDelete({ _id: req.params.id });
        res.status(200).json({
            message: 'Todo were Deleted successfully',
            result,
        });
    } catch (err) {
        res.status(500).json({
            error: 'There was a server side error',
        });
    }
});

module.exports = router;
