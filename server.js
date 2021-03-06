var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;
var crypto = require('crypto');
var bodyParser = require('body-parser');
var session = require('express-session');
var na;
var config={
    user: 'harrishsreedhar',
    database:'harrishsreedhar',
    host:'db.imad.hasura-app.io',
    port:'5432',
  password:process.env.DB_PASSWORD  
};
var app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(session({
    secret: 'someRandomSecretValue',
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 30}
}));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname,'t1.html'));
});
 app.get('/list', function (req, res) {
 
  res.sendFile(path.join(__dirname,'t2.html'));
 });
  app.get('/list3', function (req, res) {

  res.sendFile(path.join(__dirname,'t3.html')); 
});
 app.get('/list4', function (req, res) {

  res.sendFile(path.join(__dirname,'t4.html')); 
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
       if(username==="" ||password===""){
       res.status(502).send("Fields cant be empty");
                   }
      else if (err) {
          res.status(500).send('Try another username');
      } else {
          res.status(200).send('User successfully created: ' + username);
      }
   });
  /* pool.query('INSERT INTO list (id) VALUES ($1)', [req.session.auth.userId], function (err, result) {
         if (err) {
          res.status(500).send('name exists');
      } else {
          res.send('User id in DB: ');
      }
});*/
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
      pool.query('INSERT INTO list (id,data)  VALUES ($1,$2)', [req.session.auth.userId,li], function (err, result) {
      // pool.query('INSERT INTO new (data) VALUES ($1)', [li], function (err, result) {
      if (err) {
          res.status(500).send(err.toString());
      } else {
          res.status(502).send('List successfully created:');
      }
   });
});

app.post('/dlist', function (req, res) {
   // username, password
   // {"username": "tanmai", "password": "password"}
   // JSON
   var li = req.body.data;

      pool.query('DELETE from list where id=$1 and data=$2', [req.session.auth.userId,li], function (err, result) {
      // pool.query('INSERT INTO new (data) VALUES ($1)', [li], function (err, result) {
      if (err) {
          res.status(500).send(err.toString());
      } else {
          res.status(502).send('List deleted successfully');
      }
   });
});
app.post('/login', function (req, res) {
   var username = req.body.username;
   var password = req.body.password;
   
   pool.query('SELECT * FROM tuser WHERE username = $1', [username], function (err, result) {
      if (err) {
          res.status(500).send(err.toString());
      } else {
          if (result.rows.length === 0) {
              res.status(403).send('username/password is invalid');
          } else {
              // Match the password
              var dbString = result.rows[0].password;
              var salt = dbString.split('$')[2];
              var hashedPassword = hash(password, salt); // Creating a hash based on the password submitted and the original salt
              if (hashedPassword === dbString) {
                
                // Set the session
                req.session.auth = {userId: result.rows[0].id};
                // set cookie with a session id
                // internally, on the server side, it maps the session id to an object
                // { auth: {userId }}
                
                res.send('credentials correct!');
                
              } else {
                res.status(403).send('username/password is invalid');
              }
          }
      }
   });
});

app.get('/check-login', function (req, res) {
   if (req.session && req.session.auth && req.session.auth.userId) {
       // Load the user object
       pool.query('SELECT * FROM tuser WHERE id = $1', [req.session.auth.userId], function (err, result) {
           if (err) {
              res.status(500).send(err.toString());
           } else { na=result.rows[0].username;
              res.send(result.rows[0].username);    
           }
       });
   } else {
       res.status(400).send('You are not logged in');
   }
});

app.get('/logout', function (req, res) {
   delete req.session.auth;
   res.send('<html><body>Logged out!<br/><br/><a href="/">Back to home</a></body></html>');
});
var pool = new Pool(config);
app.get('/view-list', function (req, res) {
  // SELECT * FROM article WHERE title = '\'; DELETE WHERE a = \'asdf'
  pool.query("SELECT data FROM list WHERE id = $1",  [req.session.auth.userId], function (err, result) {
    if (err) {
        res.status(500).send(err.toString());
    } else {
        if (result.rows.length === 0) {
            res.status(502).send('No Lists found');
        } else {
            var a= result.rows;
            res.send(JSON.stringify(a));
        }
    }
  });
});


app.post('/del-list', function (req, res) {
   // username, password
   // {"username": "tanmai", "password": "password"}
   // JSON
   var li = req.body.data;var uname;
  
});
app.get('/ui/:fileName', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', req.params.fileName));
});



var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
