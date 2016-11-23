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
                         li.appendChild(document.createTextNode(o[i].data));
var button = document.createElement("button");
button.innerHTML = "delete";
li.append("  ");
li.append("  ");
li.append("  ");
li.appendChild(button);
li.setAttribute("id",i);
ul.appendChild(li);
                        
                     //    list += '<li>' +  + '</li>';
                    }
                    
                   // ul.innerHTML = list;
                }
            }
        };
    
         //Render the variable in the correct span
       
        request.open('GET','http://harrishsreedhar.imad.hasura-app.io/view-list', true);
        request.send(null);
};
