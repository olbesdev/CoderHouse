const server5 = io().connect();
let add = document.querySelector("#listado")
add.addEventListener("click",
 addcarrito = (e) => {
    if (e.target.classList.contains("agregar-carrito")) {
        let datosProducto = e.target.parentElement;
        const datos = {
            nombre: datosProducto.querySelector("#nombre").textContent,
            precio: datosProducto.querySelector("#precio").textContent,
            url: datosProducto.querySelector("#url").textContent,
             hora : new Date().toLocaleTimeString() ,
            cantidad: 1,
          };
          server3.emit("agregar-carrito", datos)
    return false;
    }else{
        
    }
 }
);
