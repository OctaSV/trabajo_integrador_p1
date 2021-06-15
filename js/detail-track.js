window.addEventListener('load', function() {
        
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

                let imagen_cancionurl = data.album.cover_medium;
                let nombre_cancionurl = data.title;
                let nombre_albumurl = data.album.title;
                let nombre_artistaurl = data.artist.name;
                let track_data = document.querySelector('.article-track');

                track_data.innerHTML = `<div class="track-data">
                                                <div class="image-track">
                                                        <img src="${imagen_cancionurl}" alt="track-image">
                                                </div>
                                                <h4>Canción: ${nombre_cancionurl}</h4>
                                                <h4><a href="./detail-album.html">Album: ${nombre_albumurl}</a></h4>
                                                <h4><a href="./detail-artist.html">Artisa: ${nombre_artistaurl}</a></h4>
                                                <button class="botonplaylist><a href="" class="agregarplaylist">Agregar a Playlist</a></button>
                                        </div>
                                        <div class="reproductor-track">
                                                <iframe title="deezer-widget" src="https://widget.deezer.com/widget/dark/track/${id}" width="100%" height="400" frameborder="0" allowtransparency="true" allow="encrypted-media; clipboard-write"></iframe>
                                        </div>`
                                                
        })
        .catch(function(error){
                console.log(error);
        })

        
        //Agregar gif a lista de favoritos.
        let favoritos = [];

        //Recuperar datos del storage
        let recuperoStorage = localStorage.getItem('favoritos');

        //Chequear y agregar la información de local storage en el array
        if(recuperoStorage != null){
        favoritos = JSON.parse(recuperoStorage);
        }

        //Chequear que el id esté en el array para cambiar el texto al usuario.
        if(favoritos.includes(id)){
        document.querySelector('.agregarplaylist').innerText = "Quitar de favoritos";
        }

        //Cuando el usuario haga click en "agregar a favoritos" Agregar id del gif dentro del array.
        let fav = document.querySelector('.agregarplaylist');
        console.log(fav);

        fav.addEventListener("click", function(e){
                e.preventDefault();
                
                //Chequear si el id está en el array
                if(favoritos.includes(id)){
                        let idASacar = favoritos.indexOf(id);
                        favoritos.splice(idASacar, 1);
                        document.querySelector('.agregarplaylist').innerText = "Agregar a favoritos";
                } else {
                        //Guardamos el id en el array
                        favoritos.push(id);
                        console.log(favoritos);
                        document.querySelector('.agregarplaylist').innerText = "Quitar de favoritos";
                }

                //Armamos un string
                let favParaStorage = JSON.stringify(favoritos);
                //Lo guardamos dentro de localStorage
                localStorage.setItem('favoritos', favParaStorage);
                console.log(localStorage);

        })
        
        
}) 


