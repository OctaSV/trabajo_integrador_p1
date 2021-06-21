window.addEventListener('load', function() {


    let queryString = location.search //Caputramso qs
    let queryStringToObject = new URLSearchParams(queryString); //La transformamos en OL
    let aBuscar = queryStringToObject.get('search'); //Acá va el name del campo input del formulario.
    
    let datoBuscado = document.querySelector('.busqueda');
    datoBuscado.innerText = aBuscar;
    
    let url = `https://cors-anywhere.herokuapp.com/https://api.deezer.com/search?q=${aBuscar}`
    
    fetch( url )
        .then( function(response){
            return response.json();
        })
        .then( function(data){
            //Aca muestro código
            console.log(data);
            let lista = document.querySelector('.resultado');
            let contenidoLista = '';
    
            for(let i=0; i<data.data.length; i++){
                let artista = data.data[i].artist.name
                let album = data.data[i].album.title
                let cancion = data.data[i].title
                
                contenidoLista += `<li class="busquedaJs">
                                <h5>Cancion : </h5>${cancion}                       
                                <h5>Album : </h5>${album}                           
                                <h5>Artista : </h5>${artista}
                            </li>`
            }
            lista.innerHTML += contenidoLista
            
    
        })
        .catch( function(error){
            console.log(error);
        })
});