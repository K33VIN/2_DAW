// LÓGICA DEL FRONTEND - TIENDA DE ROPA
// Cumple con: Fetch API, JSON, Manipulación del DOM (querySelector) y Eventos

// 1. Esperar a que el DOM esté listo (Requisito RA3)
window.addEventListener('load', () => {
    console.log("Entorno de usuario listo.");
    
    // Cargamos los productos nada más abrir la web
    obtenerProductos();

    // Escuchamos cuando el usuario quiera añadir un producto (Uso de querySelector)
    const formulario = document.querySelector('#formulario-producto');
    if (formulario) {
        formulario.addEventListener('submit', guardarProducto);
    }
});

// 2. FUNCIÓN PARA OBTENER DATOS (READ)
async function obtenerProductos() {
    const contenedor = document.querySelector('#contenedor-productos');
    
    try {
        const respuesta = await fetch('../servidor/listar.php');
        const productos = await respuesta.json();

        contenedor.innerHTML = "";

        if (productos.length === 0) {
            contenedor.innerHTML = "<p class='mensaje'>No hay artículos en el catálogo.</p>";
            return;
        }

        productos.forEach(item => {
            const card = document.createElement('div');
            card.classList.add('producto-card');

            // IMPORTANTE: Ahora pasamos item.imagen, nombre, descripcion y precio a la función prepararEdicion
            card.innerHTML = `
                <div class="img-container">
                    <img src="../recursos/${item.imagen}" alt="${item.nombre}" style="width:100%; height:100%; object-fit:cover;">
                </div>
                <div class="info-producto">
                    <h3>${item.nombre}</h3>
                    <p class="descripcion">${item.descripcion}</p>
                    <p class="precio">${item.precio} €</p>
                    <div class="acciones">
                        <button class="btn-editar" onclick="prepararEdicion('${item.id}', '${item.nombre}', '${item.precio}', '${item.descripcion}', '${item.imagen}')">Editar</button>
                        <button class="btn-borrar" onclick="borrarProducto(${item.id})">Eliminar</button>
                    </div>
                </div>
            `;
            contenedor.appendChild(card);
        });

    } catch (error) {
        console.error("Error al conectar con el servidor:", error);
        contenedor.innerHTML = "<p>Error al cargar el catálogo.</p>";
    }
}

// 3. FUNCIÓN DE GUARDAR (CREATE / UPDATE)
async function guardarProducto(e) {
    e.preventDefault();
    const form = e.target;
    const datos = new FormData(form);
    const editId = form.dataset.editId;

    if (editId) {
        datos.append('id', editId);
    }

    const url = editId ? '../servidor/editar.php' : '../servidor/insertar.php';

    try {
        const respuesta = await fetch(url, {
            method: 'POST',
            body: datos
        });
        const resultado = await respuesta.json();

        if (resultado.status === "success") {
            form.reset();
            delete form.dataset.editId;
            const btn = document.querySelector('#btn-guardar');
            btn.textContent = "Publicar Artículo";
            btn.style.backgroundColor = "";
            obtenerProductos(); 
        }
    } catch (error) {
        console.error("Error:", error);
    }
}

// 4. FUNCIÓN PARA BORRAR (DELETE)
async function borrarProducto(id) {
    if (!confirm("¿Seguro que quieres eliminar este producto de la colección?")) return;

    const datos = new FormData();
    datos.append('id', id);

    try {
        const respuesta = await fetch('../servidor/borrar.php', {
            method: 'POST',
            body: datos
        });
        const resultado = await respuesta.json();

        if (resultado.status === "success") {
            obtenerProductos();
        }
    } catch (error) {
        console.error("Error al borrar:", error);
    }
}

// 5. PREPARAR EL FORMULARIO PARA EDITAR (Se añade el parámetro 'imagen')
function prepararEdicion(id, nombre, precio, descripcion, imagen) {
    // Rellenamos todos los campos, incluido el de la imagen
    document.querySelector('#nombre').value = nombre;
    document.querySelector('#precio').value = precio;
    document.querySelector('#descripcion').value = descripcion;
    document.querySelector('#imagen').value = imagen; // <--- Línea añadida
    
    // Cambiamos el aspecto del botón
    const btn = document.querySelector('#btn-guardar');
    btn.textContent = "Actualizar Producto";
    btn.style.backgroundColor = "#2196F3"; 
    
    // Asignamos el ID al dataset del formulario
    document.querySelector('#formulario-producto').dataset.editId = id;
    
    // Subida suave al formulario
    window.scrollTo({ top: 0, behavior: 'smooth' });
}