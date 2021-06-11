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


//Agregar gif a lista de favoritos.
let favoritos = [];

//REcuperar datos del storage
let recuperoStorage = localStorage.getItem('favoritos');

//Chequear y agregar la información de local storage en el array
if(recuperoStorage != null){
    favoritos = JSON.parse(recuperoStorage);
}

//Chequear que el id esté en el array para cambiar el texto al usuario.
if(favoritos.includes(id)){
    document.querySelector('.fav').innerText = "Quitar de favoritos";
}



//Cuando el usuario haga click en "agregar a favoritos _> Agregar id del gif dentro del array.
let fav = document.querySelector('.fav');
console.log(fav);

fav.addEventListener("click", function(e){
    e.preventDefault();

    //Chequear si el id está en el array
    if(favoritos.includes(id)){
        let idASacar = favoritos.indexOf(id);
        favoritos.splice(idASacar, 1);
        document.querySelector('.fav').innerText = "Agregar a favoritos";
    } else {
        //Guardamos el id en el array
        favoritos.push(id);
        console.log(favoritos);
        document.querySelector('.fav').innerText = "Quitar de favoritos";
    }


    //Armamos un string
    let favParaStorage = JSON.stringify(favoritos);
    //Lo guardamos dentro de localStorage
    localStorage.setItem('favoritos', favParaStorage);
    console.log(localStorage);

})
