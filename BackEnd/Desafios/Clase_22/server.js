import { normalize, schema, denormalize } from 'normalizr';
import { faker } from '@faker-js/faker';

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
        text:  faker.lorem.words(10)        
    }    
    return fake
}
let objetos = []
for(let i=0; i<5; i++){
    objetos.push(fakerObjects())
}
const authorSchema = new schema.Entity('author', {}, {idAttribute: "id"});
const commentSchema = new schema.Entity('text');
const postSchema =[{
    author: authorSchema,
    text: commentSchema
}];
 
const normalizedBlogposts = normalize(objetos,postSchema);
console.log(normalizedBlogposts)