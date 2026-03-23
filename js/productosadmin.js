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