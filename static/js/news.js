var articles = document.getElementById('articles');


$( document ).ready(function() {
    // Load Currencies
    fetch('https://api.frankfurter.app/currencies')
    .then((data) => data.json())
    .then((data) => {
        $.each(data, function(index, value) {
            var datacode = JSON.stringify(value.code);
            $("#news-currency-selector").append("<option class='test' value='"+ index + "'><span>" + value + "</span></option>");
            $('#news-currency-selector option[value="USD"]').attr("selected",true);
        });

        var currency = $('#news-currency-selector option:selected').attr("value");
        displayNews(currency);
    });
});

function displayNews(currency){
    // Declare API query
    var url = 'https://newsapi.org/v2/everything?' +
            'q=' + currency + '&' +
            'from=2022-04-04&' +
            'sortBy=popularity&' +
            'language=en&' +
            'apiKey=1512bdf4d14d4a6086592e85f7ab2b70';
    // Fetch News from API
    fetch(url)
        .then((data) => data.json())
        .then((data) => {
            console.log(data);
            for(let i = 0; i < data.articles.length; i++) {
                console.log(data.articles[i]);
                articles.innerHTML += "<div class='article'><<p>" + data.articles[i].title + "</p><p>" + data.articles[i].content + "</p></div>";
            }
    });    

}

$('#news-currency-selector').on('change', function() {  
    articles.innerHTML = "";
    let currency = $('#graph-base-currency-selector option:selected').attr("value");
    displayNews(currency);
});

