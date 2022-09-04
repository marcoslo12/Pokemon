let atac1,nom1;
var pokemonsearch = new Array;


window.addEventListener('load', function() {

    if(sessionStorage.getItem("theme")=="clar"){
        document.querySelector('#theme').checked = true;
    }
    else{
        document.querySelector('#theme').checked = false;

    }

    if(this.location.href.includes("combat")){
        let elem = document.getElementById("containercombat"); 
        for(let i=0;i<10;i++){
            //falta duplicados
            let random = Math.floor(Math.random() * 905);
            fetch('https://pokeapi.co/api/v2/pokemon/' + random)
            .then(response => response.json())
            .then(data => {
                newItem = '<div class=\"cardcombat\" id=\"card'+i+'\"onclick=\"flip('+i+','+data['stats'][1]['base_stat']+',' +data['stats'][2]['base_stat']+ ',\'' + data['name'] +'\')\">';
                newItem += '<div class=\"card__face card__face--front\" ></div>';
                newItem += '<div class=\"card__face card__face--back\">';
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
                newItem += '</div></div>';
                elem.innerHTML += newItem;
            });
        }
    }
    else if(this.location.href.includes("pokeID")){

        let elem = document.getElementById("containerindex");
        document.getElementById("divbusc").style.display = 'none';
        const urlParams = new URLSearchParams(window.location.search);
        id = urlParams.get('pokeID');    
        backButton = '<button onclick="history.back()">Atrás</button>'
        elem.innerHTML = backButton;
        fetch('https://pokeapi.co/api/v2/pokemon/' + id)
        .then(response => response.json())
            .then(data => {
            newItem = '<div class=\"cardindex moreinfo\" ><div id=\"images\">';
            //img
            if(data['sprites']['front_default'] != null){
                newItem += '<img src=\"'  + data['sprites']['front_default'] + '"/>';
            }
            //img back
            if(data['sprites']['back_default'] != null){
                newItem += '<img src=\"'  + data['sprites']['back_default'] + '"/>';
            }
            //nom
            newItem += '</div><h2>'+ data['name'] +'</h2>';
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
        let elem = document.getElementById("containerindex");
        if(sessionStorage.getItem("Pokemon")==null){
            var pokemon = new Array;
            for(let i=0;i<10;i++){
                pokemon.push(Math.floor(Math.random() * 905));
            }
            sessionStorage.setItem("Pokemon", pokemon)
        }
        for(let i=0;i<10;i++){
        //falta duplicados
        fetch('https://pokeapi.co/api/v2/pokemon/' + sessionStorage.getItem("Pokemon").split(",")[i])
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
            newItem += '<button onclick="mesinfo('+sessionStorage.getItem("Pokemon").split(",")[i] +')">Més informació</button>';
            newItem += '</div>';
            elem.innerHTML += newItem;
            pokemonsearch.push(data['name']);
            });
        }  
    }
});


function buscar() {
  let input = document.getElementById('buscador').value;
  let container = document.getElementsByClassName("cardindex");
  for (i = 0; i < pokemonsearch.length; i++) { 
      if (!pokemonsearch[i].includes(input)) {
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

function flip(id,atac,defensa, nom){
    let element=document.getElementById("resultat"); 


    //girem si hi ha menys de 2 cartes
    if(document.getElementsByClassName('is-flipped').length <2){
        document.getElementById("card"+id).classList.toggle('is-flipped');
    }

    //si es la primera guardem l'atac
    if(document.getElementsByClassName('is-flipped').length ==1){
        atac1=atac;
        nom1=nom;
    }

    
    if(document.getElementsByClassName('is-flipped').length==2){
        //si es la segona fem el combat
        if(atac1>defensa){
            newItem = '<p>' + nom1 + ' ataca i guanya a ' + nom + '</p>';
        }
        else if(atac1<=defensa){
            newItem = '<p>' + nom1 + ' ataca i perd contra ' + nom + '</p>';
        }
        document.getElementById("reload").style.visibility = 'visible';
        document.getElementById("reload2").style.visibility = 'visible';
        element.innerHTML = newItem;
        //eliminen la funcio onclick
        for(let i=0;i<document.getElementsByClassName("cardcombat").length;i++){
            document.getElementsByClassName("cardcombat")[i].style.pointerEvents = "none";
        }
    }
}

function reload(){
    var element =  document.getElementsByClassName('is-flipped');
    while(element.length>0){
        element[0].classList.remove('is-flipped')
    }
    document.getElementById("reload").style.visibility = 'hidden';
    document.getElementById("reload2").style.visibility = 'hidden';
    document.getElementById("resultat").innerHTML ="";

    //eliminen la funcio onclick
    for(let i=0;i<document.getElementsByClassName("cardcombat").length;i++){
        document.getElementsByClassName("cardcombat")[i].style.pointerEvents = "auto";
    }
}

function theme(){
    //clar
    if(document.querySelector('#theme').checked){
        sessionStorage.setItem("theme", "clar")
    }
    //fosc
    else {
        sessionStorage.setItem("theme", "fosc")
    }
}

function nouspokemons(){
    sessionStorage.removeItem('Pokemon');
    var pokemon = new Array;
    for(let i=0;i<10;i++){
        pokemon.push(Math.floor(Math.random() * 905));
    }
    sessionStorage.setItem("Pokemon", pokemon)
    location.reload();

}