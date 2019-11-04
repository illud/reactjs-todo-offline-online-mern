const app = require("express")();
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
var http = require('http').createServer(app);
var io = require('socket.io')(http);

var cors = require('cors')
//mongodb connect
mongoose.connect("mongodb://localhost/")

//var app = express();
app.use(cors())
//body parser
app.use(bodyParser.json({ limit: '100mb' }))
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }))
app.use(bodyParser.json({ type: "*/*" }));
app.set('json spaces', 4);

//models
const Reactodo = require('./models/todo_model')

io.on('connection', function(socket){
    console.log('a user connected');
    socket.on('disconnect', function(){
      console.log('user disconnected');
    });
  });
  
//var items = [];

app.get("/todos", (req, res) => {
    //res.send(items)

    Reactodo.find({}, (err, todos) =>{
        if(err) throw console.log("error")
        res.send({todos})
    })
})

app.post("/save", (req, res) => {
    /*var obj = {
        title: req.body.title,
        todo: req.body.todo,
        date: new Date().toLocaleString()
    }
    items.push(obj)*/

    let todo_save = new Reactodo()

    todo_save.title = req.body.title
    todo_save.todo = req.body.todo
    todo_save.date = new Date().toLocaleString()

    todo_save.save((err, save) => {
        if(err) throw console.log("error")
        res.send({message: "saved"})
        io.emit('saved', { message_io: 'Guardado!' });
    })
})

app.delete("/delete/:id", (req, res) => {
    Reactodo.findById(req.params.id, (err, deleteTodo) =>{
        if(err) throw console.log("error")
        deleteTodo.remove(err =>{
            if(err) throw console.log("error")
            res.send({message:"Eliminado!"})
        })
    })
})
http.listen(4000, () => {
    console.log("go")
})
