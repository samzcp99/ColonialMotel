
var google;

function init() {
    var mapElement = document.getElementById('map');
    if (!mapElement || typeof google === 'undefined' || !google.maps) {
        return;
    }

    // Center map on Invercargill (approximate).
    var myLatlng = new google.maps.LatLng(-46.4132, 168.3538);
    
    var mapOptions = {
        // How zoomed in you want the map to start at (always required)
        zoom: 13,

        // The latitude and longitude to center the map (always required)
        center: myLatlng,

        // How you would like to style the map. 
        scrollwheel: false,
        styles: [
            {
                "featureType": "administrative.country",
                "elementType": "geometry",
                "stylers": [
                    {
                        "visibility": "simplified"
                    },
                    {
                        "hue": "#ff0000"
                    }
                ]
            }
        ]
    };

    

    // Create the Google Map using our element and options defined above
    var map = new google.maps.Map(mapElement, mapOptions);

    new google.maps.Marker({
        position: myLatlng,
        map: map
    });
    
}
google.maps.event.addDomListener(window, 'load', init);