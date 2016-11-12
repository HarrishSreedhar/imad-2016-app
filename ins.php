<?php
 $database="harrishsreedhar"; //database name
 $first=$_POST["first"];//this values comes from html file after submitting 
 
     $con = mysqli_connect("localhost:5432","harrishsreedhar" ,"harrishsreedhar", $database);//for wamp 3rd feild is balnk
     if (!$con)
     {
     die('Could not connect: ' . mysqli_error());
     }

//mysql_select_db("$database", $con);
    $query = "INSERT INTO data VALUES ('$first')";
 mysqli_query($con,$query);
 
 echo "alert('inserted!!');\n";

 


 mysqli_close($con);
 ?>
