import { Express } from "express";
import { Mongoose } from "mongoose";

const app = express()
const port = 3001

mongoose.connect("mongodb+srv://School-It:Password12345@test-back-it.rv5t7.mongodb.net/myFirstDatabase?retryWrites=true&w=majority" ,
    {
        useNewUrlParser: true,
    })
.then(() => console.log('MongoDb ok'))
.catch(() => console.log('MongoDb error'))

const Note = new mongoose.Schema({
    noteText: {
        type: String,
        required: true,
    }
});

const NoteDB = mongoose.model('Notes', Note);

app.listen(port, () => {
    console.log(`Server starting on ${port}`)
})

app.post('/create-note', cors(), (req, res) => {
    console.log(req.body)
    NoteDB.create({
        noteText: req.body.noteText,
    })
        .then(user => res.send({status: 'ok'}))
        .catch(err => res.send(err));
})

app.get('/notes', (req, res) => {
    NoteDB.find()
        .then(notes => res.send({notes: notes}))
        .catch(err => res.send(err));
})
app.delete('/delete/:id', function(req, res) {
    console.log(req.params)
    const id = req.params.id;
    NoteDB.findOneAndDelete({_id: id}).then(res => {
        console.log(res)
    }).catch(err => {
        console.log(err)
    });
})


app.use(function (req,
    res,
    next) {
res.header("Access-Control-Allow-Origin", "*");
res.header("Access-Control-Allow-Methods", "GET, PUT, PATCH, POST, DELETE");
res.header("Access-Control-Allow-Headers", "Content-Type");
next();
})