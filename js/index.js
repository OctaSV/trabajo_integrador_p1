window.addEventListener('load', function () {

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
                let nombreArtista = data.tracks.data[i].artist.name

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


})