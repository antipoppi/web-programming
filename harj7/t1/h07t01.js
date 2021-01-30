function loadMap() {
    var mymap = L.map('mapid', {
        zoomDelta: 0.5, // tällä voi rajoittaa zoomin voimakkuutta
        zoomSnap: 0.1 // Pakottaa kartan zoomitason olemaan aina tämän kerroin
    }).setView([62.240, 25.747], 14); // asettaa näkymän tiettyyn paikkaan tietyllä zoom-tasolla

    // ladataan karttalaatat mapboxin apista ja arvot osoitteessa on bindattu { }-sisään
    L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        tileSize: 512, // tällä saadaan tarkemmin näkymään paikannimet
        zoomOffset: -1, // tarvitaan kun käytetään isommilla tileSizella (ei toimi ilman)
        id: 'streets-v11', // outdoors-v11 kävisi kans
        accessToken: '---'
    }).addTo(mymap);

    // JK keskusta
    var marker = L.marker([62.2425, 25.7472]).addTo(mymap);

    // Harjun EK
    var circle = L.circle([62.242945, 25.73719], {
        color: 'yellow',
        fillColor: 'lightyellow',
        fillOpacity: 0.5,
        radius: 400
    }).addTo(mymap);

    // Kilpailukeskus
    var polygon = L.polygon([
            [62.237942, 25.751862],
            [62.238899, 25.754056],
            [62.238437, 25.755209],
            [62.237395, 25.753391]
        ]).addTo(mymap);

    // klikatessa merkintöjä tulee seuraavat tekstit
    marker.bindPopup("Jyväskylän keskusta");
    circle.bindPopup("Harjun EK");
    polygon.bindPopup("MM-ralli - Kilpailukeskus");

    // https://leafletjs.com/reference-1.6.0.html leafletin apista löytyy hyviä esimerkkejä
}
