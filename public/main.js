// Foursquare API Info
const clientId = '25LL3EY1EO3HNBAMHKIJNTQMH0YQ55P5O3RRGBSED5WTPK4J';
const clientSecret = '1ACCQF3VTYWPYY2Y0D3QWRN1I1ZOQ1KVP0A1ZRGTL00DT2JI';
const url = 'https://api.foursquare.com/v2/venues/explore?near=';

// OpenWeather Info
const openWeatherKey = '0cd1d9eaa87364ee75b290b075c73279';
const weatherUrl = 'https://api.openweathermap.org/data/2.5/weather?';

// Page Elements
const $input = $('#city');
const $submit = $('#button');
const $destination = $('#destination');
const $container = $('.container');
const $venueDivs = [$("#venue1"), $("#venue2"), $("#venue3"), $("#venue4")];
const $weatherDiv = $("#weather1");
const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

// Add AJAX functions here:

// GET VENUES

const getVenues = async () => {
  const city = $input.val();
  const urltoFetch = url+city+'&limit=10'+'&client_id='+clientId+'&client_secret='+ clientSecret + '&v=' + '20211015';

try{

  const response = await fetch(urltoFetch);
  if(response.ok){
    const jsonResponse = await response.json();
    console.log(jsonResponse);
    venues = jsonResponse.response.groups[0].items.map(parameter => parameter.venue);
  //  console.log(venues);
  return venues;
  }

}catch(error){
  console.log(error);
}

}

// GET FORECAST

const getForecast = async () => {
  const city = $input.val();
  const urltoFetch = weatherUrl+'&q='+city+'&appid='+openWeatherKey;
  //console.log(urltoFetch);
 
  try{
  const response = await fetch(urltoFetch);
  if(response.ok){
    const jsonResponse = await response.json();
    return jsonResponse;
  
  }

  }catch(error){
    console.log(error);
  }

}


// Render functions

// RENDER VENUES
const renderVenues = (venues) => {
  $venueDivs.forEach(($venue, index) => {
    // Add your code here:
    const venue = venues[index];
    const venueIcon = venues[index].categories[0].icon;
    const venueImgSrc = venueIcon.prefix + 'bg_64' + venueIcon.suffix;
    let venueContent = createVenueHTML(venue.name, venue.location, venueImgSrc);
    $venue.append(venueContent);
  });
  $destination.append(`<h2>${venues[0].location.city}</h2>`);
}


// RENDER FORECAST

const renderForecast = (day) => {

	let weatherContent = createWeatherHTML(day);
  $weatherDiv.append(weatherContent);
}

const executeSearch = () => {
  $venueDivs.forEach(venue => venue.empty());
  $weatherDiv.empty();
  $destination.empty();
  $container.css("visibility", "visible");
  getVenues().then(venues => {
    return renderVenues(venues);
  });
  getForecast().then(forecast => {
    return renderForecast(forecast);
  });
  return false;
}

$submit.click(executeSearch)
