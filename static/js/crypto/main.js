$( document ).ready(function() {
    user_name = $('.user-name').text().slice(1,2);
    $('.user-letter').text(user_name.toUpperCase());
  
    fetch('https://min-api.cryptocompare.com/data/top/totalvolfull?limit=100&tsym=USD&api_key=19c50ae96520309dd4cae03a51d0e8a776e102bdf45884e1f569d9c62cb649cd')
      .then((data) => data.json())
      .then((data) => {
        displayData(data);
        return data;
      });

    function displayData(data) {
        $.each(data.Data, function(index, value) {
            console.log(value);
            if(value.DISPLAY) {
                $('#crypto-list').append('<tr>'+
                                            '<td>' + (index + 1) + '</td>' +
                                            '<td class="align-left">'+
                                                '<img class="crypto-img" src="https://www.cryptocompare.com' + value.DISPLAY.USD.IMAGEURL + '">' +
                                                '<span class="crypto-fullname"> ' + value.CoinInfo.FullName + '</span>'+
                                            '</td>'+
                                            '<td>'+
                                                '<p class="crypto-name">' + value.CoinInfo.Name + '</p>'+
                                            '</td>'+
                                            '<td>'+
                                                '<p class="crypto-price">' + value.DISPLAY.USD.PRICE + '</p>'+
                                            '</td>'+
                                            '<td>'+
                                                '<p class="crypto-1h">' + value.DISPLAY.USD.CHANGEPCTHOUR + '%</p>'+
                                            '</td>'+
                                            '<td>'+
                                                '<p class="crypto-24h">' + value.DISPLAY.USD.CHANGEPCT24HOUR + '%</p>'+
                                            '</td>'+
                                            '<td>'+
                                                '<p class="crypto-24h-volume">' + value.DISPLAY.USD.TOTALVOLUME24HTO + '</p>'+
                                            '</td>'+
                                            '<td>'+
                                                '<p class="crypto-marketcap">' + value.DISPLAY.USD.MKTCAP + '</p>'+
                                            '</td>'+
                                            '<td>'+
                                                '<a class="button" href="coin=' + value.CoinInfo.Name + '">More Details</a>'+
                                            '</td>'+
                                        '</tr>');
            }
            
        }); 
        loaded();
    } 
});

function sortObject(o) {
    var sorted = {},
    key, a = [];

    for (key in o) {
        if (o.hasOwnProperty(key)) {
                a.push(key);
        }
    }

    a.sort();

    for (key = 0; key < a.length; key++) {
        sorted[a[key]] = o[a[key]];
    }
    return sorted;
}

function searchFunction() {
    // Declare variables
    var input, filter, table, tr, i;
    input = document.getElementById('crypto-search');
    filter = input.value.toUpperCase();
    table = document.getElementById("crypto-list");
    tr = table.getElementsByTagName('tr');
  
    // Loop through all list items, and hide those who don't match the search query
    for (i = 1; i < tr.length; i++) {
      id = tr[i].getElementsByClassName("crypto-name")[0];
      fullname = tr[i].getElementsByClassName("crypto-fullname")[0];
      if (id.textContent.toUpperCase().indexOf(filter) > -1 || fullname.innerText.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
}