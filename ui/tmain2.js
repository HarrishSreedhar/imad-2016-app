var j;
function addb()
{
	 var request = new XMLHttpRequest();
        
        // Capture the response and store it in a variable
        request.onreadystatechange = function () {
          if (request.readyState === XMLHttpRequest.DONE) {
              // Take some action
              if (request.status === 200) {
                 // alert('List created successfully');
                  //register.value = 'Registered!';
              } else {
                  //alert('Could not register the user');
                  //register.value = 'Register';
              }
          }
        };

     var data = document.getElementById('in').value;
      request.open('POST', '/clist', true);
        request.setRequestHeader('Content-Type', 'application/json');
//alert(data+' is stored in database');
       request.send(JSON.stringify({data:data}));  
     }


	/*	function del(k)
		{  alert("inside del");
		var table = document.getElementById("u"); 
		    var it = document.getElementsByTagName("li");
		  var s=it[k].innerText;
		  alert(s+"deleted");*/
			 /*var request = new XMLHttpRequest();
				
				// Capture the response and store it in a variable
				request.onreadystatechange = function () {
				  if (request.readyState === XMLHttpRequest.DONE) {
					  // Take some action
					  if (request.status === 200) {
						  //alert('User created successfully');
						  //register.value = 'Registered!';
					  } else {
						  //alert('Could not register the user');
						  //register.value = 'Register';
					  }
				  }
				};
				
			   
				
				request.open('GET', "/del-list?name="+i, true);
			
			}*/
		
		
			
		/*	 // Make the request---corresponding JS:
			 'DELETE from list where user_id= $1 and id = $2',  [req.session.auth.userId],[req.query.name], function (err, result) {
					if (err) {}
		}*/
}


var close = document.getElementsByClassName("close");
var i;
for (i = 0; i < close.length; i++) {
  close[i].onclick = function() {
     // var ul = document.getElementById("u");
var div = this.parentElement;
    div.style.display = "none";
 //del(i);
      
  };
 
}
/*  var ul = form.getElementsByTagName('u');
ul = ul && ul[0];
console.log(ul);*/






  function ele() {
     // static count = 1;
     //static $cou = 1;
     var u=document.getElementById("u");
     var v=u.childNodes.length; 
    var li = document.createElement("li");
    var inputValue = document.getElementById("in").value;
    var t = document.createTextNode(inputValue);
 
    li.appendChild(t);
    //ele.count++;
    if (inputValue === '') {
      alert("You must write something!");
    } else {
      
      document.getElementById("u").appendChild(li);
    }
    document.getElementById("in").value = "";
    var span = document.createElement("SPAN");
    var txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    li.appendChild(span);
   
    for (i = 0; i < close.length; i++) {
      close[i].onclick = function() {
           
        var div = this.parentElement;
        div.style.display = "none";
        alert('deleted');
       // del(j);
      };
   
         
    }
  }
       

