/* Set the width of the side navigation to 250px and the left margin of the page content to 250px and add a black background color to body */
function openNav(x) {
    document.getElementById("mySidenav" + x).style.width = "100%";
    //x.classList.toggle("change");
}

/* Set the width of the side navigation to 0 and the left margin of the page content to 0, and the background color of body to white */
function closeNav(x) {
    document.getElementById("mySidenav" + x).style.width = "0";
}
