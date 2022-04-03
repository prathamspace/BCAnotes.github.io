var express =require("express")
var bodyParser =require("body-parser")
var mongoose =require("mongoose")

const app =express()

app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended:true
}))


mongoose.connect('mongodb://localhost:27017/sharingan');
var db= mongoose.connection;
db.on('error',()=>console.log('Error!! Detected in DB'));
db.once('open',()=>console.log('Connection is established to te DB'));


app.post("/signup",(req,res)=>{
    var name= req.body.name;
    var email= req.body.email;

    var data = {
       "name":name,
       "email":email,
    }

    db.collection('Community').insertOne(data,(err,collection)=>{
        if (err) {
            throw err;
        }
        console.log('Record is inserted');
        
    });
    return res.redirect('success.html')

    })


app.get("/",(req,res)=>{
    res.set({
        "ALLow-access-ALLow-Origin":"*"
    })

    return res.redirect('index.html');
}).listen(3000);

console.log("listening to the server...");