$(document).ready(function(){
    let BanderaEditar= false;
    console.log('jquery esta funcionando');
    $('#resultados-tareas').hide();
    obtenerTarea();
    
 //--------funcion para consultas
$('#search').keyup(function () { 
    //valida que no de error en consola si el dato de buscador es vacio
    if ($('#search').val()) {
        let search=$('#search').val();
        $.ajax({
            url: "buscador-tareas.php",
            type: "POST",
            data: {search},
            success: function (response) {
                //toma un json string y lo vuelve e aconvertir en formato json
                let tareas=JSON.parse(response);
                console.log(tareas);
                //console.log(response);
    
                //-------para mostrar la plantilla en pantalla
                let template = '';
                //-------para poder recorrer el arreglo y asi muestre tosdos los resultados 
                $.each (tareas,function(clave,aux ){
                    console.log(aux);
                    template += `
                    <li> 
                    ${aux.nombre}--${aux.descripcion}
                    </li>
                    `
                });
                //aqui decimos que seleccionamos el <ul id="contenedor"> y que lo llene con los datos de template
                $('#contenedor').html(template);
                $('#resultados-tareas').show();
            }
        });
    }
 
    });
//--------funcion para insertar----------
$('#formulario-tareas').submit(function(e){
    console.log('insertando');
    //objeto para obtener los valores del formulario
    const enviarDatos ={
        nombre: $('#nombre').val(),
        descripcion: $('#descripcion').val(),
        id: $('#idEditarInput').val()
    } ;
    console.log(enviarDatos);
    
 //validar si el boton de guardar va a hacer un insert o un update
    //                  si es falso     envia a     si es true se va a 
    url = BanderaEditar === false ? 'add-tareas.php' : 'editar-tarea.php'; 

    //para enviarlo por el metodo post
    //se manda por url, se envia el objeto, mensaje de la ccion function
    $.post(url,enviarDatos, function(response){
        console.log(response);
        obtenerTarea();
        //limpiar formulario
        $('#formulario-tareas').trigger('reset');

    });
//para que no se refresque la pagina
 e.preventDefault();
});
//---------consultas---------------------------

//con la funcion de obtenerTarea se actualiza la tabla de consultas al agregar un nuevo dato
function obtenerTarea(){
//esta funcion se ejecuta automaticamente porque no hay una validacion como if
    $.ajax({
        type: "GET",
        url: "consultas-tareas.php",
        
        success: function (response) {
        //console.log(response);
        //convertir el json a un objeto para poderla mostrar
        let variableTarea=JSON.parse(response);
        let template = '';
        $.each (variableTarea,function(clave,auxiliar ){
        //asi se llena la tabla
        template += `
        <tr idFila=${auxiliar.id}>
            <td >${auxiliar.id}</td>
            <td>
                <a href="#" class="enlace-editar">${auxiliar.nombre}</a>
            </td>
            <td>${auxiliar.descripcion}</td>
            <td>
            <button class="eliminar-tareas btn btn-danger">Eliminar</button>
            </td>
        
        </tr>
        `
        });

            //se pinta en la tabla
            $('#tareas').html(template);
        }
    });

}

//--------funcion para hacer delete--------
$(document).on('click','.eliminar-tareas', function () {
//js para confirmar
if (confirm("estas seguro de eliminarlo ?")) {
        
    console.log('clic elliminar');
    //console.log($(this))  ;
    //parentElement sirve para reccorer, el primero es para los <tr> y el segundo los <td>, de esta manera obtnemos el id de la fila
    let element = $(this)[0].parentElement.parentElement;
    let id = $(element).attr('idFila');
    $.post('eliminar-tarea.php', {id}, function(response){
        console.log(response);
        //para refrescar la pantalla
        obtenerTarea();
        
    });
}
});
//--------funcion para editar
$(document).on('click','.enlace-editar' ,function () {
    console.log('editando');
    //para seleccionar el id 
    let element = $(this)[0].parentElement.parentElement;
    let id = $(element).attr('idFila');
    console.log(id);
    //mandar los datos al servidor
    $.post('obtener-tarea.php',{id},function(response){
        const tarea=JSON.parse(response);
        $('#nombre').val(tarea.nombre);
        $('#descripcion').val(tarea.descripcion);
        $('#idEditarInput').val(tarea.id);
        BanderaEditar = true;
    });
    
});

});