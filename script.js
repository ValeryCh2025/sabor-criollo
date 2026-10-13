
/* ========================================
   SABOR CRIOLLO - FUNCIONES
======================================== */

// IMPORTANTE:
// Cambia este valor por el número real del negocio.
// Formato internacional, solo números.
// Perú: 51 + número de celular.
// Ejemplo ficticio: "51987654321"
const WHATSAPP_NUMBER = "51989406955";
// ========================================
// ABRIR WHATSAPP
// ========================================


function abrirWhatsApp(mensaje) {
  const numero = "51989406955";

  const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`;

  // Abre WhatsApp en la misma pestaña para evitar bloqueos
  // de ventanas emergentes del navegador.
  window.location.href = url;
}

// ========================================
// BOTONES PARA PEDIR PRODUCTOS
// ========================================

const botonesPedido = document.querySelectorAll(".order-button");

botonesPedido.forEach((boton) => {
  boton.addEventListener("click", () => {
    const producto = boton.dataset.product;
    const precio = Number(boton.dataset.price);

    if (!producto || !Number.isFinite(precio) || precio <= 0) {
      alert("No se pudo identificar este producto.");
      return;
    }

    const precioFormateado = precio.toFixed(2);

    const mensaje =
      "¡Hola! 👋 Me interesa realizar un pedido.\n\n" +
      "Producto: " + producto + "\n" +
      "Precio referencial: S/ " + precioFormateado + "\n\n" +
      "¿Podrían confirmarme la disponibilidad y el precio actual?";

    abrirWhatsApp(mensaje);
  });
});

// ========================================
// FILTROS DE CATEGORÍAS
// ========================================

const botonesFiltro = document.querySelectorAll(".filter-button");
const tarjetasProducto = document.querySelectorAll(".product-card");

botonesFiltro.forEach((boton) => {
  boton.addEventListener("click", () => {
    const categoriaSeleccionada = boton.dataset.category;

    // Actualizar el aspecto y estado accesible de los filtros.
    botonesFiltro.forEach((otroBoton) => {
      const estaActivo = otroBoton === boton;

      otroBoton.classList.toggle("active", estaActivo);
      otroBoton.setAttribute("aria-pressed", String(estaActivo));
    });

    // Mostrar únicamente los productos de la categoría elegida.
    tarjetasProducto.forEach((tarjeta) => {
      const categoriaProducto = tarjeta.dataset.category;

      const debeMostrarse =
        categoriaSeleccionada === "todos" ||
        categoriaProducto === categoriaSeleccionada;

      tarjeta.hidden = !debeMostrarse;
    });
  });
});

// ========================================
// BOTONES GENERALES DE CONTACTO
// ========================================

const botonContacto = document.querySelector("#contact-button");
const botonFlotante = document.querySelector("#floating-whatsapp");

function consultarMenu() {
  const mensaje =
    "¡Hola! 👋 Vi su catálogo web de Sabor Criollo " +
    "y quisiera consultar la carta, los horarios y la disponibilidad.";

  abrirWhatsApp(mensaje);
}

botonContacto.addEventListener("click", consultarMenu);
botonFlotante.addEventListener("click", consultarMenu);

// ========================================
// AÑO AUTOMÁTICO DEL PIE DE PÁGINA
// ========================================

document.querySelector("#year").textContent =
  new Date().getFullYear();
