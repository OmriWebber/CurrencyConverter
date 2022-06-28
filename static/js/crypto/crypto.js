$( document ).ready(function() {
    user_name = $('.user-name').text().slice(1,2);
    $('.user-letter').text(user_name.toUpperCase());

    fetch("https://api.coingecko.com/api/v3/coins/")
        .then(response => response.json())
        .then(result => displayData(result))
        .catch(error => console.log('error', error));

    function displayData(data) {
        console.log(data);
        var name = toUpperCaseFirstLetter(data.id)
        $('.crypto-title').text(name);
        $('.crypto-desc').html(data.description.en);
        $('.crypto-icon').attr("src", data.image.large);
        $('.crypto-mktcap').text("$" + commaSeparateNumber(data.market_data.market_cap.usd));
        $('.crypto-24hrvol').text("$" + commaSeparateNumber(data.market_data.total_volume.usd));
        if(data.market_data.fully_diluted_valuation > 0){
            $('.crypto-dilutedvalue').text("$" + commaSeparateNumber(data.market_data.fully_diluted_valuation.usd));
        }
        if(data.market_data.circulating_supply > 0){
            $('.crypto-circsupply').text(commaSeparateNumber(data.market_data.circulating_supply));
        }
        if(data.market_data.total_supply > 0){
            $('.crypto-totalsupply').text(commaSeparateNumber(data.market_data.total_supply));
        }
        if(data.market_data.max_supply > 0){
            $('.crypto-maxsupply').text(commaSeparateNumber(data.market_data.max_supply));
        }

        loaded();
    } 

});

function toUpperCaseFirstLetter(str){
    const arr = str.split(" ");
    //loop through each element of the array and capitalize the first letter.
    for (var i = 0; i < arr.length; i++) {
        arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
    }
    //Join all the elements of the array back into a string 
    //using a blankspace as a separator 
    const str2 = arr.join(" ");
    return str2;
}

// Format Numbers with Commas
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
