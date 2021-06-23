window.addEventListener('load', function() {
    
    let gifLoading = document.querySelector('.gif');
    gifLoading.style.display = 'none';

    let url = 'https://cors-anywhere.herokuapp.com/https://api.deezer.com/genre'

    fetch(url)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);

        let lista = document.querySelector('.genres-1');
        let contenidoLista = ''; 

        for ( let i=0 ; i<7 ; i++){
        let nombreGenero = data.data[i].name ; 
        let id = data.data[i].id

        contenidoLista += `<li><a href="./detail-genres.html?id=${id}"> ${nombreGenero} </a></li>`

        }
        lista.innerHTML += contenidoLista

        let lista2 = document.querySelector('.genres-2')
        let contenidoLista2 = '';

        for ( let i=7 ; i<14 ; i++){
        let nombreGenero = data.data[i].name ;        
        let id = data.data[i].id

        contenidoLista2 += `<li><a href="./detail-genres.html?id=${id}"> ${nombreGenero} </a></li>`
    
        }
        lista2.innerHTML += contenidoLista2
        
        let lista3 = document.querySelector('.genres-3')
        let contenidoLista3 = '';

        for ( let i=14 ; i<21 ; i++){
        let nombreGenero = data.data[i].name ; 
        let id = data.data[i].id       
        
        contenidoLista3 += `<li><a href="./detail-genres.html?id=${id}"> ${nombreGenero} </a></li>`
    
        }
        lista3.innerHTML += contenidoLista3
        
        let lista4 = document.querySelector('.genres-4')
        let contenidoLista4 = '';

        for ( let i=21 ; i<28 ; i++){
        let nombreGenero = data.data[i].name ; 
        let id = data.data[i].id       
        
        contenidoLista4 += `<li><a href="./detail-genres.html?id=${id}"> ${nombreGenero} </a></li>`
    
        }
        lista4.innerHTML += contenidoLista4                
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