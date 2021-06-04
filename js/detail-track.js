window.addEventListener('load', function() {
    
    let url = 'https://cors-anywhere.herokuapp.com/https://api.deezer.com/track/3135556';

    fetch(url)
        .then(function (response){
            return response.json();
        })
        .then(function (data){
            console.log(data);

            let image = data.contributors
            let image_track = document.querySelector('.image-track');

            image_track.innerHTML = `<img src="${image.md5_image}" alt="foto-tapadisco-blindingslights">`;

        })
        .catch(function(error){
            console.log(error);
        })


}) 