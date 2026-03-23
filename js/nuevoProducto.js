let inputImagen = document.getElementById("inputImagen");
let preview = document.getElementById("preview");
let imagenBase64 = "";

inputImagen.addEventListener("change", function () {
    let file = inputImagen.files[0];
    let reader = new FileReader();

    reader.onload = function (e) {
        imagenBase64 = e.target.result;
        preview.style.backgroundImage = `url(${imagenBase64})`;
        preview.style.backgroundSize = "cover";
    };

    reader.readAsDataURL(file);
});

document.getElementById("btnEliminarImg").addEventListener("click", function () {
    preview.style.backgroundImage = "";
    imagenBase64 = "";
    inputImagen.value = "";
});

document.getElementById("formProducto").addEventListener("submit", function (e) {
    e.preventDefault();

    let nombre = document.getElementById("nombre").value;
    let precio = document.getElementById("precio").value;
    let descripcion = document.getElementById("descripcion").value;

    let productos = JSON.parse(localStorage.getItem("productos")) || [];

    productos.push({
        id: Date.now(),
        nombre,
        precio,
        descripcion,
        imagen: imagenBase64
    });

    localStorage.setItem("productos", JSON.stringify(productos));

    alert("Producto agregado");

    window.location.href = "productosadmin.html";
});