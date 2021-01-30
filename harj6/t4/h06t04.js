// tynnyrin tietoja
var syvyys = 1;
var halkaisija = 2;

function drawCanvas() {
    var value = document.getElementById("myRange").value;
    updateHeight(value);
    draw(value);
}

function updateHeight(value) {
    // päivitetään currentHeight-spanin sisältö
    document.getElementById("currentHeight").innerHTML = value.toString();
}

function draw(value) {
    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");
    // pyyhitään taulu
    ctx.clearRect(0, 0, c.width, c.height);
    // lisätään tynnyrin pituus
    ctx.font = "16px Arial";
    ctx.fillStyle = "black";
    ctx.fillText("Tynnyrin pituus: 100cm", 10, 30);
    ctx.fillText("Tynnyrin halkaisija: 200cm", 10, 46);
    ctx.fillText("Tynnyrin tilavuus: " + laskeTynnyrinTilavuus() + " litraa".toString(), 10, 62);
    // piirretään tynnyri
    ctx.beginPath();
    ctx.arc(400, 200, 150, 0, 2 * Math.PI);
    ctx.stroke();
    // piirretään vesimäärä
    ctx.beginPath();
    ctx.fillStyle = "lightblue";
    ctx.arc(400, 200, 150, (0.5 - (value / 200)) * Math.PI, (0.5 + (value / 200)) * Math.PI);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    // piirretään nesteen määrä
    ctx.font = "20px Arial";
    ctx.fillStyle = "black";
    ctx.fillText("Nestemäärä: ", 10, 94);
    ctx.font = "bold 20px Arial";
    ctx.fillText(laskeNesteenTilavuus() + " litraa", 10, 120);
}

function laskeTynnyrinTilavuus() {
    var h = syvyys;
    var r = halkaisija / 2;
    var V = Math.PI * r * r * h;
    // muutetaan litroiksi
    var tilavuus = V * 1000
    // palautetaan kahden desimaalin tarkkuudella
    return tilavuus.toFixed(2);
}

function laskeNesteenTilavuus() {
    var depth = syvyys;
    var d = (document.getElementById("myRange").value) / 100;
    var r = halkaisija / 2;
    var h = r - d;
    // kulma radiaaneissa
    var angle = Math.acos(h / r);
    var base = h * Math.tan(angle);
    // sektorin koko
    var sector = (angle/2)*r*r;
    // sektorissa olevan kolmion koko
    var TriangleA = (base * h) / 2;
    // jolloin sektorissa olevan segmentin koko
    var segment = sector - TriangleA;
    // segmenttejä on kaksi
    var segments = segment * 2;
    // jolloin nesteen tilavuus
    var liquidV = segments * depth;
    // muutetaan litroiksi
    var nesteTilavuus = liquidV*1000
    // palautetaan litramäärä kahden desimaalin tarkkuudella
    return nesteTilavuus.toFixed(2);
}
