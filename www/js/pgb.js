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
    else if(value==='2'){
        categories = getCategories('man');
    }
    else {
        categories = "";
    }

    //console.log(categories);

    for (var category in categories){
        html += "<div class='check'><input type='checkbox' id='"+ category +"'/><label for='"+ category +"'><div class='box'><i class='fa fa-check'></i></div>&nbsp;" + category + "</label></div>";
    }
    document.getElementById("clothesCategories").innerHTML = html;
}
function listOffers() {
    var i;
    var e = document.getElementById("gender");
    var value = e.options[e.selectedIndex].value;
    value = '2';
    var categories;
    var html = "";
    if (value==='1'){
        categories = getCategories('woman');
    }
    else if(value==='2'){
        categories = getCategories('man');
    }
    else {
        categories = "";
    }

    for (var category in categories){
        if (category.includes("T-shirty")) {
            console.log(category);
            for (i = 0; i < categories[category]["House"].length; i++) {
                var url = categories[category]["House"][i];
                //console.log(url);

                var offers = getHouseOffers(url);
                console.log(Object.keys(offers).length);
                console.log(offers);

                for (var offer in offers){

                    var img = offers[offer]["image_front"];
                    var oldPrice = offers[offer]["special_price"];

                    if (oldPrice !=null){
                        oldPrice = offers[offer]["price"];
                    }
                    else {
                        oldPrice = "";
                    }
                    var price = offers[offer]["original_price"];

                    html += "<div class='offer'>";
                    html += "<div class='offerImg'><img src=\"" + img + "\"/></div>";
                    html += "<div class='offerFooter'>";
                    html += "<img src='img/house.png'/>";
                    html += "<p><s>" + oldPrice.replace(",",".") + "</s>" + price.replace(",",".") + "</p>";
                    html += "</div>";
                    html += "</div>";
                }
            }

            for (i = 0; i < categories[category]["Cropp"].length; i++) {
                var url = categories[category]["Cropp"][i];
                //console.log(url);

                var offers = getCroppOffers(url);
                console.log(Object.keys(offers).length);
                console.log(offers);

                for (var offer in offers){

                    var img = offers[offer]["image_front"];
                    var oldPrice = offers[offer]["special_price"];

                    if (oldPrice !=null){
                        oldPrice = offers[offer]["price"];
                    }
                    else {
                        oldPrice = "";
                    }
                    var price = offers[offer]["original_price"];

                    html += "<div class='offer'>";
                    html += "<div class='offerImg'><img src=\"" + img + "\"/></div>";
                    html += "<div class='offerFooter'>";
                    html += "<img src='img/cropp.png'/>";
                    html += "<p><s>" + oldPrice.replace(",",".") + "</s>" + price + "</p>";
                    html += "</div>";
                    html += "</div>";
                }
            }
        }
    }
    console.log("DONE");
    document.getElementById("offersContainer").innerHTML = html;
}