$( document ).ready(function() {
    user_name = $('.user-name').text().slice(1,2);
    $('.user-letter').text(user_name.toUpperCase());

    var key = '780b5f3168c0a615facbc2e883c16b7599bfa908';
    fetch("https://api.nomics.com/v1/currencies/ticker?key=" + key + "&ids=BTC,ETH,XRP&interval=1d,30d&convert=EUR&platform-currency=ETH&per-page=100&page=1")
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

