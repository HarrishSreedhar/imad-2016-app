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

function ch () {
    // Check if the user is already logged in
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (request.readyState === XMLHttpRequest.DONE) {
            if (request.status === 200) {
               // loadLoggedInUser(this.responseText);
            } else {
               // loadLoginForm();
            }
        }
    };
    
    request.open('GET', '/check-login', true);
    request.send(null);
}

