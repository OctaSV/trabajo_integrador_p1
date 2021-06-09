window.addEventListener('load', function() {

    let url = 'https://cors-anywhere.herokuapp.com/https://api.deezer.com/track/3135556'; 

    fetch(url)
        .then(function (response){
            return response.json();
        })
        .then(function (data){
                console.log(data);

                let imagen_cancionurl = data.album.cover;
                let nombre_cancionurl = data.title;
                let nombre_albumurl = data.album.title;
                let nombre_artistaurl = data.artist.name;
                let reproductor = data.preview;

                let track_data = document.querySelector('.article-track');

                track_data.innerHTML = `<div class="track-data">
                                                <div class="image-track">
                                                        <img src="${imagen_cancionurl}" alt="track-image">
                                                </div>
                                                <h4>${nombre_cancionurl}</h4>
                                                <h4><a href="./detail-album.html">${nombre_albumurl}</a></h4>
                                                <h4><a href="./detail-artist.html">${nombre_artistaurl}</a></h4>
                                                <a href="playlist.html" class="agregarplaylist">Agregar a PLaylist</a>
                                        </div>
                                        <div class="reproductor-track">
                                                <iframe src="${reproductor}" frameborder="0"></iframe>
                                        </div>`
                                                
        })
        .catch(function(error){
                console.log(error);
        })
}) 


