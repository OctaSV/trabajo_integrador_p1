window.addEventListener('load', function() {

    //Lista de gifs favoritos

    //Recupero el storage.
    let recuperoStorage = localStorage.getItem('favoritos');
    //Obtengo el array 
    let favoritos = JSON.parse(recuperoStorage);
    //destino de los datos en el html
    let lista = document.querySelector('.titulocancion');


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
            //procesar
            let tabla = document.querySelector('.contenido-tabla');
            let resultados = '';
            for (let i = 0; i < 40; i++) {
                let nombre_cancion = data.title;
                let artista_cancion = data.artist.name;
                let album_cancion = data.album.title;
                resultados += `<tr>
                                    <th class="num">
                                        #
                                    </th>
                                    <th>
                                        TÍTULO
                                    </th>
                                    <th>
                                        ALBUM
                                    </th>
                                    <th class="play">
                                        PLAY
                                    </th>
                                </tr>
                                <tr>
                                    <td class="num">
                                        1
                                    </td>
                                    <td class="titulocancion">
                                        ${nombre_cancion}-${artista_cancion}
                                    </td>
                                    <td>
                                        ${album_cancion}
                                    </td>
                                    <td class="play">
                                        <a href=""><i class="far fa-play-circle"></i></a>
                                    </td>
                                </tr>
                                <tr class="clean">
                                    <td class="boton-clean">
                                        <button>Limpiar</button>
                                    </td>
                                </tr>`
            }
            tabla.innerHTML += resultados
        })
        .catch( function(e){
            console.log(e);
        })
    }

}) 