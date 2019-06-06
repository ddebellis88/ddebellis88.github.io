//store locations for searching in navigation bar
var locations = [
    {title: "Drexel University", subtitle:"Philadelphia, PA", location: {latLng: L.latLng(39.9541716, -75.186816), zoom: 15, headingDegrees: 100}},
    {title: "Drexel University (Main Building)", subtitle:"Philadelphia, PA", location: {latLng: L.latLng(39.9541718, -75.186816), zoom: 18, headingDegrees: 100}},
    {title: "Drexel University (Disque Hall)", subtitle:"Philadelphia, PA", location: {latLng: L.latLng(39.9545366, -75.1877259), zoom: 18, headingDegrees: 0}},
    {title: "Drexel University (Stratton Hall)", subtitle:"Philadelphia, PA", location: {latLng: L.latLng(39.9541605, -75.18797), zoom: 18, headingDegrees: 0}},
    {title: "McMaster University", subtitle:"Ontario, Canada", location: {latLng: L.latLng(43.2632857, -79.9184003), zoom: 15, headingDegrees: -30}},
    {title: "University Hall", subtitle:"McMaster University", location: {latLng: L.latLng(43.2635047, -79.9190461), zoom: 20, headingDegrees: 0}},
    {title: "McMaster Health Sciences Center", subtitle:"McMaster University", location: {latLng: L.latLng(43.2595923, -79.9175896), zoom: 20, headingDegrees: -30}},
    {title: "Burke Science Building", subtitle:"McMaster University", location: {latLng: L.latLng(43.2620513, -79.9201806), zoom: 20, headingDegrees: 0}}
];
//end of store locations for searching in navigation bar
//
//algorithm for location searching
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
//end of algorithm for location searching
//
//start of menu in the navigation bar, including Find and Locations section
var searchbarConfig = {
    apiKey: "3e4dcf1c1bdcaaeb147e2ce2b7ae864f",
    locationSearchService: locationSearchService,
    outdoorSearchMenuItems: [
        {name: "Around Me", searchTag: "", iconKey: "aroundme"},
        {name: "Tourism", searchTag: "tourist_info", iconKey: "tourist_info"},
        //{name: "Accommodation", searchTag: "accommodation", iconKey: "accommodation"},
        //{name: "Burgers", searchTag: "burgers", iconKey: "burgers"},
        {name: "Food & Drink", searchTag: "food_drink", iconKey: "food_drink"},
        {name: "Hotel", searchTag: "hotel", iconKey: "hotel"},
        //{name: "Wine", searchTag: "wine", iconKey: "wine"}
    ],
    locationJumps: [
        {name: "McMaster University Hall", zoom: 20, latLng: [43.263533,-79.918973]},
        {name: "Drexel University (Main Building)", zoom: 20, latLng: [39.9541718, -75.186816]},
        {name: "Drexel University (Disque Hall)", zoom: 18, latLng: [39.9545366, -75.1877259]},
        {name: "Drexel University (Stratton Hall)", latLng: [39.9541605, -75.18797]},
        {name: "University Hall", zoom: 20, latLng: [43.2635047, -79.9190461]},
        {name: "McMaster Health Sciences Center)", latLng: [43.2595923, -79.9175896]},
        {name: "Burke Science Building", zoom: 20, latLng: [43.2620513, -79.9201806]}
    ]

};
var searchbar = new WrldSearchbar("widget-container", map, searchbarConfig);
searchbar.on("searchresultsclear", clearMarkers);
searchbar.on("searchresultsupdate", addSearchResultMarkers);
searchbar.on("searchresultselect", openSelectedResultPopup);
//end of menu in the navigation bar, including Find and Locations section
//
