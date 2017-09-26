var ajax = new Pan.Ajax();
var lat = null
var long = null;
var menuOpened = false;

function toggleMenu() {

    var elem = document.getElementById('info');
    elem.classList.toggle('opened');
}

ajax.getJson('http://unreal.io/api/track').then(
  (value) => {
    console.log(value);
    lat = value.payload.data[0].latitude;
    long = value.payload.data[0].longitude;
    initMap();

    ajax.getJson('https://api.apple-mapkit.com/v1/reverseGeocode?loc='+ lat+'%2C' +long +'&lang=en').then(
        (value) => {
            console.log(value);
            var elem = document.getElementById('data');

            var infos = value.results[0];

            for (let line of infos.formattedAddressLines) {
                const span = document.createElement('span');
                span.textContent = line;
                elem.appendChild(span);
            }
        }, (reason) => {

        }
    )

  },
  function (reason) {
    console.error(reason);
  }
);


function initMap() {

    if (lat && long) {
        map = new google.maps.Map(document.getElementById('map'), {
        zoom: 17,
        center: new google.maps.LatLng(lat,long),
        mapTypeId: 'roadmap',
        disableDefaultUI: true
        });

        var marker = new google.maps.Marker({
            position: new google.maps.LatLng(lat,long),
            map: map,
            title: 'Hello World!'
          });

          marker.set

        // Create a <script> tag and set the USGS URL as the source.
        var script = document.createElement('script');
        // This example uses a local copy of the GeoJSON stored at
        // http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.geojsonp
        script.src = 'https://developers.google.com/maps/documentation/javascript/examples/json/earthquake_GeoJSONP.js';
        document.getElementsByTagName('head')[0].appendChild(script);
    } 
  }

  window.eqfeed_callback = function(results) {
    // for (var i = 0; i < results.features.length; i++) {
    //   var coords = results.features[i].geometry.coordinates;
    //   var latLng = new google.maps.LatLng(coords[1],coords[0]);
    //   var marker = new google.maps.Marker({
    //     position: latLng,
    //     map: map
    //   });
    // }
  }
