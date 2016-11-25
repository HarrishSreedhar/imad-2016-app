function lo(){
 var request = new XMLHttpRequest();
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

                    }
                    
                 
                }
                 else  if(request.status === 502){
                    alert("No lists found!!...Add new lists");
                }
            }
        };
    
        
       
        request.open('GET','http://harrishsreedhar.imad.hasura-app.io/view-list', true);
        request.send(null);
}



