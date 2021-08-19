<?php 
include('bd.php');
$query = "SELECT * FROM tareas";
$resultado= mysqli_query($conexion,$query);

if (!$resultado) {
    die('fallo el query'. mysqli_error($conexion));
}

//se concierte a json
$json = array();
while($fila=mysqli_fetch_array($resultado)){
    $json[]= array(
        'nombre'=> $fila['nombre'],
        'descripcion'=> $fila['descripcion'],
        'id'=> $fila['id']
    );
}
$jsonString= json_encode($json);
echo $jsonString;

?>