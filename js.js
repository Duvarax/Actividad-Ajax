let list = [];
let list2 = [];

fetch("http://hp-api.herokuapp.com/api/characters")
    .then((response) => response.json())
    .then((data) => data.map(personaje => {
        if(personaje.image !== ""){

          list.push(personaje.image);
          let numrandom = getRandomInt(25);
          if(list.length % numrandom && list2.length <= 12){
            list2.push(personaje.image);
          }
          
        }
}));
console.log(list2);
const contenedores = document.getElementsByName('contenedor-img');
console.log(contenedores);


function jugar(){
  contenedores.forEach(el => el.style.border = '3px solid green');
  let i = 0;
  let intentos = 1;
   shuffleArray(list2);
    list2.forEach(element => {
        contenedores.item(i++).innerHTML = `<img class="oculto" src="${element}">`;
    });
    shuffleArray(list2);
    list2.forEach(element => {
      if(i <= contenedores.length-1){
        contenedores.item(i++).innerHTML = `<img class="oculto" src="${element}">`;
      }
  });
    contenedores.forEach(contenedor => contenedor.addEventListener('click', e => {
    let elemento = e.target;
    let x = elemento.innerHTML;
    elemento.innerHTML = x.replace("oculto", "clicked");
    let test = document.querySelectorAll('.clicked');
    if(test.length == 2){
      if(test[0].src == test[1].src){
        setTimeout(() => {
          min = 5;
          seg = 0;
          document.getElementById('tiempo-restante').innerHTML = `${min}:${seg}`;
          contenedores.forEach(el => el.style.border = '3px solid red');
          test.forEach(img => img.classList.replace("clicked","oculto"));
          alert("win");
        },2000);
      }
    }
    
    if(test.length == 3){
      test.forEach(img => img.classList.replace("clicked","oculto"));
      document.getElementById('intentos-realizados').innerHTML = intentos++;
      
    }
    
    

  }));
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}
function shuffleArray(inputArray){
    inputArray.sort(()=> Math.random() - 0.5);
}
let min = 5;
let seg = 0;
function actualizaTiempo(){
  
  document.getElementById('tiempo-restante').innerHTML = `${min}:${seg}`;
  if(min==0 && seg == 0){
    alert('Se termino el tiempo');
  }else{
    if(seg == 0){
      seg = 59;
      min--
    }else{
      seg--
    }
    
    setTimeout("actualizaTiempo()", 1000);
  }

}
