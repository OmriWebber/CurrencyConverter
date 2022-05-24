$( document ).ready(function() {
    user_name = $('.user-name').text().slice(1,2);
    $('.user-letter').text(user_name.toUpperCase());

    var requestOptions = {
        method: 'GET',
        redirect: 'follow',
    };
    fetch("https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest", {
        method: 'GET',
        headers: {
            'X-CMC_PRO_API_KEY': '4ee9f7c5-999e-4591-9f97-2029031f14fb',
            'Access-Control-Allow-Origin': 'True',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': 'http://localhost:3000',
            'Access-Control-Allow-Credentials': 'true'

        }
    })
        .then(response => response.json())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));

    loaded();

    function displayData(data) {
        $.each(data.Data, function(index, value) {
            console.log(value);
            if(value.DISPLAY) {
            }
            
        }); 
        
    } 

});

