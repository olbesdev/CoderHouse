const server3 = io().connect();
let borrar = document.querySelector("#listado")
borrar.addEventListener("click",
 deleteForId = (e) => {
  if (e.target.classList.contains("borrar-producto")) {
    const id = e.target.getAttribute("id");
    server3.emit("producto-borrar", id)
    return false;
    }
 else{
  console.log("toque la x para borrar")
 }
});

  
  