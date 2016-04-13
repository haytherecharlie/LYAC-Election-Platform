var address = (function () {

    var wardData = null;

    function wardFinder() {

        $.ajax({
            url: '../app/js/wards.geojson',
            dataType: 'json',
            success: function load(d) {
                wardData = d;
            }
        });

        var defaultBounds = new google.maps.LatLngBounds(
            new google.maps.LatLng(42.774235, -81.570954),
            new google.maps.LatLng(43.173135, -80.880189));

        var options = {
            types: [],
            componentRestrictions: {country: 'CA'},
            bounds: defaultBounds
        };

        var autocomplete = new google.maps.places.Autocomplete(document.getElementById('auto-comp'), options);

        google.maps.event.addListener(autocomplete, 'place_changed', function () {
            autocomplete.getPlace();
        });
    }
    wardFinder();
})();


var verify = (function() {

    $('#vote').on('click', function() {
        var value = $('#auto-comp').val();
        if(value.length !== 0) {
            var addressArray = splitByComma(value);
            if(addressArray.length !== 4) {
                $('#vote-modal').modal('show');
            } else {
               var address = spaceToUnderscore(addressArray);
                createURI(address);
            }
        } else {
            $('#vote-modal').modal('show');
        }
    });

    function splitByComma(value) {
        return value.split(',');
    }

    function spaceToUnderscore(addressArray) {
        for(i in addressArray){
            var spaces = addressArray[i];
            var underscores = spaces.split(' ').join('_');
            addressArray[i] = underscores;
        }
        return addressArray.join().split(',').join('');
    }

    function createURI(address) {
        var url = location.origin + '/vote/?address=' + address;
        window.location = url;
    }

})();
