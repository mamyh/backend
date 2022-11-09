const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();
const todoSchema = require('../schemas/todoSchema');

const Todo = new mongoose.model('Todo', todoSchema);
// get all the todos

router.get('/', async (req, res) => {});

// get a todo by id
router.get('/:id', async (req, res) => {});
// post todo
router.post('/', async (req, res) => {
    const newTodo = new Todo(req.body);
    await newTodo.save((err) => {
        if (err) {
            res.status(500).json({
                error: 'There was a server side error',
            });
        } else {
            res.status(200).json({
                message: 'Todo was inserted successfully',
            });
        }
    });
});
// post multiple todos
router.post('/all', async (req, res) => {
    await Todo.insertMany(req.body, (err) => {
        if (err) {
            res.status(500).json({
                error: 'There was a server side error',
            });
        } else {
            res.status(200).json({
                message: 'Todos were inserted successfully',
            });
        }
    });
});
// put todo
router.put('/:id', async (req, res) => {
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
        const result = await Todo.findOneAndUpdate(
            { _id: req.params.id },
            {
                $set: {
                    status: 'inactive',
                },
            }
        );
        res.status(200).json({
            message: 'todo was updated successfully',
            result,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: 'There was a server side error ',
        });
    }
});
// delete todo
router.delete('/:id', async (req, res) => {});

module.exports = router;
