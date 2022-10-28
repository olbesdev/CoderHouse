const server6 = io().connect();

const render = (productos) => {
  console.log(productos)
  if(productos !== undefined){
    let listado = document.querySelector("#listado");

    let html = productos.map((prod) => {
      return `
              <div class="card" style="width: 18rem;">
                             <img  id="url" src=${prod.url}>
                             <h5 class="card-title">${prod.id}</h5>
                             <h5 class="card-title" id="nombre">${prod.nombre}</h5>
                             <h5 class="card-title" id="precio">${prod.precio}</h5>
                             <input type="submit" class="borrar-producto" id="${prod.id}" value="x"/>
         </div>
        `;
    });
    listado.innerHTML = html.join(" ");
  }else{
    let listado = document.querySelector("#listado");

    let html = `
       <h3>no hay productos en el carrito</h3>
        `;
        listado.innerHTML = html
    };
   
  }
 
;
server6.on("mensaje-servidor6", (mensaje) => {
  render(mensaje.productos);
});
server6.on("mensaje-servidor7", (mensaje) => {
  render(mensaje.productos);
});
