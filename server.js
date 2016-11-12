var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool
var config={
    user: 'harrishsreedhar',
    database:'harrishsreedhar',
    host:'db.imad.hasura-app.io',
    port:'5432',
  password:process.env.DB_PASSWORD  
};
var mysql = require('mysql');
var conn = mysql.createConnection({
    user: 'harrishsreedhar',
    database:'harrishsreedhar',
    host:'db.imad.hasura-app.io',
    port:'5432',
  password:process.env.DB_PASSWORD 
});
var crypto=require('crypto');
var app = express();
app.use(morgan('combined'));
function createtemplate(data){
    var title=data.title;
    var heading=data.heading;
    var date=data.date;
    var content=data.content;
var htmltemplate=`<html>
    <head>
     <link rel="stylesheet" type="text/css" href="/ui/style.css">
        <title>${title}</title>
        <meta name="viewport" content="width-device-width, initial scale=1" />

    </head>
    <body>
        <div class="container">
       <div>
          <h3>
           ${heading}<hr>
        </h3>
    </div>
        <div>
            <h2>
        ${date.toDateString()}
         </h2>
         </div>   
      ${content}
            
        </p>
        </div>
    </body>
</html>`
;
return htmltemplate;    

}
var pool = new Pool(config);
app.get('/test',function(req,res){
   pool.query("SELECT * FROM test",function(err,result){
       if(err){
           res.status(500).send(err.toString());
           
       }else{
           res.send(JSON.stringify(result.rows));
       }
   });   
});
function hash(input,salt){
    var has=crypto.pbkdf2Sync(input,salt,10000,512,'sha512');
    return has.toString('hex');
}
app.get('/enter-data',function(req,res,next){
    res.sendFile('ar1.html');
});
app.post('/create',function(req,res){
    console.log('req.body');
console.log(req.body);
res.write('You sent the name "' + req.body.first+'".\n');
res.end();
    var sql = "INSERT INTO Test VALUES ?";
var values =req.body.first;
conn.query(sql, values, function(err) {
    if (err) throw err;
    conn.end();
});
});
 

app.get('/hash/:input',function(req,res){
    var has=hash(req.params.input,'this-is-some-random-string');
    res.send(has);  
});


var counter=0;
app.get('/counter',function(req,res){
   counter+=1;
   res.send(counter.toString());
});
app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});
var names=[];
app.get('/submit-name/',function(req,res){//URL:?name
    var name=req.query.name;
    names.push(name);
    res.send(JSON.stringify(names));    
    
});
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});
//app.get('/article-one',function(req,res){
//res.sendFile(path.join(__dirname,'article-one.html')); 
//});
app.get('/ar1',function(req,res){
res.sendFile(path.join(__dirname,'ar1.html'));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});
app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});

/*app.post('/create', function(req, res) {
  //  var objBD = BD();
var pool = new Pool(config);
    var post = {
        first: 1
              };
              pool.query ("INSERT INTO data ?", post, function(err, result) {
                   if(err)
         res.status(500).send(err.toString());
                   
 
});
console.log(query.sql);

});*/
/*var mysql = mysql.createConnection({
host: HOST,
port: PORT,
user: MYSQL_USER,
password: MYSQL_PASS,
});
app.get('/home',function(req,res,next){
res.sendfile('views/forms.html');
});
app.post('/create', function(req, res) {
console.log('req.body');
console.log(req.body);
res.write('You sent the name "' + req.body.first+'".\n');
    
res.end()

mysql.query("Insert into "+TABLE+" (name,email,city,pincode) VALUES ('"+req.body.name+"','"+req.body.email+"','"+req.body.city+"','"+req.body.pincode+"')",function(err, result)      
{                                                      
  if (err)
     throw err;
});
});

app.get('/articles/:articleName',function(req,res){

// pool.query("SELECT * FROM articles where title= '"+req.params.articleName+"'",function(err,result){
  pool.query("SELECT * FROM articles where title=$1",[req.params.articleName],function(err,result){
     if(err){
         res.status(500).send(err.toString());
     } else { 
         if(result.rows.length===0)
     {
         res.status(404).send('Article not found');
     } else
     {
         var articleData=result.rows[0];
           res.send(createtemplate(articleData));
     }
     }
 });
  
});*/
