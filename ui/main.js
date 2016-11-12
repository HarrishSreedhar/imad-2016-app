var button=document.getElementById("counter");
/*button.onclick=function(){
var request=new XMLHttpRequest();
request.onreadystatechange=function(){
    if(request.readyState===XMLHttpRequest.DONE){
        if(request.status===200){
          //  alert('stat 200');
            var counter=request.responseText;
           // var cr=JSON.parse(counter);
         //  var cr="safsddsfs";
            var sp=document.getElementById("count");
        sp.innerHTML=counter.toString();
       // console.log(counter)
        }
    }
};
    request.open("GET","http://harrishsreedhar.imad.hasura-app.io/counter",true);
    request.send(null);
};*/
var sub=document.getElementById("submit_btn");

sub.onclick=function(){
    var request=new XMLHttpRequest();
    request.onreadystatechange=function(){
       if(request.readyState===XMLHttpRequest.DONE) {
           if(request.status===200){
              console.log("user looged in");alert("successfull");
           }else if(request.status===403){
               alert('incorrect');
           }
           else if(request.status===500)
           alert("went wrong on server");
       }
       
    };
     var name=document.getElementById("name").value;
     var pass=document.getElementById("pass").value;

     request.open("POST","http://harrishsreedhar.imad.hasura-app.io/login",true);
     request.setRequestHeader('Content-Type','application/json');
     request.send(JSON.stringify({name:name,pass:pass}));
};