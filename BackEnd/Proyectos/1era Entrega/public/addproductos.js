
const server1 = io().connect();


const addProduct = (evt) => {
  const nombre = document.querySelector("#nombre").value;
  const precio = document.querySelector("#precio").value;
  const url= document.querySelector("#url").value;
  let hora = new Date().toLocaleTimeString();
  const producto = { nombre, precio, url, hora };
  server1.emit("producto-nuevo", producto);
  return false;
 
};


