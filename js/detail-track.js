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
                    let duracion_cancion = data.duration;
                    let nombre_albumurl = data.album.title;
                    let nombre_artistaurl = data.artist.name;
 
                    document.querySelector('.image-track').innerHTML = `<img src="${imagen_cancionurl}" alt="track-image">`;
                    document.querySelector('.cancion').innerHTML = `Canción: ${nombre_cancionurl}`;
                    document.querySelector('.duracion').innerHTML = `${duracion_cancion} Segundos`;
                    document.querySelector('.album').innerHTML = `<a href="./detail-album.html">Album: ${nombre_albumurl}</a>`;
                    document.querySelector('.artista').innerHTML = `<a href="./detail-artist.html">Artista: ${nombre_artistaurl}</a>`;
                    document.querySelector('.reproductor-track').innerHTML = `<iframe title="deezer-widget" src="https://widget.deezer.com/widget/dark/track/${id}" width="100%" height="400" frameborder="0" allowtransparency="true" allow="encrypted-media; clipboard-write"></iframe>`;   
            })
            .catch(function(error){
                    console.log(error);
            })
        
        
        //Agregar gif a lista de favoritos.
        let favoritos = [];

        //Recuperando datos del storage
        let recuperoStorage = localStorage.getItem('favoritos');


        //Chequear que el id esté en el array para cambiar el texto al usuario.
        if(favoritos.includes(id)){
                document.querySelector('.agregarplaylist').innerText = "Quitar de favoritos";
        }

        
        //Chequeando y agregando informacion de local storage en el array
        if(recuperoStorage != null){
                favoritos = JSON.parse(recuperoStorage);
        }


        let agregar_playlist = document.querySelector('.agregarplaylist');

        agregar_playlist.addEventListener('click', function(e){
                e.preventDefault();

                //Chequear si el id está en el array
                if(favoritos.includes(id)){
                        let idASacar = favoritos.indexOf(id);
                        favoritos.splice(idASacar, 1);
                        document.querySelector('.agregarplaylist').innerText = 'Agregar a Playlist';
                } else {
                        //Guardamos el id en el array
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

})