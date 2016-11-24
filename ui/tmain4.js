function lo(){

       
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
                  var o=JSON.parse(names);
                  

                    var ul = document.getElementById('u');
                    for(var i = 0;i < o.length;i++){
                         var li = document.createElement("li");
                          li.appendChild(document.createTextNode(i+1));
                           li.appendChild(document.createTextNode(")"));
                         li.appendChild(document.createTextNode(o[i].data));
var button = document.createElement("button");

li.setAttribute("id",i+1);
ul.appendChild(li);
//var t= s.substr(s.indexOf(")") + 1);
                        
                     //    list += '<li>' +  + '</li>';
                    }
                    
                   // ul.innerHTML = list;
                }
            }
        };
    
         //Render the variable in the correct span
       
        request.open('GET','http://harrishsreedhar.imad.hasura-app.io/view-list', true);
        request.send(null);
}

function del()
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
    var p=document.getElementById('in').value;
var r=document.getElementById(p).innerText;
var data= r.substr(r.indexOf(")") + 1);
alert(data);
      request.open('POST', '/dlist', true);
        request.setRequestHeader('Content-Type', 'application/json');
        alert(data+' is  deleted from database');// console.log(data);
       request.send(JSON.stringify({data:data}));  
     }
