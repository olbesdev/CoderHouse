import express from "express";
import {faker} from '@faker-js/faker'
import {normalize, schema  } from "normalizr";
import cors from 'cors';

const app = express()
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())

const fakerObjects = () =>{
    const fake = {
        author:{
            id: faker.internet.email(),
            nombre: faker.name.firstName(),
            apellido: faker.name.lastName(),
            edad: faker.date.birthdate({ min: 18, max: 65, mode: 'age' }),
            alias: faker.lorem.word(),
            avatar: faker.image.people() 
        },
        texto:  faker.lorem.words(10)        
    }    
    return fake
}
let objetos = []
for(let i=0; i<5; i++){
    objetos.push(fakerObjects())
}
const authorSchema = new schema.Entity('author', {}, {idAttribute: "id"});
const commentSchema = new schema.Entity('texto');        
const responseSchema = new schema.Array({ author: authorSchema, texto:commentSchema  });
const normalizedBlogposts = normalize(objetos,responseSchema);
console.log(normalizedBlogposts)

app.get('/mensaje', async (req, res) => {  
  res.send(normalizedBlogposts)
 });
app.post('/mensaje', async (req, res) => {
   console.log(req.body);
   const dataNormalized = normalize(req.body,responseSchema);
   res.send(dataNormalized)
  });

app.post('*', async (req, res) => {
    res.send('le erraste!')
   });
 
const PORT = process.env.PORT || 4000
app.listen(PORT, ()=>{
    console.log(`escuchando el puerto ${PORT}`);
})
