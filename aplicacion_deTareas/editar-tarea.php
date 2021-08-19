<?php

  include('bd.php');
/*   echo $_POST['nombre']; 
  echo $_POST['descripcion'];
  echo $_POST['id']; */
 if(isset($_POST['id'])) {
  $nombre = $_POST['nombre']; 
  $descripcion = $_POST['descripcion'];
  $id = $_POST['id'];
  $query = "UPDATE tareas SET nombre = '$nombre', descripcion = '$descripcion' WHERE id = '$id'";
  $result = mysqli_query($conexion, $query);

  if (!$result) {
    die('Query Failed.');
  }
  echo "la tarea se edito correctamente";  

} 

?>

