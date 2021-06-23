window.addEventListener('load', function () {

    let gifLoading = document.querySelector('.gif');
    gifLoading.style.display = 'none';

    let queryString = location.search
    let queryStringToObject = new URLSearchParams(queryString);
    let id = queryStringToObject.get('id');

    let url = `https://cors-anywhere.herokuapp.com/https://api.deezer.com/genre/${id}/artists`

    fetch(url)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data.data);

            let lista = document.querySelector('.detailGenres');
            let contenidoLista = '';

            for (let i = 0; i < data.data.length; i++) {
                let nombreArtista = data.data[i].name;
                let imagenArtista = data.data[i].picture_big;
                let idArtista = data.data[i].id
                //let nombreGenero =  CONSULTAR

                contenidoLista += `<li><a href="./detail-artist.html?id=${idArtista}"> ${nombreArtista} </a><img src="${imagenArtista}" alt=""></img></li>`

            }
            lista.innerHTML += contenidoLista
        })
        .catch(function (error) {
            console.log(error);
        })

    //Validando Formulario
    let formulario = document.querySelector('form');
    let campoBuscar = document.querySelector('[name="search"]');
    let alert = document.querySelector('.alert');
    let alertIcon = document.querySelector('.alertIcon');

    formulario.addEventListener('submit', function(e){
        e.preventDefault();
        if(campoBuscar.value == ""){
            alert.innerText = 'EL CAMPO NO PUEDE ESTAR VACÍO';
            alertIcon.style.display = 'inline'            
        } else if(campoBuscar.value.length <= 3){
            alert.innerText = 'POR FAVOR INGRESE MÁS DE TRES CARÁCTERES';
            alertIcon.style.display = 'inline'
        } else {
            this.submit();
        }
    })
})



