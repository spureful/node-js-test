const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Todo = require("./models/Todo");
const cors = require('cors');

const app = express()
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
app.use(cors());
async function start() {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/testBase', {
            useNewUrlParser: true,
            // useFindAndModify: false,
        });
       app.get('/todos', async(req, res) => {
            console.log('here');
            const todos = await Todo.find({});
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            res.header("Access-Control-Allow-Methods", "GET, POST");
            console.log('todos' ,{ todos });
            res.send(todos)
        });
        app.listen(3000, () => {
            console.log('server is started');
        })
       app.post('/todo', async(req, res) => {
                console.log('post')
                console.log(req.baseUrl);
                res.header("Access-Control-Allow-Origin", "*");
                res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
                res.header("Access-Control-Allow-Methods", "GET, POST");
                const todo = new Todo({
                    title: req.body.title
                })
                await todo.save();
                res.send(todo);
            });
        app.delete('/todo/:id', async function (request, response) {
            const todo = await Todo.deleteOne({_id: request.params.id});
            response.send(todo)
        })
    } catch(e) {
        console.log({ e });
    }
}

start();