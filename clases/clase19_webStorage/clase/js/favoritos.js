//Lista de gifs favoritos

//Recupero el storage.
let recuperoStorage = localStorage.getItem('favoritos');
//Obtengo el array 
let favoritos = JSON.parse(recuperoStorage);
//destino de los datos en el html
let lista = document.querySelector('.lista');


//Opcional avisar al usuario que no hay gifs en su lista.

//Necesitamos recorrer el array de facoritos
for (let i=0; i<favoritos.length; i++){
    //buscarYMostrarFavoritos
    buscarYMostrarFavoritos(favoritos[i]);
}


function buscarYMostrarFavoritos(id){
    let url = `https://api.giphy.com/v1/gifs/${id}?api_key=PuhlljnIs04eW2ezoSHpJ6Fov6102e4T`
    
    fetch(url)
    .then( function(response){
        return response.json();
    })
    .then(function(data){
        //procesar
        let info = data.data;
        let resultados = '';
        lista.innerHTML += `<article>
                                    <h2>${info.title}</h2>
                                    <img src="${info.images.original.url}">
                            </article>` 
    
    })
    .catch( function(e){
        console.log(e);
    })
}