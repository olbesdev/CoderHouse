class Usuario {
    constructor(nombre, apellido, libros, mascotas) {
      this.nombre = nombre;
      this.apellido = apellido;
      this.libros = libros;
      this.mascotas = mascotas;
    }

            getFullName() {
            return `${this.nombre} ${this.apellido}`;
            }

            addMascotas(mascotas) {
            return this.mascotas.push(mascotas);
            }

            countMascotas() {
            return this.mascotas.length;
            }

            addBook(nombre, autor) {
               return this.libros.push({
                    nombre,
                    autor,
                });
            }

            getBookName() {
                return this.libros.map((libro) => libro.nombre);
            }
  }
  
  const usuario = new Usuario(
    "Jonathan", "Olbes",
    //Libros en la biblioteca
    [{ nombre: "Encantado De Conocerme", autor: "Borja Vilaseca" },
    { nombre: "El Arte de Empezar", autor: "Guy Kawasaki" }
    ],
    //Mascotas en mi casa
    ["Perro", "Gato", "Loro"]
  );
  
  //Mostramos el Nombre Completo
  console.log("El nombre del usuario es: ", usuario.getFullName());
  
  //Mostramos las mascotas
  console.log("En este momento tengo:", usuario.countMascotas(), "mascotas" )

  //Ha llegado una nueva masctota
  console.log("Hoy está llegando un Cerdito")
  usuario.addMascotas("Cerdo");
  console.log("Ahora tenemos en nuestra casa", usuario.countMascotas(), "mascotas");

  //Agregando un libro y mostrando mi biblioteca
  console.log("En nuestra biblioteca tenemos el libro:", usuario.libros);
  usuario.addBook("Hitler", "John Toland");
  console.log("He comprado un nuevo libro, ahora tengo los siguientes libros en mi biblioteca:",usuario.getBookName());