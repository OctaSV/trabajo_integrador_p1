window.addEventListener('load', function() {

    let gifLoading = document.querySelector('.gif');
    gifLoading.style.display = 'none';

   
    let recuperoStorage = localStorage.getItem('favoritos');
    
    let favoritos = JSON.parse(recuperoStorage);
    
    let lista = document.querySelector('.table');

    
    if( recuperoStorage == undefined ||  favoritos.length == 0){

        let alerta = confirm('Añada una canción a favoritos');
        let quitar = document.getElementById('borrar');
        let playlistVacia = document.getElementById('vacia');
        lista.style.display = 'none'
        quitar.style.display = 'none'
        playlistVacia.style.display = 'flex'

        if(alerta == true){
            window.location.href="./index.html";
        }

    } else{
        
        for (let i=0; i<favoritos.length; i++){
            
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
            console.log(data);
            
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
        .catch(function(e){
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

    //Borrar todo del storage
    let quitar = document.getElementById('borrar');
    quitar.addEventListener('click', function(){
        localStorage.clear();
        window.location.href="./playlist.html"
    })

    //Playlist Recomendadas
    let urlPlaylistReco = 'https://cors-anywhere.herokuapp.com/https://api.deezer.com/chart';

    fetch( urlPlaylistReco )
            .then( function(response){
            return response.json();
        })
            .then( function(data){
                console.log(data);

                let playlistReco = document.querySelector('.recomendadas');
                let contenidoPlaylistReco = '';

                for(let i=0; i<4;i++){
                    let imagen_playlistReco = data.playlists.data[i].picture;
                    let title_playlistReco = data.playlists.data[i].title;
                    let id_playlistReco = data.playlists.data[i].link;
                    
                    contenidoPlaylistReco +=   `<ul>
                                                    <li>
                                                        <a href="${id_playlistReco}"><img src="${imagen_playlistReco}" alt="img-reco" class="img-playlist-reco"></a>
                                                        <a href="${id_playlistReco}">${title_playlistReco}</a>
                                                    </li>
                                                </ul>`
                }
                playlistReco.innerHTML += contenidoPlaylistReco
            })

}) 