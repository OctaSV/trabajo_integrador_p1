window.addEventListener('load', function() {


    let queryString = location.search //Caputramso qs
    let queryStringToObject = new URLSearchParams(queryString); //La transformamos en OL
    let aBuscar = queryStringToObject.get('search'); //Acá va el name del campo input del formulario.
    


    let url = `https://cors-anywhere.herokuapp.com/https://api.deezer.com/search?q=${aBuscar}`

    let datoBuscado = document.querySelector('.busqueda');
    datoBuscado.innerText = `"${aBuscar}"`;
    datoBuscado.style.textTransform = 'uppercase';
    
   
    
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
                let artista = data.data[i].artist.name;
                let album = data.data[i].album.title;
                let cancion = data.data[i].title;
                let TrackID = data.data[i].id;
                let AlbumID = data.data[i].album.id;
                let ArtistID = data.data[i].artist.id;

                contenidoLista += `<li class="busquedaJs">
                                <h3><a href="./detail-track.html?id=${TrackID}">Cancion: ${cancion}</a></h3>                    
                                <h3><a href="./detail-album.html?id=${AlbumID}">Album: ${album}</a>                       
                                <h3><a href="./detail-artist.html?id=${ArtistID}">Artista: ${artista}</a></h3>
                            </li>`
            }
            lista.innerHTML += contenidoLista
            
            if(data.data.length == 0){
                let SearchTrue = document.querySelector('.article-resultado');
                let SearchFalse = document.querySelector('.article-noresultados');
                SearchTrue.style.display = 'none'
                SearchFalse.style.display = 'flex'
            }
        })
        .catch( function(error){
            console.log(error);
        })
    
    //Validando Formulario
    let formulario = document.querySelector('form');
    let campoBuscar = document.querySelector('[name="search"]');
    let alert = document.querySelector('.alert');
    let alertIcon = document.querySelector('.alertIcon');

    formulario.addEventListener('submit', function(e){
        e.preventDefault();
        if(campoBuscar.value == ""){
            alert.innerText = 'EL CAMPO NO PUEDE ESTAR VACÍO';
            alertIcon.style.display = 'inline'            
        } else if(campoBuscar.value.length <= 3){
            alert.innerText = 'POR FAVOR INGRESE MÁS DE TRES CARÁCTERES';
            alertIcon.style.display = 'inline'
        } else {
            this.submit();
        }
    })
})