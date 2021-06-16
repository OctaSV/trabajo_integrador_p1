window.addEventListener('load', function() {


    let queryString = location.search 
    let queryStringToObject = new URLSearchParams(queryString); 
    let id = queryStringToObject.get('id');

    let url_track = `https://api.deezer.com/track/${id}`;
    let proxy = 'https://cors-anywhere.herokuapp.com/'; 
    let url = proxy+url_track;

fetch(url)
    .then(function (response){
        return response.json();
    })
    .then(function (data){
            console.log(data);

            let imagen_cancionurl = data.album.cover_medium;
            let nombre_cancionurl = data.title;
            let nombre_albumurl = data.album.title;
            let nombre_artistaurl = data.artist.name;
            let track_data = document.querySelector('.article-track');

            track_data.innerHTML = ``
                                            
    })
    .catch(function(error){
            console.log(error);
    })

}) 