window.addEventListener('load', function () {

    let gifLoading = document.querySelector('.gif');
    gifLoading.style.display = 'none';

    let url = 'https://cors-anywhere.herokuapp.com/https://api.deezer.com/chart'


    fetch(url)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            //Aca muestro código
            console.log(data);

            let lista = document.querySelector('.main-canciones');
            let contenidoLista = ''; //poner el contenido a mostrar dentro de la lista.

            for (let i = 0; i < 5; i++) {

                let id = data.tracks.data[i].id;
                let imagenCanciones = data.tracks.data[i].album.cover_big;
                let tituloCanciones = data.tracks.data[i].title;
                let nombreArtista = data.tracks.data[i].artist.name;

                contenidoLista += `<a href="./detail-track.html?id=${id}">
                                        <article class="canciones">
                                            <div class="img-container">
                                                <img class="index-img" src="${imagenCanciones}" alt="">
                                            </div>
                                            <h5 class="titulo-elementos">${tituloCanciones}</h5>
                                            <p class="texto-elementos">${nombreArtista}</p>
                                        </article>
                                    </a>`
            }

            lista.innerHTML += contenidoLista


        })
        .catch(function (error) {
            console.log(error);
        })

        // Fetch Albums

        fetch(url)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            //Aca muestro código
            console.log();

            let lista = document.querySelector('.main-albums');
            let contenidoLista = ''; //poner el contenido a mostrar dentro de la lista.

            for (let i = 0; i<5; i++) {

                let idAlbum = data.albums.data[i].id;
                let imagenAlbums = data.albums.data[i].cover_big;
                let tituloAlbums = data.albums.data[i].title;
                let artistaAlbums = data.albums.data[i].artist.name;

                contenidoLista += `<a href="./detail-album.html?id=${idAlbum}">
                <article class="albums">
                    <div class="img-container">
                        <img class="index-img" src="${imagenAlbums}" alt="">
    
                    </div>
                    <h5 class="titulo-elementos">${tituloAlbums}</h5>
                    <p class="texto-elementos">${artistaAlbums}</p>
    
                </article>
            </a>`
            }

            lista.innerHTML += contenidoLista


        })
        .catch(function (error) {
            console.log(error);
        })


        //FETCH ARTISTAS

        fetch(url)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            //Aca muestro código
            console.log(data);

            let lista = document.querySelector('.main-artistas');
            let contenidoLista = ''; //poner el contenido a mostrar dentro de la lista.

            for (let i = 0; i < 5; i++) {

              //  let id = data.albums.data[i].id;
                let imagenArtists = data.artists.data[i].picture_big;
                let tituloArtists = data.artists.data[i].name;
                let idArtista = data.artists.data[i].id
               

                contenidoLista += `<a href="./detail-artist.html?id=${idArtista}">
                <article class="artistas">
                    <div class="img-container">
                        <img class="index-img" src="${imagenArtists}" alt="">
    
                    </div>
                    <h5 class="titulo-elementos">${tituloArtists}</h5>
    
                </article>
            </a>`
            }

            lista.innerHTML += contenidoLista


        })
        .catch(function (error) {
            console.log(error);
        })
})