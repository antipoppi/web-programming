$(document).ready(function () {
    /*  
        Lisää-nappia painaessa/tai painaen enteriä näppäimistöllä inputin ollessa aktiivinen, 
        input-kentän sisältö lisätään ul-elementtiin li-elementtinä
        joka sisältää span-elementin joka taas sisältää ruksin jolla poistaa merkintä
        Molemmat kutsuvat addToDo()-metodia.
    */
    $("button").click(addToDo);

    $("input").keydown(function (e) {
        if (e.keyCode === 13) {
            e.preventDefault();
            addToDo();
        }
    });

    /*  
        on()-funktio toimii jälkeenpäin lisättyihin elementteihin.
        kun span-elementtiä klikataan, se poistaa lähimmän li-elementin.
        voi myös käyttää parent()-funktiota closest() sijaan
    */
    $("body").on("click", "span", function () {
        $(this).closest("li").remove();
    });
});

function addToDo() {
    var inp = $("input").val();
    $("<li>" + inp + "<span style='color:red'> x</span></li>").appendTo("ul");
    $("input").val("").focus().select();
}
