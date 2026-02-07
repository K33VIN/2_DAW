<?php
// Incluimos la conexión
include 'conexion.php';

// Requisito: Procesar formulario enviado por POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    
    // Recogemos los datos incluyendo el nuevo campo 'imagen'
    $nombre = mysqli_real_escape_string($conexion, $_POST['nombre']);
    $precio = mysqli_real_escape_string($conexion, $_POST['precio']);
    $descripcion = mysqli_real_escape_string($conexion, $_POST['descripcion']);
    // Este es el nombre del archivo que el usuario escribe (ej: gorra.jpg)
    $imagen = mysqli_real_escape_string($conexion, $_POST['imagen']);

    // Query actualizada para incluir la columna imagen
    $sql = "INSERT INTO productos (nombre, precio, descripcion, imagen) 
            VALUES ('$nombre', '$precio', '$descripcion', '$imagen')";

    // Requisito RA4: Usar driver mysqli y retornar JSON
    header('Content-Type: application/json');

    if (mysqli_query($conexion, $sql)) {
        echo json_encode(["status" => "success", "message" => "Producto añadido correctamente"]);
    } else {
        echo json_encode(["status" => "error", "message" => mysqli_error($conexion)]);
    }
}

// Requisito RA6: Cerrar la conexión
mysqli_close($conexion);
?>