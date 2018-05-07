function init() {
    $(document).ready(function () {
        $.when(scrapp()).done(function () {
            $( document ).on("pageshow", "#loggedInPage", function() {
                listOffers();
            });
        });
    });
    $(document).on("pageshow", "#offerPage", function () {
        var url = localStorage.url;

        if (url.includes("house.pl")){
            console.log("HOUSE");
            getHouseSingleOffer(url);
        }
        else if(url.includes("cropp.pl")){
            console.log("CROPP");
            getCroppSingleOffer(url);
        }
    });
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
    value = '1';
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

                    var url = offers[offer]["url"];

                    html += "<div class='offer' onclick='changePage(\"" + url + "\")'>";
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

                    var url = offers[offer]["url"];

                    html += "<div class='offer' onclick='changePage(\"" + url + "\")'>";
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

function changePage(url) {
    if(typeof(Storage)!=="undefined") {
        localStorage.url=url;
    }
    $.mobile.changePage("#offerPage");
}