let cargarPag = window.addEventListener('load', function() {
        
        let gifLoading = document.querySelector('.gif');
        gifLoading.style.display = 'none';


        let queryString = location.search 
        let queryStringToObject = new URLSearchParams(queryString); 
        let id = queryStringToObject.get('id');
        
        let url_track = `https://api.deezer.com/track/${id}`;
        let proxy = 'https://cors-anywhere.herokuapp.com/'; 
        let url = proxy+url_track;
        
        fetch(url)
            .then(function (response){
                return response.json();
            })
            .then(function (data){
                    console.log(data);

                    let imagen_cancionurl = data.album.cover;
                    let AlbumID = data.album.id;
                    let ArtistID = data.artist.id;
                    let nombre_cancionurl = data.title;
                    let nombre_albumurl = data.album.title;
                    let nombre_artistaurl = data.artist.name;
 
                    document.querySelector('.image-track').innerHTML = `<img src="${imagen_cancionurl}" alt="track-image">`
                    document.querySelector('.cancion').innerHTML = `${nombre_cancionurl}`;
                    document.querySelector('.album-track').innerHTML = `<a href="./detail-album.html?id=${AlbumID}">Album: ${nombre_albumurl}</a>`;
                    document.querySelector('.artista-track').innerHTML = `<a href="./detail-artist.html?id=${ArtistID}">Artista: ${nombre_artistaurl}</a>`;
                    document.querySelector('.reproductor-track').innerHTML = `<iframe title="deezer-widget" src="https://widget.deezer.com/widget/dark/track/${id}" width="100%" height="400" frameborder="0" allowtransparency="true" allow="encrypted-media; clipboard-write" class="iframe"></iframe>`;   
            })
            .catch(function(error){
                    console.log(error);
            })
        
        
        //Agregar gif a lista de favoritos.
        let favoritos = [];

        let recuperoStorage = localStorage.getItem('favoritos');
        //Chequeando y agregando info
        if(recuperoStorage != null){
                favoritos = JSON.parse(recuperoStorage);
        }
        //Chequear ID
        if(favoritos.includes(id)){
                document.querySelector('.agregarplaylist').innerText = "Quitar de favoritos";
        }


        let agregar_playlist = document.querySelector('.agregarplaylist');
        agregar_playlist.addEventListener('click', function(e){
                e.preventDefault();

                //EL ID esta en el array?
                if(favoritos.includes(id)){
                        let idASacar = favoritos.indexOf(id);
                        favoritos.splice(idASacar, 1);
                        document.querySelector('.agregarplaylist').innerText = 'Agregar a Playlist';
                } else {
                        //Guardar ID en rray
                        favoritos.push(id);
                        console.log(favoritos);
                        document.querySelector('.agregarplaylist').innerText = 'Quitar de favoritos';
                }

                //Armamos una string
                let favParaStorage = JSON.stringify(favoritos);
                //Lo guardamos dentro del local storage
                localStorage.setItem('favoritos', favParaStorage);
                console.log(localStorage);


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