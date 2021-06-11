window.addEventListener('load', function() {

    //Lista de gifs favoritos

    //Recupero el storage.
    let recuperoStorage = localStorage.getItem('favoritos');
    //Obtengo el array 
    let favoritos = JSON.parse(recuperoStorage);
    //destino de los datos en el html
    let lista = document.querySelector('.titulocancion');


    //Opcional avisar al usuario que no hay gifs en su lista.
    if(favoritos != ull){
        alert('Añada una canción a favoritos');
        window.location.src = "./index.html";
    }
    
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
            console.log(data);
            //procesar
            let nombre_cancionurl = data.title;
            let resultados = '';
            lista.innerText = nombre_cancionurl
         
        
        })
        .catch( function(e){
            console.log(e);
        })
    }

}) 