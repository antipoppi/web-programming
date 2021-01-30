$(document).ready(function () {
    // alustetaan persons taulukko ja xmlhttprequest
    var persons = [];
    xhr = new XMLHttpRequest();

    // jokaisella näppäinpainalluksella xhr-lähettää inputin sisällön php-tiedostoon ja parsii vastauksen persons-taulukkoon
    $("#tags").keyup(function () {
        xhr.open("GET", "ajax-suggest.php?q=" + $("#tags").val(), true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                persons = xhr.responseText.split('\t');
                //console.log(persons); //tällä voi halutessa tarkistella persons-taulukon sisältöä
            }
            // autocomplet tarkistaa persons-taulukon sisällöstä mätsääkö ensimmäinen kirjain (tämän määritys tapahtuu source-optiossa)
            $("#tags").autocomplete({
                minLength: 0,
                // minimipituus inputille on 1
                source: function (request, response) {
                    var matcher = new RegExp("^" + $.ui.autocomplete.escapeRegex(request.term), "i");
                    // "^" määrittää että regexp etsii request.termin ensimmäisestä merkistä lähtien, ja "i" sitä että kirjaimen koolla ei ole merkitystä.
                    // $.ui.autocomplete.escapeRegex(request.term) määrittää, että Regexpin käsiteltävä teksti on tekstiä.
                    response($.grep(persons, function (item) {
                        return matcher.test(item);
                    }));
                    // $.grep() kutsuu matcher.test(item) jokaiselle taulukon indeksille. Response palauttaa true/false riippuen osuvuudesta
                }
            });
        };
        xhr.send();
    });


});
