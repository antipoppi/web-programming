var index = -1;
var resultURL = "";
var xhr;
var res;
var selName = "";

/*  kun nimi on listasta valittu nuolinäppäimillä
    ja painetaan enteriä, input kenttään tulee valittu nimi
    ja suurennuslasin osoite päivitetään valitun nimen mukaisesti
*/

function selectName(field, event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        if (selName != "") {
            field.value = "";
            field.value = selName;
        } else {
            field.value = field.value;
        }
        var a = document.getElementById("lga");
        a.href = "ajax-suggest.php?q=" + field.value
    }
}

// alla olevassa funktio laukeaa kun näppäin nostetaan ylös
function ajaxSearch(field, event) {
    res = document.getElementById("resultsDiv");
    switch (event.code) {
        case "ArrowDown": // alaspäin indeksinumero kasvaa
            index++;
            if (index >= res.childElementCount) {
                index = res.childElementCount - 1;
            }
            break;
        case "ArrowUp": // ylöspäin indeksinumero pienenee, ja jos -1 valittu nimi on ""
            index--;
            if (index == -2) {
                index += 1;
            }
            if (index == -1) {
                selName = "";
                console.log(selName);
            }
            break;
        case "Escape": // Esciä painamalla tyhjennetään hakukenttä
            field.value = "";
            res.innerHTML = "";
            break;
        case "Backspace": // jos nimi ei vastaa valittua nimeä, sitä ei anneta hakea
            if (field.value != selName) {
                var a = document.getElementById("lga");
                a.removeAttribute("href");
            }
    }
    // jos nimikenttä on tyjä, myös res-div on tyhjä
    if (field.value === "") {
        selName = "";
        res.innerHTML = "";
    }
    // muuten lähetetään xmlhttprequest php-tiedostoon 
    // ja täytetään res-div alla olevilla funktioita hyväksikäyttäen
    else {
        xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                var persons = [];
                persons = parsePersonsToArray(xhr.responseText);
                //console.log("persons: " + persons); tällä voi halutessa tarkistella persons-taulukon sisältöä
                appendPersonResultsToResultsDiv(persons);
            }
        };
        xhr.open("GET", "ajax-suggest.php?q=" + field.value, true);
        xhr.send();
        //console.log("index: " + index); // tällä voi halutessa tarkistella nykyistä indeksiä
    }
}

// splitataan vastaustaulukon sisältö '\t':n mukaan
function parsePersonsToArray(response) {
    var array = response.split('\t');
    return array;
}

// tällä täytetään res-div
function appendPersonResultsToResultsDiv(array) {
    // aluksi tyhjennetään res-div
    emptyResults();
    // sitten luodaan div-lapsisolmu jonka sisään a- ja text-lapsisolmut joiden sisällöt määräytyy aiemmin luodun taulukon mukaan
    if (array.length != 0 && resultsDiv.children.length == 0) {
        for (var i = 0; i < array.length; i++) {
            var div = document.getElementById("resultsDiv");
            var div2 = document.createElement("div");
            var a = document.createElement("a");
            a.href = "ajax-suggest.php?q=" + array[i];
            var text = document.createTextNode(array[i]);
            a.appendChild(text);
            div2.appendChild(a);
            div.appendChild(div2);
        }
        // lopuksi ajetaan korostus-metodi 
        highlight();
    }
    // jos taulukko on tyhjä, ilmoitetaan siitä
    if (array[0] == "") {
        resultsDiv.innerHTML = "Nimeä ei löydy";
    }
}

// tämä metodi tyhjentää res-divin sisällön lapsisolmuista
function emptyResults() {
    var results = document.getElementById("resultsDiv");
    while (resultsDiv.hasChildNodes()) {
        results.removeChild(results.firstChild);
    }
}

// korostusmetodi hakee indexin mukaan valitun lapsisolmun ja muuttaa kyseisen solmun taustavärin
// sekä vaihtaa fontin värin. Samalla asettaa resultURL ja selName muuttujien sisällön myöskin indeksin mukaisilla tiedoilla
// muuten taustaväri on sama kuin res-divissä
function highlight() {
    var suggestions = document.getElementById("resultsDiv");
    for (var i = 0; i < suggestions.childElementCount; i++) {
        var suggestion = suggestions.childNodes[i];
        if (i === index) {
            suggestion.style = "background-color: cadetblue";
            suggestion.querySelector("a").style = "color: white";
            resultURL = suggestion.querySelector("a").href;
            selName = suggestion.querySelector("a").textContent;
            // console.log("resultURL: " + resultURL); // tällä voi tarkastella resultURL:n sisältöä
            console.log("selected Name: " + selName); // tällä voi tarkastella valittua nimeä
        } else {
            suggestion.style = "background-color: inherit";
        }
        // jos jäljellä vain yksi nimi joka täsmää, korostetaan se
        if (suggestions.childElementCount == 1) {
            suggestion.style = "background-color: cadetblue";
            suggestion.querySelector("a").style = "color: white";
            resultURL = suggestion.querySelector("a").href;
            selName = suggestion.querySelector("a").textContent;
        }
    }
}
