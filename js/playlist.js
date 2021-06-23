window.addEventListener('load', function() {

    let gifLoading = document.querySelector('.gif');
    gifLoading.style.display = 'none';

    //Recupero el storage.
    let recuperoStorage = localStorage.getItem('favoritos');
    //Obtengo el array 
    let favoritos = JSON.parse(recuperoStorage);
    //destino de los datos en el html
    let lista = document.querySelector('.table');

    //Avisar al usuario que no hay canciones en su lista.
    if(recuperoStorage == undefined ||  favoritos.length ==0){

        let alerta = confirm('Añada una canción a favoritos');
        if(alerta == true){
            window.location.src = './index.html';
        }

    } else{
        //Necesitamos recorrer el array de favoritos
        for (let i=0; i<favoritos.length; i++){
            //buscarYMostrarFavoritos
            buscarYMostrarFavoritos(favoritos[i]);
        }
    }
    
    function buscarYMostrarFavoritos(id){

        let url = `https://cors-anywhere.herokuapp.com/https://api.deezer.com/track/${id}`
        
        fetch(url)
        .then( function(response){
            return response.json();
        })
        .then(function(data){
            console.log(data)
            //procesar
            
            let resultados = '';
            let idCancion = data.id;
            let idAlbum =  data.album.id;
            let idArtista = data.artist.id;
            let nombre_cancion = data.title;
            let artista_cancion = data.artist.name;
            let album_cancion = data.album.title;
            let duracion_cancion =  data.duration;

            lista.innerHTML += `<tr>
                                    <td class="quitBoton">
                                    <a href="./detail-track.html?id=${idCancion}"><i class="far fa-minus-square"></i></a>
                                    </td>
                                    <td class="titulocancion">
                                        <a href="./detail-track.html?id=${idCancion}">${nombre_cancion}</a> - <a href=".detail-artist.html?id=${idArtista}">${artista_cancion}</a>
                                    </td>
                                    <td class="album-cancion">
                                        <a href="./detail-album.html?id=${idAlbum}">${album_cancion}</a>
                                    </td>
                                    <td class="player">
                                        <a href="./detail-track.html?id=${idCancion}"><i class="fas fa-play playerHoover"></i></a>
                                    </td>
                                    <td class="duracion">
                                        ${duracion_cancion}sg
                                    </td>
                                </tr>`
        
        })
        .catch( function(e){
            console.log(e);
        })
    }
    
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