function init() {
    //when document is ready download categories and add listener for offer list page
    $(document).ready(function () {
        $.when(scrapp()).done(function () {
            $( document ).on("pageshow", "#loggedInPage", function() {
                listOffers();
            });
        });
    });
    //add listenet to single offer page
    $(document).on("pageshow", "#offerPage", function () {
        showOffer();
        initGallery(1);
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
        html += "<div class='check'><input type='checkbox' id='"+ category +"'/><label for='"+ category +"'><div class='box'><i class='fa fa-check'></i></div>&nbsp;" + category + "</label></div>";
    }

    //set html code to element
    document.getElementById("clothesCategories").innerHTML = html;
}
function listOffers() {
    var i;

    //get values of preferences - not ready yet
    var e = document.getElementById("gender");
    var value = e.options[e.selectedIndex].value;

    //temporary setting
    value = '1';

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

    //showing offers for category
    for (var category in categories){
        if (category.includes("T-shirty")) {
            console.log(category);
            //Creating html code for single house offer
            for (i = 0; i < categories[category]["House"].length; i++) {
                var url = categories[category]["House"][i];
                //console.log(url);

                var offers = getHouseOffers(url);
                console.log(Object.keys(offers).length);
                console.log(offers);

                //create html for each single offer
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

                    html += "<div class='offer' onclick='show(\"" + url + "\")'>";
                    html += "<div class='offerImg'><img src=\"" + img + "\"/></div>";
                    html += "<div class='offerFooter'>";
                    html += "<img src='img/house.png'/>";
                    html += "<p><s>" + oldPrice.replace(",",".") + "</s>" + price.replace(",",".") + "</p>";
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

                    html += "<div class='offer' onclick='show(\"" + url + "\")'>";
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
    var url = localStorage.url;

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

    //html code for offer details
    html = '<div class="singleOffer">';
    html += '<div class="offerGallery">' + gallery + '</div>'
    html += '<div class="offerName">' + offerDetails["name"] +'</div>';
    html += '<div class="offerDescription">' + offerDetails["description"] + '</div>';
    html += '<div class="offerPricebox"><div class="oldPrice"><s>' + oldPrice.replace(",",".") + '</s>';
    html += '</div><div class="price">' + price.replace(",",".") + '</div></div>';
    html += '</div>';

    //set html to element
    document.getElementById("offerDetails").innerHTML = html;
}

function refreshPage() {
    //refresh page if somethings goes wrong
    $.mobile.changePage(window.location.href, {
        allowSamePageTransition: true,
        transition: 'none',
        reloadPage: true
    });
}