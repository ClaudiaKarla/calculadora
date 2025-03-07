const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/tabla', (req, res) => {
    const {tabla, limite} = req.body;
    let resultados = [];

for(i=1; i<=limite; i++){
    let mult = tabla * i;

   if(mult % 7 === 0 && mult % 5 === 0 ){
      color = 'ROJO'
     }else if(mult % 7 === 0 && mult % 3 === 0){
        color = 'ROJO'
  }else if(mult % 5 === 0 && mult % 3 === 0){
        color = 'VERDE'
    }else if(mult % 7 === 0){
        color = 'ROJO'
      }else if(mult % 5 === 0){
        color = 'VERDE'
    }else if(mult % 3 === 0) {
        color = 'AZUL'
    }else{
        color = 'AMARILLO'
    }

    resultados.push({multiplicacion:`${tabla} * ${i} = ${mult}`, color });
}

res.json(resultados);

});

app.listen(3001,() => {
    console.log('Servidor conectado en el puerto 3001');
});