$(document).ready(function() {
    $("h3").click(function () {
        $(this).siblings().toggle(200);
    });
});