window.addEventListener('load', function () {

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

                contenidoLista += `<li><a href="./detail-artist.html?id=${idArtista}"> ${nombreArtista} </a> </li><img src="${imagenArtista}" alt=""></img>`

            }
            lista.innerHTML += contenidoLista
        })
        .catch(function (error) {
            console.log(error);
        })
})



