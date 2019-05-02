// start of searchBarControl 
var map = L.Wrld.map("map", "3e4dcf1c1bdcaaeb147e2ce2b7ae864f", {
    center: [43.263533,-79.918973],
    zoom: 15,
    indoorsEnabled: true //enables indoorControl
});

var locations = [
    {title: "Drexel University (Main Building)", subtitle:"Philadelphia, PA", location: {latLng: L.latLng(39.9541718, -75.186816), zoom: 18, headingDegrees: 100}},
    {title: "Drexel University (Disque Hall)", subtitle:"Philadelphia, PA", location: {latLng: L.latLng(39.9545366, -75.1877259), zoom: 18, headingDegrees: 0}},
    {title: "Drexel University (Stratton Hall)", subtitle:"Philadelphia, PA", location: {latLng: L.latLng(39.9541605, -75.18797), zoom: 18, headingDegrees: 0}},
    {title: "McMaster University", subtitle:"Ontario, Canada", location: {latLng: L.latLng(43.2632857, -79.9184003), zoom: 15, headingDegrees: -30}},
    {title: "University Hall", subtitle:"MacMaster University", location: {latLng: L.latLng(43.2635047, -79.9190461), zoom: 20, headingDegrees: 0}},
];

var calculateDistSqr = function(latLng1, latLng2) {
    return Math.pow(latLng1.lat - latLng2.lat, 2) + Math.pow(latLng1.lng - latLng2.lng, 2);
};

var locationSearchService = {
    fetchNearbyLocationsByTerm: function(latLng, term, callback) {
    term = term.trim().toLowerCase();
    var results = [];
    if (term.length > 0) {
        locations.forEach(function(location) {
        var termPos = location.title.toLowerCase().indexOf(term);
        if (termPos !== -1) {
            results.push(Object.assign({}, location, { distSqr: calculateDistSqr(latLng, location.location.latLng) }));
        }
        });
    }
    results.sort(function(lhs, rhs) { return lhs.distSqr - rhs.distSqr; });
    callback(results);
    },

    fetchAutocompleteOptions: function(latLng, term, callback) {
    term = term.trim().toLowerCase();
    var options = [];
    if (term.length > 0) {
        locations.forEach(function(location) {
        var termPos = location.title.toLowerCase().indexOf(term);
        if (termPos !== -1) {
        ofptions.push(Object.assign({}, location, { pos: termPos }));
        }
        });
    }
    options.sort(function(lhs, rhs) { return lhs.pos - rhs.pos; });
    callback(options);
    }
};
//start indoorControl
var indoorControl = new WrldIndoorControl("widget-container", map);
//end of indoorControl
//
//start of searchBarControl
var searchbarConfig = {
    apiKey: "3e4dcf1c1bdcaaeb147e2ce2b7ae864f",
    locationSearchService: locationSearchService,
    outdoorSearchMenuItems: [
        {name: "Around Me", searchTag: "", iconKey: "aroundme"},
        {name: "Tourism", searchTag: "tourist_info", iconKey: "tourist_info"},
        {name: "Accommodation", searchTag: "accommodation", iconKey: "accommodation"},
        {name: "Burgers", searchTag: "burgers", iconKey: "burgers"},
        {name: "Food & Drink", searchTag: "food_drink", iconKey: "food_drink"},
        {name: "Hotel", searchTag: "hotel", iconKey: "hotel"},
        {name: "Wine", searchTag: "wine", iconKey: "wine"}
    ],
    locationJumps: [
        {name: "McMaster University Hall", latLng: [43.263533,-79.918973]},
        {name: "Drexel University (Main Building)", zoom: 20, latLng: [39.9541718, -75.186816]},
        {name: "Drexel University (Disque Hall)", zoom: 18, latLng: [39.9545366, -75.1877259]},
        {name: "Drexel University (Stratton Hall)", latLng: [39.9541605, -75.18797]},
        {name: "University Hall", zoom: 20, latLng: [43.2635047, -79.9190461]}
    ]

};
var searchbar = new WrldSearchbar("widget-container", map, searchbarConfig);
searchbar.on("searchresultsclear", clearMarkers);
searchbar.on("searchresultsupdate", addSearchResultMarkers);
searchbar.on("searchresultselect", openSelectedResultPopup);

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
//end of searchBarControl
//
//start adding markers and leaflets
var m1 = {location: [39.9541718, -75.186816], property: {elevation: 0, title: "Main Building - Drexel University"}}
var m2 = {location: [39.9545366, -75.1877259], property: {elevation: 0, title: "Disque hall - Drexel University"}}
var m3 = {location: [39.9541605, -75.18797], property: {elevation: 0, title: "Straton hall - Drexel University"}}
var m4 = {location: [43.2632857, -79.9184003], property: {elevation: 0, title: "MacMaster University"}}
var m5 = {location: [43.2635047, -79.9190461], property: {elevation: 0, title: "University hall - McMaster University"}}
var m6 = {location: [39.9545366, -75.1877259], property: {elevation: 0, title: "Drexel University"}}

var marker1 = L.marker(m1.location, m1.property).addTo(map);
var marker2 = L.marker(m2.location, m2.property).addTo(map);
var marker3 = L.marker(m3.location, m3.property).addTo(map);
var marker4 = L.marker(m4.location, m4.property).addTo(map);
var marker5 = L.marker(m5.location, m5.property).addTo(map);
var marker6 = L.marker(m6.location, m6.property).addTo(map);

marker1.bindPopup(m1.property.title).openPopup();
marker2.bindPopup(m2.property.title).openPopup();
marker3.bindPopup(m3.property.title).openPopup();
marker4.bindPopup(m4.property.title).openPopup();
marker5.bindPopup(m5.property.title).openPopup();
marker6.bindPopup(m6.property.title).openPopup();
//end adding markers and leaflets
//