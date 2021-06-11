// detalle gif

let queryString = location.search //Caputramso qs
let queryStringToObject = new URLSearchParams(queryString); //La transformamos en OL
let id = queryStringToObject.get('id');

let url = `https://api.giphy.com/v1/gifs/${id}?api_key=PuhlljnIs04eW2ezoSHpJ6Fov6102e4T`

fetch( url )
    .then( function(response){
        return response.json();
    })
    .then( function(data){
        //Aca muestro código
        // console.log(data);
        let section = document.querySelector('.detalle')

        section.innerHTML += `<article>
                                <h2>${data.data.title}</h2>
                                <img src="${data.data.images.original.url}">
                            </article>`
        

    })
    .catch( function(error){
        console.log(error);
    })