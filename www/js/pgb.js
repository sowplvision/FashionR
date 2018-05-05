function init() {
    document.addEventListener("deviceready",onDeviceReady, false);
    scrapp();
}

function onDeviceReady() {
	navigator.notification.beep(2);
}

function listCategories() {
    var e = document.getElementById("gender");
    var value = e.options[e.selectedIndex].value;
    var categories;
    var html = "";
    if (value==='1'){
        categories = getCategories('woman');
    }
    else {
        categories = getCategories('man');
    }
    for (var category in categories){
        html += "<div class='check'><input type='checkbox' id='"+ category +"'/><label for='"+ category +"'><div class='box'><i class='fa fa-check'></i></div>&nbsp;" + category + "</label></div>";
    }
    document.getElementById("clothesCategories").innerHTML = html;
}