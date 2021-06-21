window.addEventListener('load', function() {

    //Lista de gifs favoritos

    //Recupero el storage.
    let recuperoStorage = localStorage.getItem('favoritos');
    //Obtengo el array 
    let favoritos = JSON.parse(recuperoStorage);
    //destino de los datos en el html
    let lista = document.querySelector('.table');


    //Opcional avisar al usuario que no hay gifs en su lista.
    /*if(favoritos != null){
        let confirmar = confirm('Añada una canción a favoritos');
        if(confirmar == true){
            window.location.src = "./index.html";
        }
    }*/
    
    //Necesitamos recorrer el array de favoritos
    for (let i=0; i<favoritos.length; i++){
        //buscarYMostrarFavoritos
        buscarYMostrarFavoritos(favoritos[i]);
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

            document.querySelector('num').innerText = '1';
            document.querySelector('.titulocancion').innerHTML = `<a href="./detail-album.html?id=${idCancion}">${nombre_cancion}</a> - <a  href=".detail-album.html?id=${idArtista}>${artista_cancion}</a>`
            document.querySelector('.album-cancion').innerHTML = `<a href="./detail-album.html?id=${idAlbum}">${album_cancion}</a>`
            document.querySelector('.duracion').innetText = duracion_cancion

            /*lista.innerHTML += 
        `<tr>
                <th class="numT">
                #
            </th>
            <th>
                TÍTULO
            </th>
            <th>
                ALBUM
            </th>
            <th class="clock">
                <i class="far fa-clock"></i>
            </th>
        </tr>
        <tr>
            <td class="num">
               1
            </td>
            <td class= "boton-play">
                    <a href=""><i class="fas fa-play"></i></a>
            </td>
            <td class="titulocancion">
                <a href="./detail-track.html?id=${idCancion}">${nombre_cancion}</a> - <a  href=".detail-artist.html?id=${idArtista}>${artista_cancion}</a>
            </td>
            <td class="album-cancion">
                <a href="./detail-album.html?id=${idAlbum}">${album_cancion}</a>
            </td>
            <td class="duracion">
                ${duracion_cancion}
            </td>
        </tr>
        <tr class="clean">
            <td class="boton-clean">
                <button>Quitar</button>
            </td>
        </tr>`*/

        })
        .catch( function(e){
            console.log(e);
        })
    }

    /*let num = document.querySelector('.num');
    let botonPlay = document.querySelector('.boton-play');
    let bodyT = document.querySelectorAll('.tbody')
    console.log(bodyT);
    bodyT.addEventListener('mouseover', function(){
        console.log('Hola');
        num.style.display = 'none';
        botonPlay.style.display = 'block';
    })*/

}) 