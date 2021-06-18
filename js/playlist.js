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
            //procesar
            let tabla = document.querySelector('.contenido-tabla');
            let resultados = '';
            let nombre_cancion = data.title;
            let artista_cancion = data.artist.name;
            let album_cancion = data.album.title;
            let duracion_cancion =  data.duration;

            lista.innerHTML += `<tr>
                                    <th class="num">
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
                                        ${nombre_cancion} - ${artista_cancion}
                                    </td>
                                    <td>
                                        ${album_cancion}
                                    </td>
                                    <td class="duracion">
                                        ${duracion_cancion}s
                                    </td>
                                </tr>
                                <tr class="clean">
                                    <td class="boton-clean">
                                        <button>Quitar</button>
                                    </td>
                                </tr>`

        })
        .catch( function(e){
            console.log(e);
        })
    }

    let num = document.querySelector('.num');
    let botonPlay = document.querySelector('.boton-play');
    let bodyT = document.querySelector('.tbody')
    bodyT.addEventListener('mouseover', function(){
        num.style.display = 'none';
        botonPlay.style.display = 'block';
    })

}) 