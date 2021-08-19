<?php
include('bd.php');
if (null != ($id = $_POST['id'])) {
    $id = $_POST['id'];
    $query = "DELETE FROM tareas WHERE id = $id";
    $result = mysqli_query($conexion,$query);
    if (!$result) {
        die('query fallo');
    }
    echo "la tarea se elimino";
}

?>