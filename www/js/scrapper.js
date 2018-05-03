var houseWomanCategories;
var houseManCategories;
//var houseColorTable;
var croppWomanCategories;
var croppManCategories;
var colorTable;

function scrapp(){
    //Tables with categories
    houseWomanCategories = [];
    houseManCategories = [];
    //houseColorTable = [];
    croppWomanCategories = [];
    croppManCategories = [];
    //Tables of colors for House
    colorTable = ["inny","beżowy", "biały", "bordowy", "brązowy", "czarny", "czerwony", "kość słoniowa", "granatowy", "purpurowy", "niebieski", "pomarańczowy", "różowy", "srebrny", "szary", "turkusowy", "wielobarwny", "zielony", "złoty", "żółty", "", "surowy granatowy", "khaki"];

    $.when(scrappHouseClothing(),scrappCropp()).done(function () {
        var womanCategories = convertWomanCategoriesTOJSON();
        var manCategories = convertManCategoriesTOJSON();
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
            //console.log("\r\nHOUSE\r\n");
            var i;
            var parser = new DOMParser();
            var doc = parser.parseFromString(data, "text/html");

            //Get Woman categories
            //console.log("\r\nWOMAN\r\n");
            var womanCategories = doc.querySelectorAll("ul[id='womanCategory'] li[class='default'] a");
            for (i = 0; i < womanCategories.length; i++){
                if (!womanCategories[i].getAttribute("href").includes("sprawdz-to")) {
                    //console.log(womanCategories[i].innerText + " " + womanCategories[i].getAttribute("href"));
                    //Add category to array
                    houseWomanCategories.push(womanCategories[i]);
                }
            }

            //Get Man categories
            //console.log("\r\nMAN\r\n");
            var manCategories = doc.querySelectorAll("ul[id='manCategory'] li[class='default'] a");
            for (i = 0; i < manCategories.length; i++){
                if (!manCategories[i].getAttribute("href").includes("sprawdz-to")) {
                    //console.log(manCategories[i].innerText + " " + manCategories[i].getAttribute("href"));
                    //Add category to array
                    houseManCategories.push(manCategories[i]);
                }
            }

            //console.log("HouseWomanCategories: " + houseWomanCategories.length);
            //console.log("HouseManCategories: " + houseManCategories.length);
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
            //console.log("\r\nCROPP\r\n");
            var i;
            var parser = new DOMParser();
            var doc = parser.parseFromString(data, "text/html");

            //Get Woman categories
            //console.log("\r\nWOMAN\r\n");
            var womanCategories = doc.querySelectorAll("ul[class='level1'] li[class*='nav-1-3'] a");
            for (i = 0; i < womanCategories.length; i++){
                //console.log(womanCategories[i].innerText + " " +  womanCategories[i].getAttribute("href"));
                //Add category to array
                croppWomanCategories.push(womanCategories[i]);
            }

            //Get Man categories
            //console.log("\r\nMAN\r\n");
            var manCategories = doc.querySelectorAll("ul[class='level1'] li[class*='nav-2-3'] a");
            for (i = 0; i < manCategories.length; i++){
                //console.log(manCategories[i].innerText + " " +  manCategories[i].getAttribute("href"));
                //Add category to array
                croppManCategories.push(manCategories[i]);
            }

            //console.log("CroppWomanCategories: " + croppWomanCategories.length);
            //console.log("CroppManCategories: " + croppManCategories.length);
        },
        error: function (data) {

        }
    });
}

function findCategoryUrl(categoryName, arrayName){
    //Search for categoryName in array
    for (var i = 0; i < arrayName.length; i++){
        if (arrayName[i].innerText.includes(categoryName)){
            //console.log(arrayName[i].getAttribute("href"));
            return "\"" + arrayName[i].getAttribute("href") + "\"";
        }
    }
    return "";
}

function convertWomanCategoriesTOJSON() {
    //convert woman categories to JSON
    var str = "";
    str += "{";

    str += "\"T-shirty, topy\":{\"House\":[" + findCategoryUrl("T-shirty", houseWomanCategories) + "], \"Cropp\":[" + findCategoryUrl("KOSZULKI", croppWomanCategories) + "]},";
    str += "\"Kurtki, kamizelki, płaszcze\":{\"House\":[" + findCategoryUrl("Kurtki", houseWomanCategories) + "], \"Cropp\":[" + findCategoryUrl("KURTKI", croppWomanCategories) + "]},";
    str += "\"Bluzki, koszule\":{\"House\":[" + findCategoryUrl("Bluzki", houseWomanCategories) + "], \"Cropp\":[" + findCategoryUrl("BLUZKI", croppWomanCategories) + "," + findCategoryUrl("KOSZULE", croppWomanCategories) + "]},";
    str += "\"Spodnie\":{\"House\":[" + findCategoryUrl("Spodnie", houseWomanCategories) + "], \"Cropp\":[" + findCategoryUrl("SPODNIE", croppWomanCategories) + "]},";
    str += "\"Sukienki, kombinezony\":{\"House\":[" + findCategoryUrl("Sukienki", houseWomanCategories) + "], \"Cropp\":[" + findCategoryUrl("SUKIENKI", croppWomanCategories) + "]},";1
    str += "\"Jeansy\":{\"House\":[" + findCategoryUrl("Jeansy", houseWomanCategories) + "], \"Cropp\":[" + findCategoryUrl("JEANSY", croppWomanCategories) + "]},";
    str += "\"Bluzy\":{\"House\":[" + findCategoryUrl("Bluzy", houseWomanCategories) +"], \"Cropp\":[" + findCategoryUrl("BLUZY", croppWomanCategories) + "]},";
    str += "\"Swetry\":{\"House\":[" + findCategoryUrl("Swetry", houseWomanCategories) + "], \"Cropp\":[" + findCategoryUrl("SWETRY", croppWomanCategories) + "]},";
    str += "\"Spódnice\":{\"House\":[" + findCategoryUrl("Spódnice", houseWomanCategories) + "], \"Cropp\":[" + findCategoryUrl("SPÓDNICE", croppWomanCategories) + "]},";
    str += "\"Szorty\":{\"House\":[" + findCategoryUrl("Szorty", houseWomanCategories) + "], \"Cropp\":[" + findCategoryUrl("SZORTY", croppWomanCategories)+ "]},";
    str += "\"Na plażę\":{\"House\":[" + findCategoryUrl("Na plażę", houseWomanCategories) + "], \"Cropp\":[" + findCategoryUrl("KOLEKCJA PLAŻOWA", croppWomanCategories) + "]},";
    str += "\"Torby, plecaki\":{\"House\":[" + findCategoryUrl("Torby", houseWomanCategories) + "], \"Cropp\":[" + findCategoryUrl("TORBY", croppWomanCategories)+ "]},";
    str += "\"Bielizna, piżamy\":{\"House\":[" + findCategoryUrl("Bielizna", houseWomanCategories)+ "], \"Cropp\":[" + findCategoryUrl("BIELIZNA", croppWomanCategories) + "]},";
    str += "\"Buty\":{\"House\":[" + findCategoryUrl("Buty", houseWomanCategories) + "], \"Cropp\":[" + findCategoryUrl("BUTY", croppWomanCategories) + "]},";
    str += "\"Akcesoria\":{\"House\":[" + findCategoryUrl("Akcesoria", houseWomanCategories) + "," + findCategoryUrl("Okulary", houseWomanCategories) + "," + findCategoryUrl("Szale", houseWomanCategories) + "], \"Cropp\":[" + findCategoryUrl("AKCESORIA", croppWomanCategories) + "]},";
    str += "\"Biżuteria\":{\"House\":[" + findCategoryUrl("Biżuteria", houseWomanCategories) +"], \"Cropp\":[" + findCategoryUrl("BIŻUTERIA", croppWomanCategories) + "]},";
    str += "\"Paski, portfele\":{\"House\":[" + findCategoryUrl("Paski", houseWomanCategories) + "," + findCategoryUrl("Portfele", houseWomanCategories) + "], \"Cropp\":[" + findCategoryUrl("PASKI", croppWomanCategories) + "]}";

    str += "}";

    var json = JSON.parse(str);
    //console.log(json);

    return json;
}

function convertManCategoriesTOJSON() {
    //conver man categories to JSON
    var str = "";
    str += "{";

    str += "\"T-shirty\":{\"House\":[" + findCategoryUrl("T-shirty", houseManCategories) + "], \"Cropp\":[" + findCategoryUrl("KOSZULKI", croppManCategories) + "]},";
    str += "\"Kurtki, kamizelki, płaszcze\":{\"House\":[" + findCategoryUrl("Kurtki", houseManCategories) + "], \"Cropp\":[" + findCategoryUrl("KURTKI", croppManCategories) + "]},";
    str += "\"Koszule\":{\"House\":[" + findCategoryUrl("Koszule", houseManCategories) + "], \"Cropp\":[" + findCategoryUrl("KOSZULE", croppManCategories) + "]},";
    str += "\"Spodnie\":{\"House\":[" + findCategoryUrl("Spodnie", houseManCategories) + "], \"Cropp\":[" + findCategoryUrl("SPODNIE", croppManCategories) + "]},";
    str += "\"Jeansy\":{\"House\":[" + findCategoryUrl("Jeansy", houseManCategories) + "], \"Cropp\":[" + findCategoryUrl("JEANS", croppManCategories) + "]},";
    str += "\"Bluzy\":{\"House\":[" + findCategoryUrl("Bluzy", houseManCategories) + "," + findCategoryUrl("Swetry", houseManCategories) + "], \"Cropp\":[" + findCategoryUrl("BLUZY", croppManCategories) + "]},";
    str += "\"Szorty\":{\"House\":[" + findCategoryUrl("Szorty", houseManCategories) + "], \"Cropp\":[" + findCategoryUrl("SZORTY", croppManCategories) + "]},";
    str += "\"Na plażę\":{\"House\":[" + findCategoryUrl("Na plażę", houseManCategories) + "], \"Cropp\":[" + findCategoryUrl("KOLEKCJA PLAŻOWA", croppManCategories) + "]},";
    str += "\"Buty\":{\"House\":[" + findCategoryUrl("Buty", houseManCategories) + "], \"Cropp\":[" + findCategoryUrl("BUTY", croppManCategories) + "]},";
    str += "\"Bielizna, piżamy\":{\"House\":[" + findCategoryUrl("Bielizna", houseManCategories) + "], \"Cropp\":[" + findCategoryUrl("BIELIZNA", croppManCategories) + "]},";
    str += "\"Paski, portfele\":{\"House\":[" + findCategoryUrl("Paski", houseManCategories) + "," + findCategoryUrl("Portfele", houseManCategories) + "], \"Cropp\":[" + findCategoryUrl("PASKI", croppManCategories) + "]},";
    str += "\"Akcesoria\":{\"House\":[" + findCategoryUrl("Akcesoria", houseManCategories) + "," + findCategoryUrl("Czapki", houseManCategories) + "], \"Cropp\":[" + findCategoryUrl("AKCESORIA", croppManCategories) + "]},";
    str += "\"Torby, plecaki\":{\"House\":[" + findCategoryUrl("Torby", houseManCategories) + "], \"Cropp\":[" + findCategoryUrl("TORBY", croppManCategories) + "]}";

    str += "}";

    var json = JSON.parse(str);
    //console.log(json);

    return json;
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

            //console.log("\r\nHOUSE CATEGORY: " + url + "\r\n");

            /**
            var temp = doc.querySelectorAll("ul[id='color'] li");
            for (i = 0; i < temp.length; i++){
                houseColorTable[temp[i].querySelector("input").getAttribute("value")] = "\"" + temp[i].querySelector("p").innerText + "\"";
                console.log(houseColorTable[temp[i].querySelector("input").getAttribute("value")]);
            }
             */

            //console.log(data);

            //convert HTML data into JSON format
            var str = "{";

            var offers = doc.querySelectorAll("div[id^='product-']");
            for (i = 0; i < offers.length; i++){
                //console.log(offers[i]);
                //convert single offer to JSON
                var temp = convertHouseOfferToJSON(offers[i]);
                str += temp + ",";
            }
            //console.log(i);

            //remove last ',' from string before parsing
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
    /**
     * Converting single House offer from HTML to JSON
     */
    var temp;
    var i;

    //get product ID
    temp = offer.querySelector("div[class='hover'] a").getAttribute("data-api-quickshop");
    var id = temp.replace("{\"product\":","\"id\":").replace("}","");
    //console.log(id);

    //get sku of product
    temp = offer.getAttribute("data-sku");
    var sku = "\"sku\":\""+ temp +"\"";
    var obj = sku.replace("\"sku\":","");
    //console.log(sku);

    //get model
    temp = temp.split("-");
    var model = "\"model\":\""+ temp[0] +"\"";
    //console.log(model);

    //get price
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

    //get name of offer
    temp = offer.querySelector("p[class='name']");
    var name = "\"name\":\"" + temp.innerText + "\"";

    //console.log(name);

    //get colorName of product
    temp = offer.getAttribute("data-properties").split(",");
    var colorName = "\"color_name\":\"" + colorTable[temp[2].replace("\"color\":[\"","").replace("\"]","")] + "\"";

    /**
     // alternative way to get colorNames
    if (temp[2].replace("\"color\":[\"","").replace("\"]","")==0){
        //colorName = "\"color_name\":\"" + temp[2].replace("\"color\":[\"","").replace("\"]","") + "\"";
        colorName = "\"color_name\":\"" + "inny" + "\"";
    }
    else {
        colorName = "\"color_name\":" + houseColorTable[temp[2].replace("\"color\":[\"","").replace("\"]","")];
    }
     */
    //console.log(colorName);

    //get colors of this model
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

    //get product img
    temp = offer.getAttribute("data-img-medium");
    var image = "\"image_front\":\"" + temp + "\"";

    //console.log(image);

    //get url to offer details
    temp = offer.querySelector("a[class='productLink']").getAttribute("href");
    var url = "\"url\":\"" + temp + "\"";

    //console.log(url);

    //concat all data into single object in JSON standard
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

            //console.log("\r\nCROPP CATEGORY: " + url + "\r\n");

            //console.log(data);
            var offers = doc.querySelectorAll("div[class='main-container'] script");
            /**
            for (i = 0; i < offers.length; i++){
                console.log(offers[i]);
            }
             */
            //All offers value
            var str = offers[2].innerText;

            //Convert offers to JSON format
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