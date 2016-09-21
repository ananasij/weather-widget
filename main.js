$(document).ready(function() {
    getWeatherByLocation();
    $('#switchTempC').on('click', switchTempToC);
    $('#switchTempF').on('click', switchTempToF);
    $('#weatherByPlace').on('submit', function(e) {
        showWeatherByName();
        e.preventDefault();
    });
});

function getWeatherByLocation() {
    var lat;
    var long;
    if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(function(position) {
            lat = position.coords.latitude;
            long = position.coords.longitude;
            showWeatherByCoords(lat, long);
        });
    } else {
        $('#weatherInformation').addClass('hidden');
        $('#placeInputRow').removeClass('hidden');
    }
}

function showWeatherByCoords(lat, long) {
    var placeParameter = 'places/closest?p=' + lat + ',' + long;
    var url = getUrl(placeParameter);

    $.getJSON(url, function(json) {
        var place = json.response[0].place.name;
        $('#place').html(place);
        showWeather(lat, long);
    });
}

function showWeatherByName() {
    var lat;
    var long;
    var name = $('#placeInput').val().toLowerCase();
    var placeParameter = 'places/search?query=name:' + name;
    var url = getUrl(placeParameter);

    $.getJSON(url, function(json) {
        var place = json.response[0].place.name;
        $('#place').html(place);
        lat = json.response[0].loc.lat;
        long = json.response[0].loc.long;
        showWeather(lat, long);
    });
}

function showWeather(lat, long) {
    var weatherInfo;
    var weatherParameter = 'forecasts/closest?p=' + lat + ',' + long;
    var url = getUrl(weatherParameter);

    $.getJSON(url, function(json) {
        weatherInfo = json.response[0].periods[0];
        var tempC = weatherInfo.minTempC + ' - ' + weatherInfo.maxTempC + ' &deg;C';
        var tempF = weatherInfo.minTempF + ' - ' + weatherInfo.maxTempF + ' &deg;F';
        var feelsLikeC = weatherInfo.feelslikeC + '&deg;C';
        var feelsLikeF = weatherInfo.feelslikeF + '&deg;F';
        var weather = weatherInfo.weather;
        $('#tempC').html(tempC);
        $('#tempF').html(tempF);
        $('#feelsLikeC').html('Feels like ' + feelsLikeC);
        $('#feelsLikeF').html('Feels like ' + feelsLikeF);
        $('#weather').html(weather);

        var weatherCoded = weatherInfo.weatherPrimaryCoded.split(':')[2];
        setBackground(weatherCoded);
        $('#weatherCoded').html('Code ' + weatherCoded);

        $('#placeInputRow').addClass('hidden');
        $('#weatherInformation').removeClass('hidden');
    });
}

function switchTempToC() {
    switchTempUnit('C');
}

function switchTempToF() {
    switchTempUnit('F');
}

function switchTempUnit(unit){
    $('#containerTempF').toggleClass('hidden', unit !== 'F');
    $('#containerTempC').toggleClass('hidden', unit !== 'C');
    $('#switchTempC').toggleClass('active', unit === 'C');
    $('#switchTempF').toggleClass('active', unit === 'F');
}

function setBackground(key) {
    var imgUrl = 'url(' + backgroundImageUrls[key] + ')';
    $('body').css('background-image', imgUrl);
}

function getUrl(requestParameters) {
    var slightlyObfuscatedId = 'oAJqPxjlW39p26n';
    var id = slightlyObfuscatedId.replace(/9/g, 'YlKK').replace(/2/g, 'VhHE');
    var slightlyObfuscatedKey = 'pfisaWzKk0nQIc77cUb0Br572lQa4R6';
    var key = slightlyObfuscatedKey.replace(/z/g, 'bE5e6E').replace(/2/g, 'UVesP');

    return 'https://api.aerisapi.com/' + requestParameters + '&limit=1&client_id=' + id +
        '&client_secret=' + key;
}

var backgroundImageUrls = {
    'A': 'http://bnews.kz/storage/d6/d6ec12594270d3a58d8d1311de46e14b.jpg',
    'BD': 'https://i.ytimg.com/vi/FXHBB3eVMFo/maxresdefault.jpg',
    'BN': 'https://i.ytimg.com/vi/FXHBB3eVMFo/maxresdefault.jpg',
    'BR': 'http://www.chainimage.com/images/morning-mist-wallpaper-in-1920x1080.jpg',
    'BS': 'http://4.bp.blogspot.com/-ECq7APUhPXM/USnONsT6dXI/AAAAAAAATX4/HQtf4CIbzFw/s1600/Blowing+Snow+During+February+2013+-+Long+Ridge+of+Tennessee+Valley+Divide+-+Wayne+Riner+PNG.png',
    'BY': 'https://www.honeywell-blowingagents.com/wp-content/uploads/2013/03/storm.jpg',
    'F': 'https://images4.alphacoders.com/236/236786.jpg',
    'FR': 'http://www.publicdomainpictures.net/pictures/70000/velka/frost-patterns-on-windows-1387971944JG1.jpg',
    'H': 'http://fitgreenlean.com/wp-content/uploads/2015/09/the-haze-Singapore-boat-image.jpg',
    'IC': 'http://www.publicdomainpictures.net/pictures/70000/velka/frost-patterns-on-windows-1387971944JG1.jpg',
    'IF': 'http://www.wallhd4.com/wp-content/uploads/2015/03/ice-mountains-fog-6.jpeg',
    'IP': 'http://3.bp.blogspot.com/-HPAjZrLm6zc/UrdrJr-pxbI/AAAAAAAAExg/KjbFFumWLfM/s1600/DSC_0729.JPG',
    'K': 'http://fitgreenlean.com/wp-content/uploads/2015/09/the-haze-Singapore-boat-image.jpg',
    'L': 'http://ii1.photocentra.ru/images/main53/530080_main.jpg',
    'R': 'http://www.futurenews.ca/wp-content/uploads/2014/11/rain-wallpaper.jpg',
    'RW': 'http://www.futurenews.ca/wp-content/uploads/2014/11/rain-wallpaper.jpg',
    'RS': 'https://i.ytimg.com/vi/Wsol9w4CCbg/maxresdefault.jpg',
    'SI': 'https://i.ytimg.com/vi/Wsol9w4CCbg/maxresdefault.jpg',
    'WM': 'https://i.ytimg.com/vi/Wsol9w4CCbg/maxresdefault.jpg',
    'S': 'http://cdn.pcwallart.com/images/real-snow-falling-wallpaper-1.jpg',
    'SW': 'http://cdn.pcwallart.com/images/real-snow-falling-wallpaper-1.jpg',
    'T': 'http://farmersalmanac.com/wp-content/uploads/2015/06/Thunderstorm-5best.jpg',
    'UP': 'http://www.fondosya.com/wallpapers/cyclon_en_brasil-1280x800.jpg',
    'VA': 'http://ceramics.org/wp-content/uploads/2011/04/ashcloud_lo-res.jpg',
    'WP': 'http://i.huffpost.com/gen/1350312/images/o-WATERSPOUTS-LAKE-MICHIGAN-facebook.jpg',
    'ZF': 'http://www.wallhd4.com/wp-content/uploads/2015/03/ice-mountains-fog-6.jpeg',
    'ZL': 'http://4.bp.blogspot.com/_rPjuroWT65A/TSoLKGQetaI/AAAAAAAAAOU/ScIJLVyHyfI/s1600/Freezing+rain.jpg',
    'ZR': 'http://4.bp.blogspot.com/_rPjuroWT65A/TSoLKGQetaI/AAAAAAAAAOU/ScIJLVyHyfI/s1600/Freezing+rain.jpg',
    'ZY': 'http://4.bp.blogspot.com/_rPjuroWT65A/TSoLKGQetaI/AAAAAAAAAOU/ScIJLVyHyfI/s1600/Freezing+rain.jpg',
    'CL': 'http://leverhawk.com/wp-content/uploads/2013/09/iStock_000012580113Medium.jpg',
    'FW': 'http://randomwallpapers.net/clear-blue-sky-cloud-tree-nature-1920x1200-wallpaper417916.jpg',
    'SC': 'http://ekonomski.mk/wp-content/uploads/2015/02/stabilno-vreme-so-umerena-oblachnost-184186.jpg',
    'BK': 'http://www.mrwallpaper.com/wallpapers/cloudy-day-paris-france.jpg',
    'OV': 'http://4.bp.blogspot.com/-FPuSxXdxc2M/Vjk8lHffOmI/AAAAAAAAGDc/lWa8KfkP0Pw/s1600/stone-county-sky-morning-after-joplin-tornado-9-45-am-may-23-2011%255B1%255D.jpg'
};