window.addEventListener('load', function() {

    let gifLoading = document.querySelector('.gif');
    gifLoading.style.display = 'none';

    
    let queryString = location.search 
    let queryStringToObject = new URLSearchParams(queryString); 
    let id = queryStringToObject.get('id');

    let url = `https://cors-anywhere.herokuapp.com/https://api.deezer.com/album/${id}`
    //console.log(id)

fetch(url)
    .then(function (response){
        return response.json();
    })
    .then(function (data){
            console.log(data);

            let listaDetalleAlbums = document.querySelector('.album-image');
            let contenidoDetalleAlbums = '';
            let imagenAlbum = data.artist.pictre_big;
            let nombreAlbum = data.title;
            let nombreArtistaAlbum = data.artist.name;
            let generoAlbum = data.genres.data[0].name;
            let fechaPublicacion = data.release_date;
            let idArtista = data.artist.id;
            let idGenero = data.genres.data[0].id;
  
                
                contenidoDetalleAlbums = `<section class="section-album">
                                                <article class="album-data">
                                                    <h2>Album: ${nombreAlbum}</h2>
                                                    <h3><a href="./detail-artist.html?id=${idArtista}">Artista: ${nombreArtistaAlbum}</a></h2>
                                                    <h3><a href="./detail-genres.html?id=${idGenero}">Genero: ${generoAlbum}</a></h3>
                                                    <h3>Publicado en: ${fechaPublicacion}</h3>
                                                </article>
                                                <article class="album-songs">
                                                    <h2>Canciones Álbum</h2>
                                                    <ul>
                                                    <li><a href="./detail-track.html"><iframe title="deezer-widget" src="https://widget.deezer.com/widget/dark/album/${id}" width="650" height="300" frameborder="0" allowtransparency="true" allow="encrypted-media; clipboard-write"></iframe></a></li>
                                                    </ul>
                                                    <img src="${imagenAlbum}" alt="">
                                                </article>
                                            </section>`
                
        
            listaDetalleAlbums.innerHTML = contenidoDetalleAlbums
    

    })
    .catch(function(error){
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