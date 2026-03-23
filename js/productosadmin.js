document.addEventListener("DOMContentLoaded", () => {

    let productos = JSON.parse(localStorage.getItem("productos")) || [];

    let listaPostres = document.getElementById("listaPostres");
    let listaTortas = document.getElementById("listaTortas");
    let listaOtros = document.getElementById("listaOtros");

    listaPostres.innerHTML = "";
    listaTortas.innerHTML = "";
    listaOtros.innerHTML = "";

    // MOSTRAR PRODUCTOS
    productos.forEach(p => {

        let card = `
        <div class="col-md-3">
            <div class="card">
                <img src="${p.imagen}" class="card-img-top">
                <div class="card-body">
                    <h5>${p.nombre}</h5>
                    <h5>$${p.precio}</h5>
                    <button class="btn btnComprar btnEditar" onclick="editarProducto(${p.id})">
                        Editar
                    </button>
                </div>
            </div>
        </div>
        `;

        if(p.nombre.toLowerCase().includes("torta")){
            listaTortas.innerHTML += card;
        } else if(p.nombre.toLowerCase().includes("postre")){
            listaPostres.innerHTML += card;
        } else {
            listaOtros.innerHTML += card;
        }

    });

    // EDITAR NOMBRE DE SECCIONES
    document.querySelectorAll(".btnLapiz").forEach((btn, index) => {

        let contenedor = btn.parentElement;
        let titulo = contenedor.querySelector(".tituloSeccion");

        // CARGAR NOMBRE GUARDADO
        let guardado = localStorage.getItem("titulo" + index);
        if(guardado){
            titulo.textContent = guardado;
        }

        btn.addEventListener("click", () => {

            let nuevoNombre = prompt("Nuevo nombre de la sección:");

            if(nuevoNombre){
                titulo.textContent = nuevoNombre;

                // GUARDAR
                localStorage.setItem("titulo" + index, nuevoNombre);
            }

        });

    });

});

// REDIRECCIÓN EDITAR PRODUCTO
function editarProducto(id){
    window.location.href = `editarproducto.html?id=${id}`;
}

// PARTE DEL FILTRO DE VALOR

document.addEventListener("DOMContentLoaded", () => {
    const range = document.getElementById("range4");
    const output = document.getElementById("rangeValue");
    const productos = document.querySelectorAll(".card");

    //Mostrar el valor del rango
    output.textContent = "$" + Number(range.value).toLocaleString("es-CO");

    range.addEventListener("input", () => {
        const valor = parseInt(range.value);
        output.textContent = "$" + valor.toLocaleString("es-CO");

        //Revisar cada producto
        productos.forEach((producto) => {
            const precio = parseInt(producto.dataset.precio);
            const contenedor = producto.closest("article");

            //Verificar si el precio es menor que el valor mostrado
            contenedor.style.display = (precio <= valor) ? "" : "none";
        });
    });
});