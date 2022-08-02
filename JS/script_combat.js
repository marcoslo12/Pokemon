let atac1;
window.addEventListener('load', function() {
    let elem = document.getElementById("containercombat"); 
    for(let i=0;i<10;i++){
        //falta duplicados
        let random = Math.floor(Math.random() * 905);
        fetch('https://pokeapi.co/api/v2/pokemon/' + random)
        .then(response => response.json())
        .then(data => {
            newItem = '<div class=\"scene scene--card\"><div class=\"cardcombat\" id=\"card'+i+'\"onclick=\"flip('+i+','+data['stats'][1]['base_stat']+',' +data['stats'][2]['base_stat']+ ')\">';
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
            newItem += '</div></div></div>';
            elem.innerHTML += newItem;
        });
    }


});
function flip(id,atac,defensa){
    //girem si hi ha menys de 2 cartes
    if(document.getElementsByClassName('is-flipped').length <2){
        document.getElementById("card"+id).classList.toggle('is-flipped');
    }

    //si es la primera guardem l'atac
    if(document.getElementsByClassName('is-flipped').length ==1){
        atac1=atac;
    }

    
    if(document.getElementsByClassName('is-flipped').length==2){
        //si es la segona fem el combat
        if(atac1>defensa){
            console.log("guanya1")
        }
        else if(atac1<defensa){
            console.log("perd")
        }
        else{
            console.log("empat")
        }
        document.getElementById("reload").style.visibility = 'visible';
        
    }
}

function reload(){
    var element =  document.getElementsByClassName('is-flipped');
    while(element.length>0){
        element[0].classList.remove('is-flipped')
    }
    document.getElementById("reload").style.visibility = 'hidden';
}