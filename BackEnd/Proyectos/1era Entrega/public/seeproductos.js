const server = io().connect();

const modFormProducto = () => {
  let modificarubi = document.querySelector("#modificarubi");
  let modproducto = `<h2>modificar producto</h2>
      <form
        onsubmit="return modproducto(this)"
        class="mt-5"
        action="http://localhost:4000"
      >
        <div class="form-group">
          <label for="id">id del producto</label>
          <input
            type="number"
            class="form-control"
            id="id"
            required="required"
            name="id"
            placeholder="id del producto"
          />
        </div>
        <div class="form-group">
          <label for="nombre">Nombre producto:</label>
          <input
            type="text"
            class="form-control"
            id="nombremod"
            required="required"
            name="nombre"
            placeholder="Nombre"
          />
        </div>
        <div class="form-group">
          <label for="price">Precio:</label>
          <input
            type="number"
            class="form-control"
            id="preciomod"
            required="required"
            name="precio"
            placeholder="Precio"
          />
        </div>
        <div class="form-group">
          <label for="url"> image url:</label>
          <input
            type="text"
            class="form-control"
            required="required"
            id="urlmod"
            name="url"
            placeholder="url"
          />
        </div>
        <br />
        <div class="agregar-producto">
        <input type="submit" value="mod Product" />
      </div>
      </form>
   `;

  modificarubi.innerHTML = modproducto;
};
const formAddProducto = () => {
  let addUbi = document.querySelector("#ubiFormAdd");
  let formAddProducto = ` <div>
  <h2>Agregar producto</h2>
  <div>
    <form
      onsubmit="return addProduct(this)"
      class="mt-5"
      action="http://localhost:4000"
    >
      <div class="form-group">
        <label for="nombre">Nombre producto:</label>
        <input
          type="text"
          class="form-control"
          id="nombre"
          required="required"
          name="nombre"
          placeholder="Nombre"
        />
      </div>
      <div class="form-group">
        <label for="price">Precio:</label>
        <input
          type="number"
          class="form-control"
          id="precio"
          required="required"
          name="precio"
          placeholder="Precio"
        />
      </div>
      <div class="form-group">
        <label for="url">image url</label>
        <input
          type="text"
          class="form-control"
          required="required"
          id="url"
          name="url"
          placeholder="url"
        />
      </div>
      <br />
      <input type="submit"  value="Add Product" />
    </form>
  </div>
 `;

  addUbi.innerHTML = formAddProducto;
};

 const render = (productos) => {
  formAddProducto();
  modFormProducto();
  let administrador = true;
  if(productos !== undefined){ 
  if (administrador) {
 
    let listado = document.querySelector("#listado");

    let html = productos.map((prod) => {
      return `
          <div class="card" style="width: 18rem;">
                        <img  id="url" src=${prod.url}>
                         <h5 class="card-title">${prod.id} </h5>
                         <h5 class="card-title" id="nombre">producto:${prod.nombre}</h5>
                         <h5 class="card-title" id="precio">precio:${prod.precio}</h5>
                       
                         <h5 class="card-title">hora de add${prod.hora}</h5>
                         <input type="submit" class="agregar-carrito"  value="agregar al carrito"/>
                         <input type="submit" class="borrar-producto" id="${prod.id}" value="x"/>        
           </div>
    `;
    });
    listado.innerHTML = html.join(" ");


  
  } else {
    let listado = document.querySelector("#listado");
    let html = productos.map((prod) => {
      return `   <div class="card" style="width: 18rem;">
                            <img  id="url" src=${prod.url}>
                            <h5 class="card-title" id="nombre">producto;${prod.nombre}</h5>
                            <h5 class="card-title" id="precio">precio:${prod.precio}</h5>
                            <h5 class="card-title">hora de add ${prod.hora}</h5>
                            <input type="submit" class="agregar-carrito"  value="agregar al carrito"/>
                            <input type="submit" class="borrar-producto" id="${prod.id}" value="x"/>
     
                      </div>`;
    });
    listado.innerHTML = html;
  }}
  else{
    let listado = document.querySelector("#listado");

    let html = `
       <h3>no hay productos </h3>
        `;
        listado.innerHTML = html
    };
  }
;
server.on("mensaje-servidor", (mensaje) => {
  console.log("holaa")
  render(mensaje.productos);
});

server.on("mensaje-servidor2", (mensaje) => {
  console.log("soy 2")
  render(mensaje.productos);
})





