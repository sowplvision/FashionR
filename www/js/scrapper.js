var houseWomanCategories;
var houseManCategories;
var croppWomanCategories;
var croppManCategories;
var womanCategory;
var manCategory;


function scrapp(){
    //Tables with categories
    houseWomanCategories = [];
    houseManCategories = [];
    croppWomanCategories = [];
    croppManCategories = [];
    womanCategory = [];
    manCategory = [];

    //scrappHouseClothing();
    //scrappCropp();

    //Wait until all ajax functions will done
    $.when(scrappHouseClothing(),scrappCropp()).done(function () {
        comparingCategories();
    });

    //getHouseOffers("http://www.house.pl/pl/pl/ona/kolekcja/plaszcze-kurtki");
    //getCroppOffers();
}

function scrappHouseClothing(){
    /**
     *  GET Data from HOUSE website
     */
    /**
    $.get( "http://www.house.pl/pl/pl/", function( data ) {
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
    });
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
    /**
    $.get( "https://www.cropp.com/", function( data ) {
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
    });
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

    alert("SUCCESS");
    //TODO made one standard for Woman and Man category
}

function getHouseOffers(url){
    /**
     * GET offers from House site (url)
     */
    /**
    $.get( url, function( data ) {
        var i;
        var parser = new DOMParser();
        var doc = parser.parseFromString(data, "text/html");

        console.log("\r\nCATEGORY: " + url + "\r\n");

        var offers = doc.querySelectorAll("div[id^='product-']");
        for (i = 0; i < offers.length; i++){
            console.log(offers[i]);
        }
        console.log(i);
    });
    */
    $.ajax({
        url:url,
        dataType:"html",
        success:function (data) {
            var i;
            var parser = new DOMParser();
            var doc = parser.parseFromString(data, "text/html");

            console.log("\r\nHOUSE CATEGORY: " + url + "\r\n");

            var offers = doc.querySelectorAll("div[id^='product-']");
            for (i = 0; i < offers.length; i++){
                console.log(offers[i]);
            }
            console.log(i);
        },
        error:function (data) {

        }
    });
}

function getCroppOffers(url) {
    /**
     * GET offers from Cropp site (url)
     */
    $.ajax({
        url:url,
        dataType:"html",
        success:function (data) {
            var i;
            var parser = new DOMParser();
            var doc = parser.parseFromString(data, "text/html");

            console.log("\r\nCROPP CATEGORY: " + url + "\r\n");
        },
        error:function (data) {

        }
    });
}