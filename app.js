document.addEventListener("DOMContentLoaded", function () {
  // Definición de elementos iniciales
  const carritoElement = document.getElementById("carrito");
  const totalElement = document.querySelector(".total");

  const productos = document.querySelectorAll(".producto");
  const agregarCarritoBotones = document.querySelectorAll(".agregar-carrito");

  let carrito = [];

  agregarCarritoBotones.forEach(btn => {
    btn.addEventListener("click", agregarAlCarrito);
  });

  if (localStorage.getItem("carrito")) {
    carrito = JSON.parse(localStorage.getItem("carrito"));
    actualizarCarrito();
  }
  
  // Función para agregar los productos al carrito
  function agregarAlCarrito(event) {
    const productoElement = event.target.closest(".producto");
    const productoId = productoElement.dataset.id;
    const productoNombre = productoElement.dataset.nombre;
    const productoPrecio = parseFloat(productoElement.dataset.precio);

    const existeEnCarrito = carrito.some(item => item.id === productoId);

    if (existeEnCarrito) {
      carrito = carrito.map(item => {
        if (item.id === productoId) {
          item.cantidad += 1;
        }
        return item;
      });
    } else {
      carrito.push({
        id: productoId,
        nombre: productoNombre,
        precio: productoPrecio,
        cantidad: 1
      });
    }

    // Guardar carrito en localStorage después de cada actualización
    localStorage.setItem("carrito", JSON.stringify(carrito));
    actualizarCarrito();
  }

  // Función para eliminar los productos del carrito
  function eliminarDelCarrito(productoId) {
    carrito = carrito.filter(item => item.id !== productoId);
    // Guardar carrito en localStorage después de cada actualización
    localStorage.setItem("carrito", JSON.stringify(carrito));
    actualizarCarrito();
  }

  // Función para actualizar el carrito
  function actualizarCarrito() {
    carritoElement.innerHTML = "";
    let total = 0;

    carrito.forEach(item => {
      const subtotal = item.precio * item.cantidad;
      total += subtotal;

      // Definición y creación del botón eliminar
      const productoHTML = `
        <div class="d-flex justify-content-between align-items-center mb-2">
          <span>${item.nombre} x ${item.cantidad}</span>
          <span>$${subtotal.toFixed(2)}</span>
          <button class="eliminar btn btn-primary" onclick="eliminarDelCarrito(${item.id})">Eliminar</button>
        </div>`;

      carritoElement.innerHTML += productoHTML;
    });

    totalElement.textContent = `Total: $${total.toFixed(2)}`;

    // Obtener los botones eliminar después de actualizar el carrito
    const botonesEliminar = document.querySelectorAll('.eliminar');
    botonesEliminar.forEach(btn => {
      btn.addEventListener('click', () => {
        const productoId = parseInt(btn.dataset.id);
        eliminarDelCarrito(productoId);
      });
    });
  }
});
