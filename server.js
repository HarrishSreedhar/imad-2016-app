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
var app = express();
app.use(morgan('combined'));


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
  res.sendFile(path.join(__dirname,'to1.html'));
});
//app.get('/article-one',function(req,res){
//res.sendFile(path.join(__dirname,'article-one.html')); 
//});
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
