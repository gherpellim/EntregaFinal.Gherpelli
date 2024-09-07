let accesorios = [];
let carrito = [];

class Accesorio {
    constructor(id, nombre, descripcion, precio, imagen) {
        this.id = id;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.precio = parseFloat(precio); // Convertir el precio a número
        this.imagen = imagen;
    }
}

function cargarAccesorios() {
    fetch('data.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al cargar el JSON');
            }
            return response.json();
        })
        .then(data => {
            if (data.accesorios) {
                data.accesorios.forEach(item => {
                    accesorios.push(new Accesorio(item.id, item.nombre, item.descripcion, item.precio, item.imagen));
                });
                mostrarAccesorios();
            }
        })
        .catch(error => console.error('Error cargando accesorios:', error));
}

function mostrarAccesorios() {
    let divAccesorios = document.getElementById("accesorios");
    divAccesorios.classList.remove('hidden');
    divAccesorios.innerHTML = '<h2>Accesorios:</h2>';

    accesorios.forEach((producto) => {
        divAccesorios.innerHTML += `
            <div class="producto">
                <img src="${producto.imagen}" alt="${producto.nombre}" style="width: 100px; height: auto;" />
                <p>Nombre: ${producto.nombre}</p>
                <p>Descripción: ${producto.descripcion}</p>
                <p>Precio: $${producto.precio.toFixed(2)}</p>
                <button onclick="agregarAlCarrito(${producto.id})">Agregar al carrito</button>
            </div>
        `;
    });
}

function mostrarCarrito() {
    let divCarrito = document.getElementById("carrito");
    divCarrito.classList.remove('hidden');
    divCarrito.innerHTML = '<h2>Carrito:</h2>';

    if (carrito.length === 0) {
        divCarrito.innerHTML += '<p>El carrito está vacío.</p>';
    } else {
        carrito.forEach((producto) => {
            divCarrito.innerHTML += `
                <div class="producto">
                    <img src="${producto.imagen}" alt="${producto.nombre}" style="width: 100px; height: auto;" />
                    <p>Nombre: ${producto.nombre}</p>
                    <p>Descripción: ${producto.descripcion}</p>
                    <p>Precio: $${producto.precio.toFixed(2)}</p>
                </div>
            `;
        });
        divCarrito.innerHTML += `
            <p>Total: $${calcularTotal().toFixed(2)}</p>
            <button onclick="finalizarCompra()">Finalizar compra</button>
        `;
    }
}

function agregarAlCarrito(id) {
    const producto = accesorios.find(p => p.id === id);
    if (producto) {
        carrito.push(producto);
        Toastify({
            text: "Producto añadido al carrito",
            duration: 1500,
            gravity: "top",
            position: "right",
            style: {
                background: "linear-gradient(to right, #00b09b, #96c93d)"
            }
        }).showToast();
    }
}

function calcularTotal() {
    return carrito.reduce((total, producto) => total + producto.precio, 0);
}

function finalizarCompra() {
    let total = calcularTotal().toFixed(2);

    Swal.fire({
        title: 'Compra finalizada',
        text: `El total de tu compra es $${total}`,
        icon: 'success',
        confirmButtonText: 'Aceptar',
        willClose: () => {
            // Mostrar el formulario para que el usuario ingrese sus datos
            Swal.fire({
                title: 'Ingresa tus datos para enviar la factura',
                html: `
                    <form id="facturaForm">
                        <label for="nombre">Nombre:</label>
                        <input type="text" id="nombre" class="swal2-input" placeholder="Nombre completo" required>
                        <label for="email">Correo electrónico:</label>
                        <input type="email" id="email" class="swal2-input" placeholder="Tu correo electrónico" required>
                        <label for="direccion">Dirección:</label>
                        <input type="text" id="direccion" class="swal2-input" placeholder="Dirección de envío" required>
                    </form>
                `,
                showCancelButton: true,
                confirmButtonText: 'Enviar',
                cancelButtonText: 'Cancelar',
                preConfirm: () => {
                    const nombre = Swal.getPopup().querySelector('#nombre').value;
                    const email = Swal.getPopup().querySelector('#email').value;
                    const direccion = Swal.getPopup().querySelector('#direccion').value;
                    if (!nombre || !email || !direccion) {
                        Swal.showValidationMessage(`Por favor completa todos los campos.`);
                    }
                    return { nombre, email, direccion };
                }
            }).then((result) => {
                if (result.isConfirmed) {
                    // Aquí puedes agregar la lógica para enviar los datos del formulario
                    // Por ejemplo, enviar los datos a un servidor
                    console.log('Datos del formulario:', result.value);
                    Swal.fire('¡Gracias!', 'Te enviaremos la factura a tu correo.', 'success');
                }
            });
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('verAccesorios').addEventListener('click', mostrarAccesorios);
    document.getElementById('verCarrito').addEventListener('click', mostrarCarrito);

    cargarAccesorios();
});