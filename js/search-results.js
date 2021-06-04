window.addEventListener('load', function() {

    let busqueda = location.search
    let busquedaobj = new URLSearchParams (busqueda); 
    busquedaobj.get('search');
   
    console.log(busqueda);
}) 