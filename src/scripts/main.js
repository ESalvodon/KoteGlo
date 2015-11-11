import $ from 'jquery';

window.$ = window.jQuery = $;
require('bootstrap');

// $(() => {
// });


function initMap() {
  var origin_place_id = 0;
  var destination_place_id = 0;
  var travel_mode = google.maps.TravelMode.WALKING;
  var map = new google.maps.Map(document.getElementById('map'), {
    mapTypeControl: true,
    center: {lat: 18.5790242, lng: -72.844734},
    zoom: 9,
  });


  /*Markers*/
/*  var potty = 'images/toilet.png';
  var marker = new google.maps.Marker({
      position: {lat: -33.8688, lng: 151.2195 },
      map: map,
      icon: potty,
      title: 'Hello World!',
});

   var bottle = 'images/water-bottle.png';
   var marker = new google.maps.Marker({
   position: {lat: -32.1181532, lng: 142.7273136},
   map: map,
   icon: bottle,
   title: 'Bottle!'
 }); */


/* Multiple Markers */

var labels = '';
var labelIndex = 0;

function initialize() {
  google.maps.event.addListener(map, 'click', function(event) {
    addMarker(event.latLng, map);
  });

  // addMarker({}, map);
}

function addMarker(location, map) {
  var water = 'images/freshWater.png';
  var marker = new google.maps.Marker({
    position: location,
    label: labels[labelIndex++ % labels.length],
    map: map,
    icon: water,
    title: 'Water!'
  });
}

google.maps.event.addDomListener(window, 'load', initialize,);




  var directionsService = new google.maps.DirectionsService;
  var directionsDisplay = new google.maps.DirectionsRenderer;
  directionsDisplay.setMap(map);
  directionsDisplay.setPanel(document.getElementById('right-panel'));


  var origin_input = document.getElementById('origin-input');
  var destination_input = document.getElementById('destination-input');
  var modes = document.getElementById('mode-selector');

  map.controls[google.maps.ControlPosition.TOP_LEFT].push(origin_input);
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(destination_input);
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(modes);

  var origin_autocomplete = new google.maps.places.Autocomplete(origin_input);
  origin_autocomplete.bindTo('bounds', map);
  var destination_autocomplete =
      new google.maps.places.Autocomplete(destination_input);
  destination_autocomplete.bindTo('bounds', map);

  function expandViewportToFitPlace(map, place) {
    if (place.geometry.viewport) {
      map.fitBounds(place.geometry.viewport);
    } else {
      map.setCenter(place.geometry.location);
      map.setZoom(17);
    }
  }

  origin_autocomplete.addListener('place_changed', function() {
    var place = origin_autocomplete.getPlace();
    if (!place.geometry) {
      window.alert("Autocomplete's returned place contains no geometry");
      return;
    }
    expandViewportToFitPlace(map, place);

    origin_place_id = place.place_id;
    route(origin_place_id, destination_place_id, travel_mode,
          directionsService, directionsDisplay);
  });

  destination_autocomplete.addListener('place_changed', function() {
    var place = destination_autocomplete.getPlace();
    if (!place.geometry) {
      window.alert("Autocomplete's returned place contains no geometry");
      return;
    }
    expandViewportToFitPlace(map, place);

    destination_place_id = place.place_id;
    route(origin_place_id, destination_place_id, travel_mode,
          directionsService, directionsDisplay);
  });

  function route(origin_place_id, destination_place_id, travel_mode,
                 directionsService, directionsDisplay) {
    if (!origin_place_id || !destination_place_id) {
      return;
    }
    directionsService.route({
      origin: {'placeId': origin_place_id},
      destination: {'placeId': destination_place_id},
      travelMode: travel_mode
    }, function(response, status) {
      if (status === google.maps.DirectionsStatus.OK) {
        directionsDisplay.setDirections(response);
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });
  }

  var onChangeHandler = function() {
     calculateAndDisplayRoute(directionsService, directionsDisplay);
  };
  document.getElementById('origin-input').addEventListener('change', onChangeHandler);
  document.getElementById('destination-input').addEventListener('change', onChangeHandler);

  function setupClickListener(id, mode) {
    var radioButton = document.getElementById(id);
    radioButton.addEventListener('click', function() {
      travel_mode = mode;
    });
  }
  setupClickListener('changemode-walking', google.maps.TravelMode.WALKING);
  setupClickListener('changemode-transit', google.maps.TravelMode.TRANSIT);
  setupClickListener('changemode-driving', google.maps.TravelMode.DRIVING);
}

function calculateAndDisplayRoute(directionsService, directionsDisplay) {
  var origin_input = document.getElementById('origin-input').value;
  var destination_input = document.getElementById('destination-input').value;

//  var start = document.getElementById('origin_place_id').value;
//  var end = document.getElementById('destination_place_id').value;
  directionsService.route({
    origin: origin_input,
    destination: destination_input,
    travelMode: google.maps.TravelMode.DRIVING
  }, function(response, status) {
    if (status === google.maps.DirectionsStatus.OK) {
      directionsDisplay.setDirections(response);
    } else {
      window.alert('Directions request failed due to ' + status);
    }
  })
};

// Map for Contacts Page

function init_map1() {
    var myLocation = new google.maps.LatLng(27.7701374,-82.6364116);
    var mapOptions = {
        center: myLocation,
        zoom: 15
    };
    var map1 = new google.maps.Map(document.getElementById("map1"), mapOptions);
    var koteglo = 'images/Koteglo4.png';
    var marker = new google.maps.Marker({
        position: myLocation,
        icon: koteglo,
        map: map1,
        title: "Koteglo"
    });
    marker.setMap(map1);
}

window.initMap = initMap;
window.init_map1 = init_map1;

$(function () {
    if (window.location == window.parent.location) {
        $('#fullscreen').html('<span class="fa fa-compress"></span>');
        $('#fullscreen').attr('href', 'http://bootsnipp.com/mouse0270/snippets/rVnOR');
        $('#fullscreen').attr('title', 'Back To Bootsnipp');
    }
    $('#fullscreen').on('click', function(event) {
        event.preventDefault();
        window.parent.location =  $('#fullscreen').attr('href');
    });
    $('#fullscreen').tooltip();
});
