$( document ).ready(function() {
    user_name = $('.user-name').text().slice(1,2);
    $('.user-letter').text(user_name.toUpperCase());

    fetch("https://api.coingecko.com/api/v3/coins/" + coin)
        .then(response => response.json())
        .then(result => displayData(result))
        .catch(error => console.log('error', error));

    loaded();

    function displayData(data) {
        console.log(data);
        
    } 

});

