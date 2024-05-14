import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import bodyParser from 'body-parser';
import sqlite3 from "sqlite3"
import { request } from 'http';



const __dirname = dirname(fileURLToPath(import.meta.url));
const port = 8811;
const app = express();

// Serve static files from the "public" directory
app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {  // sign in / sing up page
    res.sendFile(join(__dirname, 'public', "Html", 'login.html'));  
    
});

app.get("/home",(req,res)=>{ // home page
    res.sendFile(join(__dirname, 'public','Html', 'index.html'));
})

app.get("/about",(req,res)=>{ // about page
    res.sendFile(join(__dirname, 'public','Html', 'about.html'));
})

app.get("/contact",(req,res)=>{ // contact page
    res.sendFile(join(__dirname, 'public','Html', 'contact.html'));
})
app.get("/forgetPass",(req,res)=>{ // forgot password page
    res.sendFile(join(__dirname, 'public','Html', 'forgetPass.html'));
})
app.get("/Services",(req,res)=>{ // services page
    res.sendFile(join(__dirname, 'public','Html', 'services.html'));
})


app.post("/signUp",(req,res)=>{
    console.log(req.body);
    console.log(req.body.emailup+" "+req.body.name+" "+req.body.passwordup,);
    insertData(req.body.emailup,req.body.name,req.body.passwordup,"Data.db");
    res.redirect("/")
})

app.post("/signIn",(req,res)=>{
    console.log(req.body);
    getUser(req.body.emailSignIn, req.body.passwordSignIn, "Data.db", (result) => {
        if (result) {
            res.redirect("/home");
        } else {
            res.redirect("/");
        }
    });   
})

app.post("/contact",(req,res)=>{
    console.log(req.body);
    insertDataRequests(req.body.Name,req.body.Phone,req.body.Email,req.body.Request,req.body.Massage,"Data.db")
    res.redirect("/home")
})

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);   
    // CraeteDataBase("DATA.db")
});


function CraeteDataBase(databaseName){
    
// var sql = "CREATE TABLE users(id INTEGER PRIMARY KEY,email TEXT,name TEXT,password TEXT)";
var sql = "CREATE TABLE requests(id INTEGER PRIMARY KEY,name TEXT,phone TEXT,email TEXT,request TEXT,massage TEXT)"

const db = new sqlite3.Database(`${databaseName}`,(err)=>{
    if(err) return console.error(err.message);
})

    db.run(sql);
}

function insertData(name,email,password,databaseName){
    const db = new sqlite3.Database(`${databaseName}`,(err)=>{
        if(err) return console.error(err.message);
    })
    
    var sql = ("INSERT INTO  users(name,email,password) VALUES(?,?,?)");
    db.run(sql,[email,name,password],(err)=>{
    if(err) return console.error(err.message);
    })

}

function insertDataRequests(name,phone,email,request_,massage,databaseName){
    const db = new sqlite3.Database(`${databaseName}`,(err)=>{
        if(err) return console.error(err.message);
    })
    
    var sql = ("INSERT INTO  requests(name,phone,email,request,massage) VALUES(?,?,?,?,?)");
    db.run(sql,[name,phone,email,request_,massage],(err)=>{
    if(err) return console.error(err.message);
    })

}


function getUser(email, password, databaseName, callback) {
    const db = new sqlite3.Database(`${databaseName}`, (err) => {
        if (err) {
            console.error(err.message);
            callback(false);
            return;
        }

        var sql = `SELECT * FROM users WHERE email = ? AND password = ?`;

        db.all(sql, [email, password], (err, rows) => {
            if (err) {
                console.error(err.message);
                callback(false);
                return;
            }

            console.log(rows);

            
            const userFound = rows.length > 0;

            
            db.close((err) => {
                if (err) {
                    console.error(err.message);
                }

                
                callback(userFound);
            });
        });
    });
}

