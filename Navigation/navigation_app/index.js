// Importing mongoose and defining the DB URL
const mongoose = require('mongoose');
const dbUrl = 'mongodb+srv://mofaith489:Virus202...@cluster0.ydph7v9.mongodb.net/test?retryWrites=true&w=majority';

// Connection parameters
const connectionParams = {
  useNewUrlParser: true,
  useUnifiedTopology: true
};

// Connect to MongoDB
mongoose.connect(dbUrl, connectionParams)
  .then(() => {
    console.info('Connected to the database');
  })
  .catch((error) => {
    console.error('Error connecting to the database:', error);
  });




//Create the variables that will be used within the map configuration options.

var librariesStyle = [
    {
      "featureType": "landscape",
      "elementType": "geometry",
      "stylers": [
        { "visibility": "on" },
        { "color": "#ffa000" }
      ]
    },{
      "elementType": "labels.text.fill",
      "stylers": [
        { "visibility": "on" },
        { "color": "#ffffff" }
      ]
    },{
      "elementType": "labels.text.stroke",
      "stylers": [
        { "visibility": "off" }
      ]
    },{
      "featureType": "road.arterial",
      "elementType": "geometry.fill",
      "stylers": [
        { "visibility": "on" },
        { "color": "#a2a2a2" }
      ]
    },{
      "featureType": "road.highway",
      "elementType": "geometry.stroke",
      "stylers": [
        { "visibility": "off" }
      ]
    },{
      "featureType": "road.arterial",
      "elementType": "geometry.stroke",
      "stylers": [
        { "visibility": "off" }
      ]
    },{
      "featureType": "road.local",
      "elementType": "geometry.fill",
      "stylers": [
        { "color": "#808080" },
        { "visibility": "on" }
      ]
    },{
      "featureType": "road.local",
      "elementType": "geometry.stroke",
      "stylers": [
        { "visibility": "on" },
        { "color": "#808080" }
      ]
    },{
      "featureType": "water",
      "elementType": "geometry.fill",
      "stylers": [
        { "color": "#0083a9" }
      ]
    },{
      "featureType": "water",
      "elementType": "geometry.stroke",
      "stylers": [
        { "visibility": "off" }
      ]
    },{
    }
  ];
  
  var styledLibraries = new google.maps.StyledMapType(librariesStyle, {name: "libraries style"});
  //The latitude and longitude of the center of the map.
  var librariesMapCenter = new google.maps.LatLng(-34.037849, 151.084453);
  //The degree to which the map is zoomed in. This can range from 0 (least zoomed) to 21 and above (most zoomed).
  var librariesMapZoom = 12;
  //The max and min zoom levels that are allowed.
  var librariesMapZoomMax = 18;
  var librariesMapZoomMin = 8;
  //These options configure the setup of the map. 
  var librariesMapOptions = {
    center: librariesMapCenter,
    zoom: librariesMapZoom,
    //The type of map. In addition to ROADMAP, the other 'premade' map styles are SATELLITE, TERRAIN and HYBRID. 
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    maxZoom: librariesMapZoomMax,
    minZoom: librariesMapZoomMin,
    //Turn off the map controls as we will be adding our own later.
    panControl: false,
    rotateControl: true,
    mapTypeControl: false,
    mapTypeIds: [ 'mapStylesLibraries']
  };
  
  //Create the variable for the main map itself.
  var librariesMap;
  //When the page loads, the line below calls the function below called 'loadFestivalMap' to load up the map.
  google.maps.event.addDomListener(window, 'load', loadLibrariesMap);
  
  //THE MAIN FUNCTION THAT IS CALLED WHEN THE WEB PAGE LOADS 
  function loadLibrariesMap() {
  
    //The empty map variable ('librariesMap') was created above. The line below creates the map, assigning it to this variable. The line below also loads the map into the div with the id 'festival-map' (see code within the 'body' tags below), and applies the 'librariesMapOptions' (above) to configure this map. 
    librariesMap = new google.maps.Map(document.getElementById("map"), librariesMapOptions);
    librariesMap.mapTypes.set('mapStylesLibraries', styledLibraries);
    librariesMap.setMapTypeId('mapStylesLibraries');
    
    //Calls the function below to load up all the map markers.
    loadMapMarkers();
    
    //Listens for click on markers and open infobox
    markerSutherland.addListener('click', function() {
      sutherlandInfoWindow.open(librariesMap, this);
    });
    markerCronulla.addListener('click', function() {
      cronullaInfoWindow.open(librariesMap, markerCronulla);
    });
  }
  
  //Function that loads the map markers.
  function loadMapMarkers() {
    //Setting the position of the Sutherland map marker.
    var markerPositionSutherland = new google.maps.LatLng(-34.030812, 151.061893);
    //Creating the Sutherland map marker.
  
    markerSutherland = new google.maps.Marker({
      //uses the position set above.
      position: markerPositionSutherland,
      //adds the marker to the map.
      map: librariesMap,
      title: 'Sutherland Library',
        //assigns the icon image set above to the marker.
        //icon: ,
        //sets the z-index of the map marker.
        zIndex:102
    });
    
    var markerPositionCronulla = new google.maps.LatLng(-34.052597, 151.15205);
    //Creating the Sutherland map marker.
  
    markerCronulla = new google.maps.Marker({
      //uses the position set above.
      position: markerPositionCronulla,
      //adds the marker to the map.
      map: librariesMap,
      title: 'Cronulla Library',
        //sets the z-index of the map marker.
        zIndex:101
    });
  }
  
  
  //GENERATE INFOBOXES FOR MARKERS
  //declare some html content for the info box
  var sutherlandInfo = '<p><img src="https://www.sutherlandshire.nsw.gov.au/files/assets/website/images/subsites/library/libraries/sutherlandlibraryexteriorday1.jpg?w=200" alt="View of Sutherland Library from the street"></p>' +
        '<p><a href="https://www.sutherlandshire.nsw.gov.au/Community/Library/Libraries/Sutherland-Library">Sutherland Library</a> <br>' +
         '30-36 Belmont Street, Sutherland  <br>' +
         'ph 9710 0351</p>' +
         '<p><a href="https://www.sutherlandshire.nsw.gov.au/Community/Library/Libraries/Sutherland-Library" class="btn btn-default btn-xs">Opening Hours &amp; more</a></p>'; 
  
  var cronullaInfo = '<p><img src="https://www.sutherlandshire.nsw.gov.au/files/assets/website/images/subsites/library/libraries/cronullainterior.jpg?w=200" alt="Interior of Cronulla Library showing service desk"></p>' +
        '<p><a href="https://www.sutherlandshire.nsw.gov.au/Community/Library/Libraries/Cronulla-Library">Cronulla Library</a> <br>' +
         'Cronulla Central, Croydon Street, Cronulla  <br>' +
         'ph 9523 4980</p>' +
         '<p><a href="https://www.sutherlandshire.nsw.gov.au/Community/Library/Libraries/Cronulla-Library" class="btn btn-default btn-xs">Opening Hours &amp; more</a></p>'; 
  
  
  var sutherlandInfoWindow = new google.maps.InfoWindow({
    content: sutherlandInfo,
    maxWidth: 200
  });
  var cronullaInfoWindow = new google.maps.InfoWindow({
    content: cronullaInfo,
    maxWidth: 200
  });
  
  