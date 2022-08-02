var pokemon = new Array;
window.addEventListener('load', function() {
  let elem = document.getElementById("containerindex");
 

  if(this.location.href.includes("pokeID")){
    const urlParams = new URLSearchParams(window.location.search);
    id = urlParams.get('pokeID');
    backButton = '<div><button onclick="history.back()">Atrás</button></div>'
    elem.innerHTML = backButton;
    fetch('https://pokeapi.co/api/v2/pokemon/' + id)
      .then(response => response.json())
        .then(data => {
          console.log(data)
          newItem = '<div class=\"cardindex\">';
          //img
          if(data['sprites']['front_default'] != null){
            newItem += '<img src=\"'  + data['sprites']['front_default'] + '"/>';
          }
          //img back
          if(data['sprites']['back_default'] != null){
            newItem += '<img src=\"'  + data['sprites']['back_default'] + '"/>';
          }
          //nom
          newItem += '<h2>'+ data['name'] +'</h2>';
          //atac
          newItem += '<p><strong>Atac: </strong>'+ data['stats'][1]['base_stat']+'</p>';
          //defensa
          newItem += '<p><strong>Defensa: </strong>'+ data['stats'][2]['base_stat']+'</p>';
          //tipus
          let tipus = new Array;
          for(let i=0; i< data['types'].length; i++){
            newItem += '<p><strong>Tipus: </strong>'+ data['types'][i]['type']['name']+'</p>';
          }

          elem.innerHTML += newItem;
        });

  }
  else{
    for(let i=0;i<10;i++){
      //falta duplicados
      let random = Math.floor(Math.random() * 905);
      fetch('https://pokeapi.co/api/v2/pokemon/' + random)
      .then(response => response.json())
        .then(data => {
          newItem = '<div class=\"cardindex\">';
          //img
          if(data['sprites']['front_default'] != null){
            newItem += '<img src=\"'  + data['sprites']['front_default'] + '"/>';
          }
          //nom
          newItem += '<h2>'+ data['name'] +'</h2>';
          //atac
          newItem += '<p><strong>Atac: </strong>'+ data['stats'][1]['base_stat']+'</p>';
          //defensa
          newItem += '<p><strong>Defensa: </strong>'+ data['stats'][2]['base_stat']+'</p>';
          //veure mes
          newItem += '<button onclick="mesinfo('+random +')">Més informació</button>';
          newItem += '</div>';
          elem.innerHTML += newItem;
          pokemon.push(data['name']);
        });
      }
    

  }

});


function buscar() {
  let input = document.getElementById('buscador').value;
  let container = document.getElementsByClassName("cardindex");
  for (i = 0; i < pokemon.length; i++) { 
      if (!pokemon[i].includes(input)) {
          container[i].style.display="none";
      }
      else {   
          container[i ].style.display="block";        
      }
  }
}

function mesinfo(id){
  location.href += "?pokeID=" +id;   
}