$( document ).ready(function() {
    user_name = $('.user-name').text().slice(1,2);
    $('.user-letter').text(user_name.toUpperCase());
  
    fetch("https://api.coingecko.com/api/v3/coins?per_page=100&page=1")
      .then((data) => data.json())
      .then((data) => {
        displayData(data);
        return data;
      });

    function displayData(data) {
        $.each(data, function(index, value) {
            console.log(value);
            if(value) {
                var d7Sign = Math.sign(value.market_data.price_change_percentage_7d);
                var hr24Sign = Math.sign(value.market_data.price_change_percentage_24h);

                $('#crypto-list').append('<tr>'+
                                            '<td>' + (index + 1) + '</td>' +
                                            '<td class="align-left">'+
                                                '<img class="crypto-img" src="' + value.image.thumb + '">' +
                                                '<span class="crypto-fullname"> ' + value.name + '</span>'+
                                            '</td>'+
                                            '<td>'+
                                                '<p class="crypto-name">' + value.symbol.toUpperCase() + '</p>'+
                                            '</td>'+
                                            '<td>'+
                                                '<p class="crypto-price">$' + commaSeparateNumber(value.market_data.current_price.usd) + '</p>'+
                                            '</td>'+
                                            '<td>'+
                                                '<p class="crypto-24h ' + ConvertIntToColor(hr24Sign) + '">' + value.market_data.price_change_percentage_24h + '%</p>'+
                                            '</td>'+
                                            '<td>'+
                                                '<p class="crypto-7d ' + ConvertIntToColor(d7Sign) + '">' + value.market_data.price_change_percentage_7d + '%</p>'+
                                            '</td>'+
                                            '<td>'+
                                                '<p class="crypto-24h-volume">$' + commaSeparateNumber(value.market_data.total_volume.usd) + '</p>'+
                                            '</td>'+
                                            '<td>'+
                                                '<p class="crypto-marketcap">$' + commaSeparateNumber(value.market_data.market_cap.usd) + '</p>'+
                                            '</td>'+
                                            '<td>'+
                                                '<a class="button" href="coin=' + value.id + '">More Details</a>'+
                                            '</td>'+
                                        '</tr>');
            }
            
        }); 
        loaded();
    } 
});

function ConvertIntToColor(i) {
    if(i > 0) {
        return 'green';
    } else {
        return 'red';
    }
}

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

function commaSeparateNumber(val) {
    // remove sign if negative
    var sign = 1;
    if (val < 0) {
      sign = -1;
      val = -val;
    }
  
    // trim the number decimal point if it exists
    let num = val.toString().includes('.') ? val.toString().split('.')[0] : val.toString();
  
    while (/(\d+)(\d{3})/.test(num.toString())) {
      // insert comma to 4th last position to the match number
      num = num.toString().replace(/(\d+)(\d{3})/, '$1' + ',' + '$2');
    }
  
    // add number after decimal point
    if (val.toString().includes('.')) {
      num = num + '.' + val.toString().split('.')[1];
    }
  
    // return result with - sign if negative
    return sign < 0 ? '-' + num : num;
  }