// Create a map object
//var myMap = L.map("map", {
    //center: [37.09, -95.71],
    //zoom: 5
//});

//L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  //attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  //tileSize: 512,
  //maxZoom: 18,
  //zoomOffset: -1,
  //id: "mapbox/streets-v11",
  //accessToken: API_KEY
//}).addTo(myMap);

// Fetch and print the data to the console
// let url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// fetch(url)
// .then(res => res.json())
// .then(data =>
//   console.log('Checkout this JSON! ', data));

var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Perform a GET request to the query URL
d3.json(queryUrl).then(function(data) {
    // Once we get a response, send the data.features object to the createFeatures function
    createFeatures(data.features);
    console.log(data.features)
});
  
function createFeatures(earthquakeData) {
  
    // Define a function we want to run once for each feature in the features array
    // Give each feature a popup describing the place and time of the earthquake
    function onEachFeature(feature, layer) {
      layer.bindPopup("<h3>" + feature.properties.place +
        "</h3><hr><p>" + new Date(feature.properties.time) + "</p>");
    }
  
    // Create a GeoJSON layer containing the features array on the earthquakeData object
    // Run the onEachFeature function once for each piece of data in the array. 
    // Note: the first onEachFeature in onEachFeature:onEachFeature cannot be changes (its recognised by JSON), but the second one can be changed and 
    // needs to match the name of the previously created function.
    var earthquakes = L.geoJSON(earthquakeData, {
      onEachFeature: onEachFeature
    });
  
    // Sending our earthquakes layer to the createMap function
    createMap(earthquakes);
};

function createMap(earthquakes) {

    // Define streetmap and darkmap layers
    var streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
      attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
      tileSize: 512,
      maxZoom: 18,
      zoomOffset: -1,
      id: "mapbox/streets-v11",
      accessToken: API_KEY
    });
  
    // Define a baseMaps object to hold our base layers
    var baseMaps = {
      "Street Map": streetmap
    };
  
    // Create overlay object to hold our overlay layer
    var overlayMaps = {
      Earthquakes: earthquakes
    };
  
    // Create our map, giving it the streetmap and earthquakes layers to display on load
    var myMap = L.map("map", {
      center: [
        37.09, -95.71
      ],
      zoom: 5,
      layers: [streetmap, earthquakes]
    });
  
    // Create a layer control
    // Pass in our baseMaps and overlayMaps
    // Add the layer control to the map
    L.control.layers(baseMaps, overlayMaps, {
      collapsed: false
    }).addTo(myMap);
};

// Loop through the data array and create one marker for each earthquake object
//for (var i = 0; i < data.features.length; i++) {

    // Conditionals for earthquake's points
    //var color = "";
    //if (data.features[i].properties.mag > 7) {
      //color = "dark red";
    //}
    //else if (data.features[i].properties.mag > 6) {
      //color = "red";
    //}
    //else if (data.features[i].properties.mag > 5) {
      //color = "orange";
    //}
    //else if (data.features[i].properties.mag > 4) {
        //color = "yellow";
      //}
    //else {
      //color = "light yellow";
    //}
  
    // Add circles to map
    //L.circle(data.features[i].geometry.coordinates, {
      //fillOpacity: 0.75,
      //color: "white",
      //fillColor: color,
      // Adjust radius
      //radius: data.features[i].properties.mag * 500
    //}).bindPopup("<h1>" + data.features[i].properties.place + "</h1> <hr> <h3>Magnitude: " + data.features[i].properties.mag + "</h3>").addTo(myMap);
  
//}