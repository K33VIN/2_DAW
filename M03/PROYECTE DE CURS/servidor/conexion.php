<?php
$servidor = "localhost";
$usuario = "root";
$password = ""; 
$base_datos = "tienda_ropa";

// El nombre de esta variable debe coincidir con el que usamos en listar.php
$conexion = mysqli_connect($servidor, $usuario, $password, $base_datos);

if (!$conexion) {
    die("Error de conexión: " . mysqli_connect_error());
}

mysqli_set_charset($conexion, "utf8");
?>