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




app.get('/submit-name/',function(req,res){//URL:?name
    var name=req.query.name;
    names.push(name);
    res.send(JSON.stringify(names));    
    
});
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname,'to1.html'));
});
 app.get('/list', function (req, res) {
      na=req.query.uid;
  res.sendFile(path.join(__dirname,'t2.html')); 
});
app.get('/ui/tmain.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'tmain.js'));
});

function hash (input, salt) {
    // How do we create a hash?
    var hashed = crypto.pbkdf2Sync(input, salt, 10000, 512, 'sha512');
    return ["pbkdf2", "10000", salt, hashed.toString('hex')].join('$');
}


app.get('/hash/:input', function(req, res) {
   var hashedString = hash(req.params.input, 'this-is-some-random-string');
   res.send(hashedString);
});

app.post('/create-user', function (req, res) {
   
   na=req.body.username;
   var username = req.body.username;
   var password = req.body.password;
   var salt = crypto.randomBytes(128).toString('hex');
   var dbString = hash(password, salt);
   pool.query('INSERT INTO tuser (username, password) VALUES ($1, $2)', [username, dbString], function (err, result) {
      if (err) {
          res.status(500).send('Try another username');
      } else {
          res.send('User successfully created: ' + username);
      }
   });
});
app.post('/clist', function (req, res) {
   // username, password
   // {"username": "tanmai", "password": "password"}
   // JSON
   var li = req.body.data;var uname;
  /* pool.query('SELECT * FROM tuser WHERE id = $1', [req.session.auth.userId], function (err, result) {
           if (err) {
              res.status(500).send(err.toString());
           } else {
             uname=result.rows[0].username;    
           }
       });*/
      pool.query('INSERT INTO list (data) where id=($1) VALUES ($2)', [req.session.auth.userId,li], function (err, result) {
      // pool.query('INSERT INTO new (data) VALUES ($1)', [li], function (err, result) {
      if (err) {
          res.status(500).send(err.toString());
      } else {
          res.status(502).send('List successfully created:');
      }
   });
});


app.get('/ui/:fileName', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', req.params.fileName));
});



var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
