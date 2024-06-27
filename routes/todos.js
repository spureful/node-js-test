const { Router } = require('express');
const Todo = require('../models/Todo');

const router = Router();
router.get('/todos', async(req, res) => {
    console.log(req.baseUrl);
    const todos = await Todo.find({});
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST");
    console.log('todos' ,{ req });
    res.send(todos)
})

router.post('/todo', async(req, res) => {
    console.log('post')
    console.log(req.baseUrl);
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST");
    const todo = new Todo({
        title: req.body.title
    })
    await todo.save();
})
// router.get('/', async(req, res) => {
//     const todos = await Todo.find({});
//     res.render('index', {
//         title: 'Todos list',
//         todos
//     });
// })
// router.get('/create', (req, res) => {
//     res.render('create', {
//         title: 'Create todo'
//     });
// })

// router.post('/create', async(req, res) => {
//  const todo = new Todo({
//      title: req.body.title
//  })
//     await todo.save();
//     res.redirect('/')
// })

module.exports = router;