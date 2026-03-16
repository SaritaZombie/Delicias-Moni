document.addEventListener("DOMContentLoaded", function () {

    // ===== MOSTRAR PEDIDO =====
    let lista = document.getElementById("listaPedido");
    let totalTxt = document.getElementById("totalPedido");

    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    let total = 0;

    if (carrito.length == 0) {
        lista.innerHTML = "<p>Tu carrito está vacío</p>";
    } else {

        carrito.forEach(p => {

            let subtotal = p.precio * p.cantidad;
            total += subtotal;

            lista.innerHTML += `
            <div class="filaPedidoProducto">
                <span>${p.nombre} x${p.cantidad}</span>
                <span>$${subtotal}</span>
            </div>
            `;
        });

    }

    totalTxt.textContent = "$" + total;


    // ===== BOTON PAGAR =====
    let btn = document.querySelector(".btnRealizar");

    btn.addEventListener("click", function () {

        let metodo = document.querySelector('input[name="pago"]:checked');

        if (!metodo) {
            let msg = document.getElementById("mensajeErrorPago");
            msg.style.display = "block";
            msg.textContent = "Debes elegir un medio de pago 💕";
            return;
        }

        document.getElementById("mensajeErrorPago").style.display = "none";

        let pedido = {

            nombre: document.getElementById("nombre").value,
            apellido: document.getElementById("apellido").value,
            email: document.getElementById("email").value,
            whatsapp: document.getElementById("whatsapp").value,
            direccion: document.getElementById("direccion").value,
            notas: document.getElementById("notas").value,

            metodo: metodo.parentElement.textContent.trim(),
            total: totalTxt.textContent,

            numeroPedido: "DM" + Math.floor(Math.random() * 10000)

        };

        localStorage.setItem("pedidoInfo", JSON.stringify(pedido));
        localStorage.removeItem("carrito");

        window.location.href = "pedidoCompletado.html";

    });

});