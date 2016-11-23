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
                   names=JSON.getString.data;
                    var list = '';
                    for(var i = 0;i < names.length;i++){
                        
                         list += '<li>' + names[i] + '</li>';
                    }
                    var ul = document.getElementById('u');
                    ul.innerHTML = list;
                }
            }
        };
    
         //Render the variable in the correct span
       
        request.open('GET','http://harrishsreedhar.imad.hasura-app.io/view-list', true);
        request.send(null);
};
