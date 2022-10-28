import { useState, useEffect } from 'react'
import Mensajes from './mensajes';
import { faker } from '@faker-js/faker';
import axios from 'axios'
import './App.css'
import useRequest from './hooks/useRequest';
import {denormalize , normalize, schema} from 'normalizr'


const App = () => {
  const [body, setBody] = useState();
  const [data, setData] = useState();
  const [porcentaje, setPorcentaje] = useState();

  const {doSend , errors } = useRequest({
    url: `/mensaje`,
    method: "post",
    body: body,
    onSuccess: (objs) =>{ 
      console.log(objs)
      doGet()
    }
  });
  
  const {doSend:doGet , errors: getErrors } = useRequest({
    url: `/mensaje`,
    method: "get",
    onSuccess: (obj) =>{
      console.log('tirando el obj',)
      const authorSchema = new schema.Entity('author', {}, {idAttribute: "id"});
    const commentSchema = new schema.Entity('texto');        
        const responseSchema = new schema.Array({ author: authorSchema, texto:commentSchema  });
     
      const denormalizado = denormalize(obj.result, responseSchema ,obj.entities)
      const porciento = (JSON.stringify(denormalizado).length / JSON.stringify(obj).length * 100).toFixed(2)
      console.log('normalizado ', denormalizado)
      setData(denormalizado)
      setPorcentaje(porciento)
    }
  });

  useEffect (()=>{
    doGet();
  },[]) 
  
  const handleSubmit = async (e) =>{
    e.preventDefault();
    const data = {
      author:{
        id: e.target[0].value,
        nombre:  e.target[1].value,
        apellido: e.target[2].value,
        edad: e.target[3].value,
        alias:  e.target[4].value,
        avatar:  e.target[5].value,
      },
      texto:   e.target[6].value,    
    }   
    setBody(data)
    doSend();
  } 
  
  return (
    <div className="App">
      <h1>{porcentaje && `el factor de compresion es %${porcentaje}`}</h1>
      <h1>Centro de mensajes</h1>
      <form onSubmit={handleSubmit} className="formClass">
        <input type="email" placeholder='email' name="id" />
        <input type="text" placeholder='nombre'  name="nombre" />
        <input type="text" placeholder='apellido' name="apellido"/>
        <input type="text" placeholder='edad' name="edad"/>
        <input type="text" placeholder='alias' name="alias" />
        <input type="text" placeholder='avatar' name="avatar" />
        <input type="text" placeholder='texto' name="text" />
        <button type='submit' >Enviar Mensjae</button>
      </form>
      <div className='footer'>        
        {console.log('la data es ', data)}
        {data && data.map((obj)=>{
          return (<Mensajes obj={obj} />)
        })}
      </div>
    </div>
  )
}

export default App;
