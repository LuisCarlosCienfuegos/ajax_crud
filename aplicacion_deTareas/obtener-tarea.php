<?php

include('bd.php');

    $id = $_POST['id'];
    $query = "SELECT * FROM tareas WHERE id = $id";
    $result = mysqli_query($conexion,$query);
    if (!$result) {
        die('query fallo');
    }
    //transformar a json
    $json= array();
    while ($row= mysqli_fetch_array($result)) {
      $json[]  = array(
        'nombre' => $row['nombre'],
        'descripcion'=> $row['descripcion'],
        'id' => $row['id']
      );}
      //solo se necesita el primer arreglo
      $jsonString=json_encode($json[0]);
      echo $jsonString;

?>