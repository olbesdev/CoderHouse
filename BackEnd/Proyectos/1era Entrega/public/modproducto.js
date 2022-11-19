const server2 = io().connect();

const modproducto = (evt) => {
  const id = document.querySelector("#id").value;
  const nombre = document.querySelector("#nombremod").value;
  const precio = document.querySelector("#preciomod").value;
  let hora = new Date().toLocaleTimeString();
  const url = document.querySelector("#url").value;

  const producto = { id, nombre, precio, url , hora};
  // console.log(producto)
  server2.emit("producto-modificado", producto);
  return false;
};


