var houseWomanCategories;
var houseManCategories;
//var houseColorTable;
var croppWomanCategories;
var croppManCategories;
var womanCategory;
var manCategory;
var colorTable;

function scrapp(){
    //Tables with categories
    houseWomanCategories = [];
    houseManCategories = [];
    //houseColorTable = [];
    croppWomanCategories = [];
    croppManCategories = [];
    womanCategory = [];
    manCategory = [];
    colorTable = ["inny","beżowy", "biały", "bordowy", "brązowy", "czarny", "czerwony", "kość słoniowa", "granatowy", "purpurowy", "niebieski", "pomarańczowy", "różowy", "srebrny", "szary", "turkusowy", "wielobarwny", "zielony", "złoty", "żółty", "", "surowy granatowy", "khaki"];

    //Wait until all ajax functions will done
    $.when(scrappHouseClothing(),scrappCropp()).done(function () {
        comparingCategories();
    });

    //getHouseOffers("http://www.house.pl/pl/pl/ona/kolekcja/bluzki-koszule");
    //getCroppOffers("https://www.cropp.com/pl/pl/chlopak/kolekcja/bluzy");
}

function scrappHouseClothing(){
    /**
     *  GET Data from HOUSE website
     */
    return $.ajax({
        url:"http://www.house.pl/pl/pl/",
        dataType:"html",
        success:function (data) {
            console.log("\r\nHOUSE\r\n");
            var i;
            var parser = new DOMParser();
            var doc = parser.parseFromString(data, "text/html");

            //Get Woman categories
            console.log("\r\nWOMAN\r\n");
            var womanCategories = doc.querySelectorAll("ul[id='womanCategory'] li[class='default'] a");
            for (i = 0; i < womanCategories.length; i++){
                if (!womanCategories[i].getAttribute("href").includes("sprawdz-to")) {
                    console.log(womanCategories[i].innerText + " " + womanCategories[i].getAttribute("href"));
                    //Add category to array
                    houseWomanCategories.push(womanCategories[i]);
                }
            }

            //Get Man categories
            console.log("\r\nMAN\r\n");
            var manCategories = doc.querySelectorAll("ul[id='manCategory'] li[class='default'] a");
            for (i = 0; i < manCategories.length; i++){
                if (!manCategories[i].getAttribute("href").includes("sprawdz-to")) {
                    console.log(manCategories[i].innerText + " " + manCategories[i].getAttribute("href"));
                    //Add category to array
                    houseManCategories.push(manCategories[i]);
                }
            }
        },
        error: function (data) {

        }
    });
}

function scrappCropp(){
    /**
     *  GET Data from CROPP website
     */
    return $.ajax({
        url:"https://www.cropp.com/",
        dataType:"html",
        success:function (data) {
            console.log("\r\nCROPP\r\n");
            var i;
            var parser = new DOMParser();
            var doc = parser.parseFromString(data, "text/html");

            //Get Woman categories
            console.log("\r\nWOMAN\r\n");
            var womanCategories = doc.querySelectorAll("ul[class='level1'] li[class*='nav-1-3'] a");
            for (i = 0; i < womanCategories.length; i++){
                console.log(womanCategories[i].innerText + " " +  womanCategories[i].getAttribute("href"));
                //Add category to array
                croppWomanCategories.push(womanCategories[i]);
            }

            //Get Man categories
            console.log("\r\nMAN\r\n");
            var manCategories = doc.querySelectorAll("ul[class='level1'] li[class*='nav-2-3'] a");
            for (i = 0; i < manCategories.length; i++){
                console.log(manCategories[i].innerText + " " +  manCategories[i].getAttribute("href"));
                //Add category to array
                croppManCategories.push(manCategories[i]);
            }
        },
        error: function (data) {

        }
    });
}

function comparingCategories() {
    //Number of scrapped categories from websites
    console.log("HouseWomanCategories: " + houseWomanCategories.length);
    console.log("HouseManCategories: " + houseManCategories.length);
    console.log("CroppWomanCategories: " + croppWomanCategories.length);
    console.log("CroppManCategories: " + croppManCategories.length);

    var str = "";
    str += "{";



    str += "}";
}

function getHouseOffers(url){
    /**
     * GET offers from House site (url)
     */
    $.ajax({
        url:url,
        dataType:"html",
        success:function (data) {
            var i;
            var parser = new DOMParser();
            var doc = parser.parseFromString(data, "text/html");

            console.log("\r\nHOUSE CATEGORY: " + url + "\r\n");

            /**
            var temp = doc.querySelectorAll("ul[id='color'] li");
            for (i = 0; i < temp.length; i++){
                houseColorTable[temp[i].querySelector("input").getAttribute("value")] = "\"" + temp[i].querySelector("p").innerText + "\"";
                console.log(houseColorTable[temp[i].querySelector("input").getAttribute("value")]);
            }
             */

            //console.log(data);

            var str = "{";

            var offers = doc.querySelectorAll("div[id^='product-']");
            for (i = 0; i < offers.length; i++){
                //console.log(offers[i]);
                var temp = convertHouseOfferToJSON(offers[i]);
                str += temp + ",";
            }
            //console.log(i);

            str = str.replace(/.$/,"}");

            var json = JSON.parse(str);

            console.log(json);
            console.log(Object.keys(json).length);
        },
        error:function (data) {

        }
    });
}

function convertHouseOfferToJSON(offer) {
    var temp;
    var i;

    temp = offer.querySelector("div[class='hover'] a").getAttribute("data-api-quickshop");
    var id = temp.replace("{\"product\":","\"id\":").replace("}","");
    //console.log(id);

    temp = offer.getAttribute("data-sku");
    var sku = "\"sku\":\""+ temp +"\"";
    var obj = sku.replace("\"sku\":","");
    //console.log(sku);

    temp = temp.split("-");
    var model = "\"model\":\""+ temp[0] +"\"";
    //console.log(model);

    temp = offer.getAttribute("data-price");
    var orginalPrice = "\"orginal_price\":\""+ temp +"\"";

    temp = offer.querySelector("span[class='priceOld']");
    var specialPrice;
    var price;
    if (temp != null){
        orginalPrice = "\"orginal_price\":\"" + temp.innerText.replace("PLN","") + "\"";
        temp = offer.querySelector("span[class='priceNew']");
        specialPrice = "\"special_price\":\"" + temp.innerText + "\"";
        price = specialPrice.replace("special_", "");
    }
    else {
        specialPrice = "\"special_price\": null";
        price = orginalPrice.replace("orginal_","");
    }
    //console.log(price);
    //console.log(orginalPrice);
    //console.log(specialPrice);

    temp = offer.querySelector("p[class='name']");
    var name = "\"name\":\"" + temp.innerText + "\"";

    //console.log(name);

    temp = offer.getAttribute("data-properties").split(",");
    var colorName = "\"color_name\":\"" + colorTable[temp[2].replace("\"color\":[\"","").replace("\"]","")] + "\"";

    /**
    if (temp[2].replace("\"color\":[\"","").replace("\"]","")==0){
        //colorName = "\"color_name\":\"" + temp[2].replace("\"color\":[\"","").replace("\"]","") + "\"";
        colorName = "\"color_name\":\"" + "inny" + "\"";
    }
    else {
        colorName = "\"color_name\":" + houseColorTable[temp[2].replace("\"color\":[\"","").replace("\"]","")];
    }
     */
    //console.log(colorName);

    temp = offer.querySelectorAll("span[class*='colorImg']");
    var colors = "\"colors\":[";
    for(i = 0; i < temp.length; i++){
        var temporary = temp[i].querySelector("img").getAttribute("data-src");
        if (temporary === null){
            temporary = temp[i].querySelector("img").getAttribute("src");
        }
        //console.log(temporary);
        var color = temporary.split("/");
        //console.log(color[11].replace("-999.jpg",""));
        colors += "\"" + color[11].replace("-999.jpg","") + "\"";

        if (i+1 < temp.length){
            colors += ", ";
        }
    }
    colors +="]";

    //console.log(colors);

    temp = offer.getAttribute("data-img-medium");
    var image = "\"image_front\":\"" + temp + "\"";

    //console.log(image);

    temp = offer.querySelector("a[class='productLink']").getAttribute("href");
    var url = "\"url\":\"" + temp + "\"";

    //console.log(url);

    var str = "";
    //str = "{";
    str += obj + ":{"+ model + "," + id + "," + sku + "," + name;
    str += "," + specialPrice + "," + orginalPrice + "," + price;
    str += "," + colorName + "," + colors;
    str += "," + image + "," + url;
    str += "}";
    //str += "}";
    //console.log(str);

    //var json = JSON.parse(str);

    return str;
}

function getCroppOffers(url) {
    /**
     * GET offers from Cropp site (url) as JSON
     */
    $.ajax({
        url:url,
        dataType:"html",
        success:function (data) {
            var i;
            var parser = new DOMParser();
            var doc = parser.parseFromString(data, "text/html");

            console.log("\r\nCROPP CATEGORY: " + url + "\r\n");

            //console.log(data);
            var offers = doc.querySelectorAll("div[class='main-container'] script");
            /**
            for (i = 0; i < offers.length; i++){
                console.log(offers[i]);
            }
             */
            //All offers value
            var str = offers[2].innerText;

            var json = convertCroppOffersToJSON(str);

            console.log(json);

            console.log(Object.keys(json).length);
        },
        error:function (data) {

        }
    });
}

function convertCroppOffersToJSON(str) {
    //Replace function() elements cause data is in script return format
    var result = str.replace("(function () {\n" +
        "            if (!window.getProductCollectionGroupedByModel) {\n" +
        "                window.getProductCollectionGroupedByModel = function () {\n" +
        "                    return ", "").replace(";\n" +
        "                }\n" +
        "            }\n" +
        "        })();", "");

    //console.log(result);
    //Return in JSON format offers from Cropp
    var json = JSON.parse(result);

    return json;
}