<?php
include 'conexion.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Recibimos el ID del producto a borrar
    $id = $_POST['id'];

    $sql = "DELETE FROM productos WHERE id = $id";
    
    if (mysqli_query($conexion, $sql)) {
        echo json_encode(["status" => "success"]);
    } else {
        echo json_encode(["status" => "error"]);
    }
}

mysqli_close($conexion);
?>