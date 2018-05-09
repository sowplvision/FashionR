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
    if (n > x.length) {slideIndex = 1} 
    if (n < 1) {slideIndex = x.length}
    console.log(x.length);
    for (i = 0; i < x.length; i++) {
        x[i].style = "display:none;";
    }
    x[slideIndex-1].style = "display:block;";
}