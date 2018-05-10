var slideIndex;

function initGallery(n) {
    slideIndex = n;
    showDivs(slideIndex);
}

function plusDivs(n) {
    showDivs(slideIndex += n);
}

function currentDiv(n) {
    showDivs(slideIndex = n);
}

function showDivs(n) {
    var i;
    var x = document.querySelectorAll("div[class='offerGallery'] img");
    var dots = document.getElementsByClassName("dots");
    if (n > x.length) {slideIndex = 1} 
    if (n < 1) {slideIndex = x.length}
    for (i = 0; i < x.length; i++) {
        x[i].style = "display:none;";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].style = "background-color:transparent!important;";
    }
    x[slideIndex-1].style = "display:block;";
    dots[slideIndex-1].style = "background-color:rgba(0, 0, 0, 0.6)!important;";
}