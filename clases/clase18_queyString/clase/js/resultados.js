// resultados de busqueda

let queryString = location.search //Caputramso qs
let queryStringToObject = new URLSearchParams(queryString); //La transformamos en OL
let aBuscar = queryStringToObject.get('milanesa'); //Acá va el name del campo input del formulario.

let datoBuscado = document.querySelector('.datoBuscado');
datoBuscado.innerText = aBuscar;

let url = `https://api.giphy.com/v1/gifs/search?api_key=PuhlljnIs04eW2ezoSHpJ6Fov6102e4T&q=${aBuscar}&limit=25&offset=0&rating=g&lang=en`

fetch( url )
    .then( function(response){
        return response.json();
    })
    .then( function(data){
        //Aca muestro código
        console.log(data);
        let info = data.data;
        let section = document.querySelector('.lista');
        let resultados = '';

        for(let i=0; i<info.length; i++){
            resultados+= `<article>
                            <h2>${info[i].title}</h2>
                            <img src="${info[i].images.original.url}">
                        </article>`
        }
        section.innerHTML += resultados
        

    })
    .catch( function(error){
        console.log(error);
    })