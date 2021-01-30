$(document).ready(function () {
    // variables
    var mapIcon = "";
    var popupText = "";

    // map
    var mymap = L.map('mapid').setView([61.8, 25.7], 7);

    L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        tileSize: 512, // tällä saadaan tarkemmin näkymään paikannimet
        zoomOffset: -1, // tarvitaan kun käytetään isommilla tileSizella (ei toimi ilman)
        id: 'outdoors-v11', // outdoors-v11 kävisi kans
        accessToken: '---'
    }).addTo(mymap);

    // icons
    var yellowIcon = L.icon({
        iconUrl: 'icons/yellow-dot.png',
        iconSize: [22, 32], // size
        iconAnchor: [11, 32], // point of the icon which will correspond to marker's location
        popupAnchor: [-22, -32] // point from which the popup should open relative to the iconAnchor
    });

    var blueIcon = L.icon({
        iconUrl: 'icons/blue-dot.png',
        iconSize: [22, 32],
        iconAnchor: [11, 32],
        popupAnchor: [-22, -32]
    });

    var greenIcon = L.icon({
        iconUrl: 'icons/green-dot.png',
        iconSize: [22, 32],
        iconAnchor: [11, 32],
        popupAnchor: [-22, -32]
    });

    var redIcon = L.icon({
        iconUrl: 'icons/red-dot.png',
        iconSize: [22, 32],
        iconAnchor: [11, 32],
        popupAnchor: [-22, -32]
    });

    // AJAX-query
    $.ajax({
        url: 'kentat.json'
    }).fail(function () {
        console.log("fail!");
    }).done(function (data) {
        // loop through all courses
        $.each(data.kentat, function (index, kentta) {
            // select icon according to type
            if (kentta.Tyyppi == "Kulta") {
                mapIcon = yellowIcon;
            }
            if (kentta.Tyyppi == "Kulta/Etu") {
                mapIcon = blueIcon;
            }
            if (kentta.Tyyppi == "Etu") {
                mapIcon = greenIcon;
            }
            if (kentta.Tyyppi == "?") {
                mapIcon = redIcon;
            }
            //console.log(kentta.Tyyppi);
            //console.log(kentta);

            // create marker with that icon
            var marker = L.marker([kentta.lat, kentta.lng], {
                icon: mapIcon
            });
            // create popup-text for marker and bind it to popup
            popupText = "<h1>" + kentta.Kentta + "</h1>";
            popupText += "<p>" + kentta.Kuvaus + "</p>";
            popupText += "<span>Tyyppi: " + kentta.Tyyppi + "<span><br>";
            popupText += "<span>Osoite: " + kentta.Osoite + "<span><br>";
            popupText += "<span>Puhelin: " + kentta.Puhelin + "<span><br>";
            popupText += "<span>Email: " + kentta.Sahkoposti + "<span><br>";
            popupText += "<span>Web: <a href='" + kentta.Webbi + "'>" + kentta.Webbi + "</a><span><br>";
            marker.bindPopup(popupText);

            // finally add marker to the map
            marker.addTo(mymap);

        }); // each
    }); // ajax done
})
