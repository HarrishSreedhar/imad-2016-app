function addl()
{
	 var request = new XMLHttpRequest();
        
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
        
       var l = document.getElementById('in').value;
        request.open('POST', '/create-list/', true);
        request.setRequestHeader('Content-Type', 'application/json');
        request.send(JSON.stringify({l:l}));  
        submit.value = 'Submitting...';
        
    
    }


var close = document.getElementsByClassName("close");
var i;
for (i = 0; i < close.length; i++) {
  close[i].onclick = function() {
    var div = this.parentElement;
    div.style.display = "none";
  }
}

// Add a "checked" symbol when clicking on a list item
var list = document.querySelector('ul');
list.addEventListener('click', function(ev) {
  if (ev.target.tagName === 'LI') {
    ev.target.classList.toggle('.checked');
  }
}, false);

// Create a new list item when clicking on the "Add" button
  function ele() {
     // static count = 1;
     //static $cou = 1;
     var u=document.getElementById("u");
     var v=u.childNodes.length; 
    var li = document.createElement("li");
    var inputValue = document.getElementById("in").value;
    var t = document.createTextNode(inputValue);
  var num=document.createTextNode(v+"");
     var br=document.createTextNode(")  ");
     addl();
    li.appendChild(num);
    li.appendChild(br);
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
      }
    }
  }