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
     
/*    // function addl(){
 var register = document.getElementById('a');
   register.onclick = function () {
        // Create a request object
        var request = new XMLHttpRequest();
        
        // Capture the response and store it in a variable
        request.onreadystatechange = function () {
          if (request.readyState === XMLHttpRequest.DONE) {
              // Take some action
              if (request.status === 200) {
                  alert('User created successfully');
                  register.value = 'added!';
              } else {
                  alert('Could not register the user');
                  register.value = 'add';
              }
          }
        };
        
        // Make the request
        var li = document.getElementById('in').value;
        //var password = document.getElementById('password').value;
      //  console.log(username);
        console.log(li);
        request.open('POST', '/clist/', true);
        request.setRequestHeader('Content-Type', 'application/json');
        request.send(JSON.stringify({li:li}));  
       // register.value = 'Registering...';
    
    };*/




var close = document.getElementsByClassName("close");
var i;
for (i = 0; i < close.length; i++) {
  close[i].onclick = function() {
    var div = this.parentElement;
    div.style.display = "none";
  };
}

/*// Add a "checked" symbol when clicking on a list item
var list = document.querySelector('ul');
list.addEventListener('click', function(ev) {
  if (ev.target.tagName === 'LI') {
    ev.target.classList.toggle('.checked');
  }
}, false);*/

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

    var span = document.createElement("SPAN");
    var txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    li.appendChild(span);

    for (i = 0; i < close.length; i++) {
      close[i].onclick = function() {
        var div = this.parentElement;
        div.style.display = "none";
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
function lo(){
var submit = document.getElementById('vi');
submit.onclick = function() {
        
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
                    names = JSON.parse(names);
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
}
loadLogin();
