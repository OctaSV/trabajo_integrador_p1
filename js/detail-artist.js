window.addEventListener('load', function () {

    let gifLoading = document.querySelector('.gif');
    gifLoading.style.display = 'none';

    let queryString = location.search
    let queryStringToObject = new URLSearchParams(queryString);
    let id = queryStringToObject.get('id');


    let url = `https://cors-anywhere.herokuapp.com/https://api.deezer.com/artist/${id}`
    //console.log(id)



    fetch(url)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);


            let listaDetalleArtistas = document.querySelector('.da-article');
            let contenidoDetalleArtistas = '';




            let imagenDetalleArtista = data.picture_big;
            let nombreDetalleArtista = data.name;





            contenidoDetalleArtistas = `<div class="da-contenedor-img">
                                            <img class="da-img" src="${imagenDetalleArtista}" alt="">
                                            </div>
                                            <div class="da-div-texto">
                                                <h2 class="da-nombre">${nombreDetalleArtista}</h2>
                                                <ul>
                                                    <li>
                                                        <h4 class="da-tracks-titulo">TOP CANCIONES:</h4>
                                                    </li>
                                                    <li>
                                                        <h4 class="da-tracks"><a href="./detail-track.html"><iframe title="deezer-widget" src="https://widget.deezer.com/widget/dark/artist/${id}/top_tracks" width="86%" height="300" frameborder="0" allowtransparency="true" allow="encrypted-media; clipboard-write"></iframe></a></h4>
                                                    </li>
                                                
                                                </ul>
                                        </div>`


            listaDetalleArtistas.innerHTML = contenidoDetalleArtistas

        })

        .catch(function (error) {
            console.log(error);
        })

    //Validando Formulario
    let formulario = document.querySelector('form');
    let campoBuscar = document.querySelector('[name="search"]');
    let alert = document.querySelector('.alert');
    let alertIcon = document.querySelector('.alertIcon');

    formulario.addEventListener('submit', function (e) {
        e.preventDefault();
        if (campoBuscar.value == "") {
            alert.innerText = 'EL CAMPO NO PUEDE ESTAR VACÍO';
            alertIcon.style.display = 'inline'
        } else if (campoBuscar.value.length <= 3) {
            alert.innerText = 'POR FAVOR INGRESE MÁS DE TRES CARÁCTERES';
            alertIcon.style.display = 'inline'
        } else {
            this.submit();
        }
    })
})