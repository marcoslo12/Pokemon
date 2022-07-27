window.addEventListener('load', function() {
    let elem = document.getElementById("containercombat"); 
    for(let i=0;i<10;i++){
        //falta duplicados
        let random = Math.floor(Math.random() * 905);
        fetch('https://pokeapi.co/api/v2/pokemon/' + random)
        .then(response => response.json())
        .then(data => {
            newItem = '<div class=\"card\">';
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
            newItem += '</div>';
            elem.innerHTML += newItem;
        });
    }

});