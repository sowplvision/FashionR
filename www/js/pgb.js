function init() {
    document.addEventListener("deviceready",onDeviceReady, false);
    listCategories();
}

function onDeviceReady() {
	navigator.notification.beep(2);
}

function listCategories() {
    var e = document.getElementById("gender");
    var value = e.options[e.selectedIndex].value;
    document.getElementById("clothesCategories").innerHTML = "<input type='checkbox' id='cat1'><label for='cat1'>TEST</label>";
}