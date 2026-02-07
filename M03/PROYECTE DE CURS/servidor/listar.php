<?php
// 1. Incluir la conexión a la base de datos
include 'conexion.php';

// 2. Preparar la consulta SQL para obtener todos los productos
$sql = "SELECT id, nombre, descripcion, precio, imagen FROM productos ORDER BY id DESC";

// 3. Ejecutar la consulta
$resultado = mysqli_query($conexion, $sql);

// 4. Crear un array para almacenar los productos
$productos = [];

// 5. Recorrer los resultados y guardarlos en el array
if ($resultado) {
    while ($fila = mysqli_fetch_assoc($resultado)) {
        $productos[] = $fila;
    }
}

// 6. Configurar la cabecera para que el navegador sepa que enviamos JSON (Requisito RA3)
header('Content-Type: application/json');

// 7. Imprimir el array convertido a formato JSON
echo json_encode($productos);

// 8. Cerrar la conexión
mysqli_close($conexion);
?>