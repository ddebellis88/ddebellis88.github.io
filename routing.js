//start of Routing
var routeLines = [];

var _onRoutesLoaded = function(routes) {
    // Each step in the route will be on a single floor.
    for (var stepIndex = 0; stepIndex < routes[0].length; ++stepIndex) {
        var step = routes[0][stepIndex];
        var routeLine = new L.polyline(step.points,
        {
        indoorMapId: step.indoorMapId,
        indoorMapFloorId: step.indoorMapFloorId
        });
        routeLine.addTo(map);
        routeLines.push(routeLine);
    }
};

var getRoute = function() {
    var startPoint = [43.263439997535691,-79.918974115517202, 0];
    var endPoint = [43.26337353676017,-79.918973001283504, 0];

    map.routes.getRoute([startPoint, endPoint], _onRoutesLoaded);
};


function toggleIndoorButtonVisibility() {
    var element = document.getElementById("floorButtons");
    element.style.visibility = element.style.visibility === "visible" ? "hidden" : "visible";
}

function onIndoorMapEntered(event) {
    toggleIndoorButtonVisibility();
}

function onIndoorMapExited(event) {
    toggleIndoorButtonVisibility();

    for (var routeIndex = 0; routeIndex < routeLines.length; ++routeIndex) {
        map.removeLayer(routeLines[routeIndex]);
    }
}

function onIndoorMapExpanded(event) {
    for (var routeIndex = 0; routeIndex < routeLines.length; ++routeIndex) {
        L.setOptions(routeLines[routeIndex], { displayOption: "currentIndoorMap" });
    }
}

function onIndoorMapCollapsed(event) {
    for (var routeIndex = 0; routeIndex < routeLines.length; ++routeIndex) {
        L.setOptions(routeLines[routeIndex], { displayOption: "currentFloor" });
    }
}

map.indoors.on("indoormapenter", onIndoorMapEntered);
map.indoors.on("indoormapexit", onIndoorMapExited);
map.indoors.on("expand", onIndoorMapExpanded);
map.indoors.on("collapse", onIndoorMapCollapsed);
//end of Routing
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


// // Indicate our current location with a circle
//var TempIndoorMapId = indoorMapId;
// var myLocation = L.latLng([37.786542, -122.386022]);

// var circle = L.circle(
//     myLocation,
//     {
//         color: 'red',
//         fillColor: '#f03',
//         fillOpacity: 0.5,
//         radius: 50.0
//         //radius: 2.0,
//         //color: "#0000ff",
//         //indoorMapId: indoorMapId,
//         //indoorMapFloorId: 0
//     }
// ).addTo(map);

// //SearchBar Nav
// searchbar.on("searchresultselect", selectSearchResult);

// function selectSearchResult(event) {
//     var location = event.result.location;
   
//     var resultCoord = location.latLng;
//     var resultFloorId = location.floorIndex;
   
//     var coordWithFloor = [resultCoord.lng, resultCoord.lat, resultFloorId];
//     var myCoordWithFloor = [myLocation.lng, myLocation.lat, 1];
   
//     map.routes.getRoute([myCoordWithFloor, coordWithFloor], displayRoute);
//    }

// // Add a layer group to contain our route polylines
// var routeLines = L.layerGroup();
// routeLines.addTo(map);

// // Draw polylines representing a route
// function displayRoute(routes) {
//  routeLines.clearLayers();

//  for (var i = 0; i < routes[0].length; ++i) {
//    var step = routes[0][i];
//    var polyline = L.polyline(step.points, { indoorMapId: step.indoorMapId, indoorMapFloorId: step.indoorMapFloorId });
//    polyline.addTo(routeLines);
//  }
// }