<?php
include('bd.php');
// el metodo ajax me esta enviando una peticion por POST
$search2 = $_POST['search'];
if (!empty($search2)) {
    $consulta = "SELECT * FROM tareas WHERE nombre LIKE '$search2%' ";
    $resultado=mysqli_query($conexion,$consulta);
    if (!$resultado) {
        die('error de consulta'.mysqli_error($conexion));
    }
    // si se obtubo un resultado lo convierto en JSON para regresarlo al front end
    $json= array();
    while($fila=mysqli_fetch_array($resultado)){
        $json[]= array(
            'nombre'=> $fila['nombre'],
            'descripcion'=> $fila['descripcion'],
            'id'=> $fila['id'],

        );

    }
// funcion para codificarlo a json
    $jsonstring = json_encode($json);
    echo $jsonstring;
}



?>