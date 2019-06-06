//start of displaying markers
var markers = [];

function clearMarkers() {
    markers.forEach(function(marker) { marker.remove(); });
}

function addSearchResultMarkers(event) {
    clearMarkers();
    for (var poiId in event.results) {
        var result = event.results[poiId];
        var marker = L.marker(result.location.latLng, { title: result.title });
        marker.addTo(map);
        markers.push(marker);
    }
}

function openSelectedResultPopup(event) {
    map.openPopup(event.result.title, event.result.location.latLng);
}
//end of displaying markers
//
//start adding markers and leaflets
var m1 = {location: [39.9541718, -75.186816], property: {elevation: 0, title: "Main Building - Drexel University"}}
var m2 = {location: [39.9545366, -75.1877259], property: {elevation: 0, title: "Disque hall - Drexel University"}}
var m3 = {location: [39.9541605, -75.18797], property: {elevation: 0, title: "Stratton hall - Drexel University"}}
var m4 = {location: [43.2632857, -79.9184003], property: {elevation: 0, title: "MacMaster University"}}
var m5 = {location: [43.2635047, -79.9190461], property: {elevation: 0, title: "University hall - McMaster University"}}
var m6 = {location: [43.2595923, -79.9175896], property: {elevation: 0, title: "McMaster Health Sciences Center - McMaster University"}}
var m7 = {location: [43.2620513, -79.9201806], property: {elevation: 0, title: "Burke Science Building - McMaster University"}}
var m8 = {location: [43.2627625, -79.9176234], property: {elevation: 0, title: "Mills Memorial Library - McMaster University"}}
var m9 = {location: [43.263207, -79.9201646], property: {elevation: 0, title: "Edwards Hall - McMaster University"}}

var marker1 = L.marker(m1.location, m1.property).addTo(map);
var marker2 = L.marker(m2.location, m2.property).addTo(map);
var marker3 = L.marker(m3.location, m3.property).addTo(map);
var marker4 = L.marker(m4.location, m4.property).addTo(map);
var marker5 = L.marker(m5.location, m5.property).addTo(map);
var marker6 = L.marker(m6.location, m6.property).addTo(map);
var marker7 = L.marker(m7.location, m7.property).addTo(map);
var marker8 = L.marker(m8.location, m8.property).addTo(map);
var marker9 = L.marker(m9.location, m9.property).addTo(map);

marker1.bindPopup(m1.property.title).openPopup();
marker2.bindPopup(m2.property.title).openPopup();
marker3.bindPopup(m3.property.title).openPopup();
marker4.bindPopup(m4.property.title).openPopup();
marker5.bindPopup(m5.property.title).openPopup();
marker6.bindPopup(m6.property.title).openPopup();
marker7.bindPopup(m7.property.title).openPopup();
marker8.bindPopup(m8.property.title).openPopup();
marker9.bindPopup(m9.property.title).openPopup();
//end adding markers and leaflets
//
//Start adding a building highlight
// function onInitialStreamingComplete() {
//     var buildingHighlight = L.Wrld.buildings.buildingHighlight(
//         L.Wrld.buildings.buildingHighlightOptions()
//             .highlightBuildingAtLocation([43.2635047, -79.9190461], [43.2595923, -79.9175896])
//             .color([255, 255, 0, 128])
//         )
//         .addTo(map);
// }

map.on("initialstreamingcomplete", onInitialStreamingComplete);
//End adding a building highlight
//
//start drawing polygon
var polygonPoints = [
    [43.2633555, -79.9186634],
    [43.2633452, -79.919486],
    [43.2635652, -79.9194953],
    [43.2635725, -79.9190636],
    [43.2638371, -79.9190641],
    [43.2638369, -79.9188863],
    [43.2635316, -79.9188823],
    [43.2635351, -79.9186771]
];
var poly = L.polygon(polygonPoints).addTo(map);
//end of drawing polygon
//
// start of changing weather
var weathers = [L.Wrld.themes.weather.Clear, L.Wrld.themes.weather.Overcast, L.Wrld.themes.weather.Rainy, L.Wrld.themes.weather.Snowy];
var weatherIndex = 2;
setInterval(function() {
    map.themes.setWeather(weathers[weatherIndex]);
    weatherIndex = (weatherIndex + 1) % weathers.length;
}, 50000);
// end of changing weather
//
// start of changing time
var times = [L.Wrld.themes.time.Dawn, L.Wrld.themes.time.Day, L.Wrld.themes.time.Dusk, L.Wrld.themes.time.Night];
var timeIndex = 0;
setInterval(function() {
    map.themes.setTime(times[timeIndex]);
    timeIndex = (timeIndex + 1) % times.length;
}, 100000);
// end of changing time