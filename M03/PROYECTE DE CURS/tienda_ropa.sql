-- 1. Crear la base de datos si no existe
CREATE DATABASE IF NOT EXISTS tienda_ropa;
USE tienda_ropa;

-- 2. Crear la tabla con la estructura final que hemos usado
CREATE TABLE IF NOT EXISTS productos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    precio DECIMAL(10,2) NOT NULL,
    imagen VARCHAR(255) DEFAULT NULL
);

-- 3. Insertar datos de ejemplo (pon los nombres de imágenes que ya tienes en tu carpeta recursos)
INSERT INTO productos (nombre, descripcion, precio, imagen) VALUES 
('CARGO PANTS', 'Relaxed fit with multiple pockets.', 80.00, 'cargo_pants.jpg'),
('WASHED TEE', 'Boxy fit, 300gsm, white color.', 35.00, 'tee.jpg'),
('VINTAGE HOODIE', 'Heavyweight cotton, oversized fit.', 65.00, 'hoodie.jpg');