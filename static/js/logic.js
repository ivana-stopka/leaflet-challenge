// Create a map object
var myMap = L.map("map", {
    center: [10, -20],
    zoom: 2
});

L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/streets-v11",
  accessToken: API_KEY
}).addTo(myMap);

// Create earthquake layerGroup
var earthquakes = L.layerGroup();

// Store the query URL
var queryURL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Perform a GET request to the query URL
d3.json(queryURL).then(function(data) {
    // Once we get a response, send the data.features object to the createFeatures function
    createFeatures(data.features);
    console.log(data.features)
});
  
function createFeatures(earthquakeData) {
  
    // Determine the marker size by magnitude
    function markerSize(magnitude) {
      return magnitude * 5;
    };
    
    // Determine the marker color by magnitude
    function chooseColor(magnitude) {
      switch(true) {
        case magnitude > 7:
          return "darkred";
        case magnitude > 6:
          return "red";
        case magnitude > 5:
          return "orangered";
        case magnitude > 4:
          return "orange";
        case magnitude > 3:
          return "gold";
        case magnitude > 2:
          return "yellow";
        default:
          return "green";
      }
    };

    // Give each feature a popup describing the place, time and magnitude of the earthquake
    function onEachFeature(feature, layer) {
      layer.bindPopup("<h3>Location: " + feature.properties.place +
        "</h3><hr><p>" + new Date(feature.properties.time) + 
        "</p><hr><p>Magnitude: " + feature.properties.mag + "</p>");
    }
  
    // Create a GeoJSON layer containing the features array on the earthquakeData object
    L.geoJSON(earthquakeData, {
        pointToLayer: function (feature, latlng) {  
            return L.circleMarker(latlng, 
                {
                  radius: markerSize(feature.properties.mag),
                  fillColor: chooseColor(feature.properties.mag),
                  fillOpacity: 0.7,
                  color: "white",
                  stroke: true,
                  weight: 0.5
                }
            );
        },
      onEachFeature: onEachFeature
    }).addTo(earthquakes);
  
    // Sending our earthquakes layer to the createMap function
    earthquakes.addTo(myMap);

    // Add the legend to the map
    var legend = L.control({position: "bottomright"});
    
    legend.onAdd = function() {
      var div = L.DomUtil.create("div", "legend"),
      mag = [1, 2, 3, 4, 5, 6, 7];
    
      div.innerHTML += "<h3 style='text-align: center'>Magnitude</h3>"
        for (var i =0; i < mag.length; i++) {
          div.innerHTML += 
          '<i style="background:' + chooseColor(mag[i] + 1) + '"></i> ' +
          mag[i] + (mag[i + 1] ? '&ndash;' + mag[i + 1] + '<br>' : '+');
        }
        return div;
    };
  
    legend.addTo(myMap);
};
