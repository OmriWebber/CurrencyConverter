var articles = document.getElementById('articles');


$( document ).ready(function() {
    user_name = $('.user-name').text().slice(1,2);
    $('.user-letter').text(user_name.toUpperCase());
    // Load Currencies
    fetch('https://api.coingecko.com/api/v3/coins/')
    .then((data) => data.json())
    .then((data) => {
        console.log(data);
        $.each(data, function(index, value) {
            $("#news-currency-selector").append("<option class='test' value='"+ value.id + "'><span>" + value.name + "</span></option>");
            $('#news-currency-selector option[value="bitcoin"]').attr("selected",true);
        });

        var currency = $('#news-currency-selector option:selected').attr("value");
        displayNews(currency);
    });
});


function displayNews(currency){
    // Declare API query
    loaded();
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '9f889d0196mshf872e9f983ac8dep173652jsnbd9100263b81',
            'X-RapidAPI-Host': 'free-news.p.rapidapi.com'
        }
    };

    var url = 'https://free-news.p.rapidapi.com/v1/search?q=' + currency + '&lang=en';
   
    // Fetch News from API
    fetch(url, options)
        .then((data) => data.json())
        .then((data) => {
            for(let i = 0; i < data.articles.length; i++) {
                var date = new Date(data.articles[i].published_date);
                articles.innerHTML +=   "<div class='row article'>" + 
                                            "<div class='col-4'>" +
                                                "<img class='article-img' src='" + data.articles[i].media + "'>" +
                                            "</div>" +
                                            "<div class='col-8'>" + 
                                                "<p class='title'>" + data.articles[i].title + "</p>" + 
                                                "<p class='date'><span class='article-author'>" + data.articles[i].author + "</span>  |  <span class='article-date'>" + (date.toString()).slice(0,21) + "</span></p>" +
                                                "<p class='desc'>" + data.articles[i].summary + "</p>" + 
                                                "<a class='button' target='_blank' href='" + data.articles[i].link + "'>Read More</a>" + 
                                            "</div>" +    
                                        "</div>";
            }
            
    });    
}

$('#news-currency-selector').on('change', function() {  
    articles.innerHTML = "";
    let currency = $('#news-currency-selector option:selected').attr("value");
    displayNews(currency);
});

