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

    actualizarCarrito();
  }

  // Función para eliminar los productos del carrito
  function eliminarDelCarrito(productoId) {
    carrito = carrito.filter(item => item.id !== productoId);
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
        </div>
      `;

      carritoElement.innerHTML += productoHTML;
    });

    totalElement.textContent = `Total: $${total.toFixed(2)}`;
  }
});