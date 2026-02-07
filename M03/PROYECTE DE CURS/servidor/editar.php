<?php
include 'conexion.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Recogemos el ID obligatorio para saber qué producto editar
    $id = $_POST['id']; 
    $nombre = mysqli_real_escape_string($conexion, $_POST['nombre']);
    $precio = mysqli_real_escape_string($conexion, $_POST['precio']);
    $descripcion = mysqli_real_escape_string($conexion, $_POST['descripcion']);
    $imagen = mysqli_real_escape_string($conexion, $_POST['imagen']);

    // Sentencia SQL de actualización
    $sql = "UPDATE productos SET 
            nombre = '$nombre', 
            precio = '$precio', 
            descripcion = '$descripcion', 
            imagen = '$imagen' 
            WHERE id = $id";

    header('Content-Type: application/json');
    if (mysqli_query($conexion, $sql)) {
        echo json_encode(["status" => "success", "message" => "Producto actualizado"]);
    } else {
        echo json_encode(["status" => "error", "message" => mysqli_error($conexion)]);
    }
}
mysqli_close($conexion);
?>