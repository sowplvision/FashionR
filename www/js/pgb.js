function init() {
    //when document is ready download categories and add listener for offer list page
    $(document).ready(function () {
        $.when(scrapp()).done(function () {
            //when categories are downloaded and preferences show offers
            $( document ).on("pageshow", "#loggedInPage", function() {
                $.when(updateFirebase()).done(function () {
                    listOffers();
                });
            });
        });
    });
    //remove bad feeling on loading offer - old offer was remain for 1s
    $(document).on("pagebeforeshow", "#offerPage", function () {
        document.getElementById("favouritesOffers").innerHTML = "";
    });

    //when page is showed get load offer
    $(document).on("pageshow", "#offerPage", function () {
        showOffer();
        initGallery(1);
    });

    //when page is loaded show favourites
    $(document).on("pagebeforeshow", "#favouritesPage", function () {
        $.when(updateFirebase()).done(function () {
            showFavourites();
        });
    });
    //when page is loaded show favourites
    $(document).on("pageshow", "#favouritesPage", function () {
        $.when(updateFirebase()).done(function () {
            showFavourites();
        });
    });

    $(document).on("pagebeforeshow", "#filtersPage", function () {
        createFilters();
    });
}

function listCategories() {
    //get choosed element value
    var e = document.getElementById("gender");
    var value = e.options[e.selectedIndex].value;
    var categories;
    var html = "";

    //react for option
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

    //list categories names into html checkboxes
    for (var category in categories){
        html += "<div class='check'><input type='checkbox' class='categoryCheckbox' id='"+ category +"'/><label for='"+ category +"'><div class='box'><i class='fa fa-check'></i></div>&nbsp;" + category + "</label></div>";
    }

    //set html code to element
    document.getElementById("clothesCategories").innerHTML = html;
}
function listOffers() {
    var i;
    var gender = getGender();
    var preferences = getPreferences();

    var categories;
    var html = "";

    //react for option
    if (gender==='woman'){
        categories = getCategories('woman');
    }
    else if(gender==='man'){
        categories = getCategories('man');
    }
    else {
        categories = "";
    }

    var j;

    //showing offers for category
    for (j = 0; j < Object.keys(preferences).length; j++) {
        for (var category in categories) {
            if (category.includes(preferences[j])) {
                console.log(category);
                //Creating html code for single house offer
                for (i = 0; i < categories[category]["House"].length; i++) {
                    var url = categories[category]["House"][i];
                    //console.log(url);

                    var offers = getHouseOffers(url);
                    console.log(Object.keys(offers).length);
                    console.log(offers);

                    //create html for each single offer
                    for (var offer in offers) {

                        var img = offers[offer]["image_front"];
                        var oldPrice = offers[offer]["special_price"];

                        if (oldPrice != null) {
                            oldPrice = offers[offer]["price"];
                        }
                        else {
                            oldPrice = "";
                        }
                        var price = offers[offer]["original_price"];

                        var url = offers[offer]["url"];

                        html += "<div class='offer' onclick='show(\"" + url + "\")'>";
                        html += "<div class='offerImg'><img class='houseImg' src=\"" + img + "\"/></div>";
                        html += "<div class='offerFooter'>";
                        html += "<img src='img/house.png'/>";
                        html += "<p class='offerCategory'>"+ offers[offer]["name"] +"</p>";
                        html += "<p><s>" + oldPrice.replace(",", ".") + "</s>" + price.replace(",", ".") + "</p>";
                        html += "</div>";
                        html += "</div>";
                    }
                }

                //Creating html code for single cropp offer
                for (i = 0; i < categories[category]["Cropp"].length; i++) {
                    var url = categories[category]["Cropp"][i];
                    //console.log(url);

                    var offers = getCroppOffers(url);
                    console.log(Object.keys(offers).length);
                    console.log(offers);

                    //create html for each single offer
                    for (var offer in offers) {

                        var img = offers[offer]["image_front"];
                        var oldPrice = offers[offer]["special_price"];

                        if (oldPrice != null) {
                            oldPrice = offers[offer]["price"];
                        }
                        else {
                            oldPrice = "";
                        }
                        var price = offers[offer]["original_price"];

                        var url = offers[offer]["url"];

                        //HTML which is added to site
                        html += "<div class='offer' onclick='show(\"" + url + "\")'>";
                        html += "<div class='offerImg'><img class='croppImg' src=\"" + img + "\"/></div>";
                        html += "<div class='offerFooter'>";
                        html += "<img src='img/cropp.png'/>";
                        html += "<p class='offerCategory'>"+ offers[offer]["name"] +"</p>";
                        html += "<p><s>" + oldPrice.replace(",", ".") + "</s>" + price + "</p>";
                        html += "</div>";
                        html += "</div>";
                    }
                }
            }
        }
    }
    //creating of objects is done
    console.log("DONE");

    //set result html code to element
    document.getElementById("offersContainer").innerHTML = html;
}

function show(url) {
    //change to offer - with url of offer as param (needed to download it DOM)
    if(typeof(Storage)!=="undefined") {
        localStorage.url=url;
    }
    $.mobile.changePage("#offerPage");
}

function showOffer() {
    //get stored url to clicked offer
    var url = localStorage.url;

    var favourites = getFavourites();
    //console.log(url);

    var offerDetails;
    var html = "";

    //Get JSON for offer from shop
    if (url.includes("house.pl")){
        offerDetails = getHouseSingleOffer(url);
    }
    else if(url.includes("cropp.com")){
        offerDetails = getCroppSingleOffer(url);
    }

    //convert to html code images
    var gallery = "";
    for (var img in offerDetails["images"]){
        gallery += "<img src='" + offerDetails["images"][img] + "'/>"
    }

    //add buttons to gallery
    var i = 1;
    gallery += '<div class="controls"><button class="galleryBtn prevImg" onclick="plusDivs(-1)">&#10094;</button>';
    for (var img in offerDetails["images"]){
        gallery += '<span class="dots" onclick="currentDiv('+ i +')"></span>';
        i++;
    }
    gallery += '<button class="galleryBtn nextImg" onclick="plusDivs(1)">&#10095;</button></div>';

    //convert price
    var oldPrice = offerDetails["special_price"];

    if (oldPrice !='null'){
        oldPrice = offerDetails["price"];
    }
    else {
        oldPrice = "";
    }
    var price = offerDetails["original_price"];

    //Like Dislike button
    var favBtn = '';
    favBtn += '<div class="addToFavourite">';
    favBtn += '<button class="favourite" id="like" onclick="addToFav()" data-role="none">Dodaj do ulubionych</button>';
    favBtn += '<button class="dislike" id="dislike" onclick="removeFromFav()" data-role="none">Usuń z ulubionych</button>';
    favBtn += '</div>';

    //html code for offer details
    html = '<div class="singleOffer">';
    html += '<div class="offerGallery">' + gallery + '</div>'
    html += '<div class="offerName">' + offerDetails["name"] +'</div>';
    html += '<div class="offerDescription">' + offerDetails["description"] + '</div>';
    html += '<div class="offerPricebox"><div class="oldPrice"><s>' + oldPrice.replace(",",".") + '</s>';
    html += '</div><div class="price">' + price.replace(",",".") + '</div></div>';
    html += favBtn;
    html += '</div>';

    //set html to element
    document.getElementById("offerDetails").innerHTML = html;

    //check isFavourite when offer is loading
    var i;
    var isFav = false;
    for (i = 0; i < favourites.length; i++){
        if(url === favourites[i]){
            isFav = true
        }
    }

    //If is in favs then hide like button
    if(isFav){
        document.getElementById("like").style.display = "none";
        document.getElementById("dislike").style.display = "block";
    }
    else {
        document.getElementById("like").style.display = "block";
        document.getElementById("dislike").style.display = "none";
    }
}

function showFavourites() {
    //get favs from firebase
    var favourites = getFavourites();

    //create html of offers before showing it
    var html = "";
    var i, favOffer, logo, imgClass;
    for (i = 0; i < favourites.length; i++){
        if (favourites[i].includes("house.pl")){
            favOffer = getHouseSingleOffer(favourites[i]);
            logo = "<img src='img/house.png'/>";
            imgClass = "houseImg";
        }
        else if(favourites[i].includes("cropp.com")){
            favOffer = getCroppSingleOffer(favourites[i]);
            logo = "<img src='img/cropp.png'/>";
            imgClass = "croppImg";
        }

        var url = favourites[i];

        var img = favOffer["images"][0];

        var name = favOffer["name"];

        //convert price
        var oldPrice = favOffer["special_price"];

        if (oldPrice !='null'){
            oldPrice = favOffer["price"];
        }
        else {
            oldPrice = "";
        }
        var price = favOffer["original_price"];

        //HTML which is added to site
        html += "<div class='offer' onclick='show(\"" + url + "\")'>";
        html += "<div class='offerImg'><img class='"+ imgClass +"' src=\"" + img + "\"/></div>";
        html += "<div class='offerFooter'>";
        html += logo;
        html += "<p class='offerCategory'>"+ name +"</p>";
        html += "<p><s>" + oldPrice.replace(",", ".") + "</s>" + price + "</p>";
        html += "</div>";
        html += "</div>";
    }
    //add html code to element
    document.getElementById("favouritesOffers").innerHTML = html;
}

function refreshPage() {
    //refresh page if somethings goes wrong
    $.mobile.changePage(window.location.href, {
        allowSamePageTransition: true,
        transition: 'none',
        reloadPage: true
    });
}

function createFilters(){
    var categories;
    var html = "";

    //get gender
    var e = document.getElementById("filterGender");
    var value = e.options[e.selectedIndex].value;

    //react for option
    if (value==='1'){
        categories = getCategories('woman');
    }
    else if(value==='2'){
        categories = getCategories('man');
    }
    else {
        categories = "";
    }

    //create select options for gender
    var i = 1;
    html += "<option value='0'>Wybierz kategorie:</option>";
    for (var category in categories){
        html += "<option value='" + i +"'>" + category + "</option>";
        i++;
    }
    //set html to element
    document.getElementById("filterCategory").innerHTML = html;

    html = "";
    var colors = getColors();

    html += "<option value='0'>Wybierz kolor:</option>";
    for (i = 0; i < colors.length; i++){
        html += "<option value='" + (i+1) +"'>" + colors[i] + "</option>";
    }
    //set html to element
    document.getElementById("filterColor").innerHTML = html;
}

function listFilteredOffers(){

}