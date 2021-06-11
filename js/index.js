window.addEventListener('load', function() {
    
    let url = 'https://cors-anywhere.herokuapp.com/https://api.deezer.com/chart'
    

    fetch( url )
        .then( function(response){
            return response.json();
        })
        .then( function(data){
            //Aca muestro código
            console.log(data);
            let arrayInfo = data.data
            let lista = document.querySelector('.lista');
            let contenidoLista =''; //poner el contenido a mostrar dentro de la lista.
    
            for(let i=0; i<arrayInfo.length; i++){
                contenidoLista += `<li> 
                                        <a href="detalle.html?id=${arrayInfo[i].id}">
                                         ${arrayInfo[i].title}
                                        </a>
                                    </li>`
            }
            
            lista.innerHTML += contenidoLista
    
    
        })
        .catch( function(error){
            console.log(error);
        })

    
}) 