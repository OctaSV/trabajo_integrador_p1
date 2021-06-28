window.addEventListener('load', function () {

    let gifLoading = document.querySelector('.gif');
    gifLoading.style.display = 'none';

    let queryString = location.search //Caputramso qs
    let queryStringToObject = new URLSearchParams(queryString); //La transformamos en OL
    let aBuscar = queryStringToObject.get('search'); //Acá va el name del campo input del formulario.


    let datoBuscado = document.querySelector('.busqueda');
    datoBuscado.innerText = `"${aBuscar}"`;
    datoBuscado.style.textTransform = 'uppercase';


    let url = `https://cors-anywhere.herokuapp.com/https://api.deezer.com/search?q=${aBuscar}`

    fetch(url)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            //Aca muestro código
            console.log(data);
            let lista = document.querySelector('.resultado');
            let contenidoLista = '';

            for (let i = 0; i < data.data.length; i++) {
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

            if (data.data.length == 0) {
                let SearchTrue = document.querySelector('.article-resultado');
                let SearchFalse = document.querySelector('.article-noresultados');
                SearchTrue.style.display = 'none'
                SearchFalse.style.display = 'flex'
            }
        })
        .catch(function (error) {
            console.log(error);
        })

    //Validando Formulario
    let formulario = document.querySelector('form');
    let campoBuscar = document.querySelector('[name="search"]');
    let alert = document.querySelector('.alert');
    let alertIcon = document.querySelector('.alertIcon');

    formulario.addEventListener('submit', function (e) {
        e.preventDefault();
        if (campoBuscar.value == "") {
            alert.innerText = 'EL CAMPO NO PUEDE ESTAR VACÍO';
            alertIcon.style.display = 'inline'
        } else if (campoBuscar.value.length <= 3) {
            alert.innerText = 'POR FAVOR INGRESE MÁS DE TRES CARÁCTERES';
            alertIcon.style.display = 'inline'
        } else {
            this.submit();
        }
    })


    // Recomendados

    let urlRecomendados = `https://cors-anywhere.herokuapp.com/https://api.deezer.com/chart`

    fetch(urlRecomendados)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {

            console.log(data);
            let listaResultados = document.querySelector('.recomendado');
            let contenidoListaResultados = '';

            let cancionRecomendada = data.tracks.data[0].title;
            let imagenCancionRecomendada = data.tracks.data[0].album.cover;

            let albumRecomendado = data.albums.data[0].title;
            let imagenAlbumRecomendado = data.albums.data[0].cover;

            let artistaRecomendado = data.artists.data[0].name;
            let imagenArtistaRecomendao = data.artists.data[0].picture;

            let cancionB = data.tracks.data[0].id;
            let albumB = data.albums.data[0].id;
            let artistaB = data.artists.data[0].id;


            contenidoListaResultados += `<h4>Recomendados</h4>
                                            <ul>
                                                <li>
                                                    <a href="./detail-track.html?id=${cancionB}"><img src="${imagenCancionRecomendada}" alt=""></a>
                                                    <a href="./detail-track.html?id=${cancionB}">Canción: ${cancionRecomendada}</a>
                                                </li>
                                                <li>
                                                    <a href="./detail-album.html?id=${albumB}"><img src="${imagenAlbumRecomendado}" alt=""></a>
                                                    <a href="./detail-album.html?id=${albumB}">Album: ${albumRecomendado}</a>
                                                </li>
                                                <li>
                                                    <a href="./detail-artist.html?id=${artistaB}"><img src="${imagenArtistaRecomendao}" alt=""></a>
                                                    <a href="./detail-artist.html?id=${artistaB}">Artista: ${artistaRecomendado}</a>
                                                </li>
                                            </ul>``

            listaResultados.innerHTML += contenidoListaResultados

        })
})