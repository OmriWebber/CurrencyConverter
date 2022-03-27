var url = 'https://newsapi.org/v2/everything?' +
          'q=USD&' +
          'from=2022-03-21&' +
          'sortBy=popularity&' +
          'apiKey=1512bdf4d14d4a6086592e85f7ab2b70';

var req = new Request(url);

fetch(req)
    .then(function(response) {
        console.log(response.json());
    })