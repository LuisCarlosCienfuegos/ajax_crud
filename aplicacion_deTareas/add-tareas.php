<?php
include('bd.php');
// valida si se esta enviando un dato 
if (isset($_POST['nombre'])) {
    $nombre = $_POST['nombre'];
    $descripcion = $_POST['descripcion'];
    $query = "INSERT INTO tareas (nombre,descripcion)   VALUES ('$nombre','$descripcion') ;";
    $resultado= mysqli_query($conexion,$query);
    if (!$resultado) {
        die('el query fallo');
    }
    echo "la tarea se agrego";
}

?>