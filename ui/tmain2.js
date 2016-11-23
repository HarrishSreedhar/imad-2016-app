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
       // request.open('POST', '/clist/', true);
     var data = document.getElementById('in').value;
      request.open('POST', '/clist', true);
        request.setRequestHeader('Content-Type', 'application/json');
        alert(data+' is stored in database');// console.log(data);
       request.send(JSON.stringify({data:data}));  
     }


		function del()
		{  alert("inside del");
		    var it = document.getElementsByTagName("li");
		  var s=it[i].value;
		  // alert(s+"deleted");
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
		
			}
			
		/*	 // Make the request---corresponding JS:
			 'DELETE from list where user_id= $1 and id = $2',  [req.session.auth.userId],[req.query.name], function (err, result) {
					if (err) {}
		}*/



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





// Create a new list item when clicking on the "Add" button
  function ele() {
     // static count = 1;
     //static $cou = 1;
     var u=document.getElementById("u");
     var v=u.childNodes.length; 
    var li = document.createElement("li");
    var inputValue = document.getElementById("in").value;
    var t = document.createTextNode(inputValue);
  //var num=document.createTextNode(v+"");
    // var br=document.createTextNode(")  ");
    
  //  li.appendChild(num);
   // li.appendChild(br);
    li.appendChild(t);
    //ele.count++;
    if (inputValue === '') {
      alert("You must write something!");
    } else {
      
      document.getElementById("u").appendChild(li);
    }
    document.getElementById("in").value = "";
    
   /* var button = document.createElement("button");
button.innerHTML = "Delete";
li.appendChild(button);*/

    

    var span = document.createElement("SPAN");
    var txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    li.appendChild(span);
   
    for (i = 0; i < close.length; i++) {
      close[i].onclick = function() {
           j=i;
        var div = this.parentElement;
        div.style.display = "none";
        alert('deleted');
        del(j);
      };
   
         
    }
  }
  function loadLogin() {
      username=req.query.uid;
    var loginArea = document.getElementById('login_area');
    loginArea.innerHTML = `
        <h3> Hi <i>${username}</i></h3>
        `;
}
/*function lo(){

       
        //Create a request object
        var request = new XMLHttpRequest();
    
        //Capture the response and store it in a variable
        request.onreadystatechange = function()
        {
            if(request.readyState === XMLHttpRequest.DONE)
            {
                //Take some action
                if(request.status === 200)
                {
                    var names = request.responseText;
                   names=JSON.getString.data;
                    var list = '';
                    for(var i = 0;i < names.length;i++){
                        
                         list += '<li>' + names[i] + '</li>';
                    }
                    var ul = document.getElementById('l');
                    ul.innerHTML = list;
                }
            }
        };
    
         //Render the variable in the correct span
       
        request.open('GET','http://harrishsreedhar.imad.hasura-app.io/view-list', true);
        request.send(null);
};
}*/
loadLogin();
