mobileMenu();
LoadTopBagData();
stickyMenuSize();
prepeareTabletSearch();
mainMenuActiveColor();
changeTopic();
createFilterForTablet();
createPriceTrackBar();
createDeskFilter();
bannerMove();
filterSticky();
sliderAnime();
prepeareForMobile();
addMoreItems();
window.addEventListener("resize", changeDownMenu, false);
window.addEventListener("resize",stickyMenuSize, false);
window.addEventListener("resize",changeTopic, false);
window.addEventListener("resize",bannerMove, false);
window.addEventListener("resize",PriceTrackBarOnResize, false);



/* CHANGE TOPIC ON RESIZE */ 
function changeTopic() {
    var topic = document.body.querySelector(".logo a");
    if (document.body.clientWidth < 480) {
        if(topic.innerHTML != "TL")
            topic.innerHTML = "TL";
    }
    else {
        if (topic.innerHTML != "Template")
            topic.innerHTML = "Template";
    }
        
}

/*FIX MAIN MENU AN FILTER SIZE */ 
function stickyMenuSize() {
    if(document.body.clientWidth < 480) {
        document.body.querySelector(".sticky-header").style.width = getComputedStyle(document.body.querySelector("header")).width;
    }
    document.body.querySelector(".sticky__tablet-menu").style.width = getComputedStyle(document.body.querySelector(".filters")).width;
}

/* CHANGE DOWN MENU ON RESIZE */
function changeDownMenu () {
    if (document.body.clientWidth < 480) {
        if (document.body.querySelector(".down").firstElementChild != document.body.querySelector(".down__menu") ) {
            prepeareForMobile();    
        }
    }
    else {
        if (document.body.querySelector(".down").firstElementChild == document.body.querySelector(".down__menu") ) {
            returnFromMobile();    
        }
        
    }
}

/* CHANGE DOWN MENU ON LOAD */
function prepeareForMobile () {
    if (document.body.clientWidth < 480) {
        var downMenu = document.body.querySelector(".down__menu");
        var parent = downMenu.parentElement;
        var social = document.body.querySelectorAll(".social");
        parent.removeChild(downMenu);
        parent.insertBefore(downMenu, parent.firstElementChild);
        var socialParent = social[0].parentElement;
        socialParent.removeChild(social[0]);
        socialParent.removeChild(social[1]);
        var end = document.createElement("div");
        end.className = "social-around";
        end.appendChild(social[0]);
        end.appendChild(social[1]);
        parent.insertBefore(end, parent.firstElementChild.nextElementSibling);
    }
}

/* CANCEL DOWN MENU ON RESIZE*/
function returnFromMobile() {
    if (document.body.clientWidth >= 480) {
        var down = document.body.querySelector(".down");
        var downMenu = document.body.querySelector(".down__menu");
        var parent = downMenu.parentElement;
        var social = document.body.querySelectorAll(".social");
        var end = document.body.querySelectorAll(".social-around");
        downMenu.parentElement.removeChild(downMenu);
        down.appendChild(downMenu);
        var linksRight = document.body.querySelector(".links .right");
        linksRight.appendChild(social[0]);
        linksRight.appendChild(social[1]);
        down.removeChild(down.firstElementChild);
        
    }
}

/* MOBILE MENU SHOW */
function mobileMenu() {
    var btnMainMenu = document.body.querySelector(".main-nav");
    var closeMainMenu = document.body.querySelector(".close-main-menu");
    var mainMenuWrap = document.body.querySelector(".main-menu__wrap");
// mobile menu show
    btnMainMenu.onclick = function (e) {
        if (this === e.target) {
            if (document.body.clientWidth < 480) {
                this.style.position = "absolute";
                this.style.width = "100%";
                this.style.zIndex = "3035";
                this.style.background = "none";
                this.style.border = "none";
                this.style.height = "auto";
                closeMainMenu.style.display = "block";
                mainMenuWrap.style.display = "block";
                mainMenuWrap.style.height = document.documentElement.clientHeight - 69 + "px";
                mainMenuWrap.style.width = this.clientWidth;
            }
        }
    }
// mobile menu close
    closeMainMenu.onclick = function () {
        btnMainMenu.style.cssText = "";
        mainMenuWrap.style.cssText = "";
        this.style.display = "none";
    }
}

/* SEARCH FOR TABLET */
function prepeareTabletSearch() {
    var btnSearch = document.querySelector(".btn-search");
    var search = document.querySelector(".tablet-search");
// on focus    
    btnSearch.onclick = function() {
        this.style.display = "none";
        search.removeAttribute("placeholder");
        search.style.width = "100%";
        search.style.left = "0%";
        setTimeout(function() {search.setAttribute("placeholder", "Style Name"); }, 900);
        search.style.paddingRight = "15px";
        search.focus();
    }
// on esc
    search.onblur = function () {
        if (document.body.clientWidth >= 480 && document.body.clientWidth < 1025) {
            this.removeAttribute("placeholder");
            this.value = "";
            search.style.padding = "0px";
            this.style.width = "0px";
            this.style.left = "100%";
            btnSearch.style.display = "block";
        }    
    }
    
    
}

/* STICKY FOR FILTERS */
function filterSticky() {
    var sticky = document.querySelector(".filters");
    var child = document.querySelector(".sticky__tablet-menu");  
    window.addEventListener("scroll", stickyScroll, false);
    document.body.addEventListener("scroll", stickyScroll, false); 
    function stickyScroll() {
        if (document.body.clientWidth > 1024 || document.body.clientWidth < 480)
            return;
        if (sticky.getBoundingClientRect().top <= 0) { 
            child.style.position = "fixed";
        } 
        else {
            child.style.position = "static";
        }
        window.addEventListener("resize", function() {sticky.children[0].style.width = getComputedStyle(sticky, "").width}, false);  
    }
}

/* FILTER FOR TABLET */
function createFilterForTablet() {
    var fTabletMenuList = document.body.querySelector(".tablet-menu__list");
    var dropDownMenu = document.body.querySelector(".drop-down-menu");
    var stripConteiner = dropDownMenu.querySelector(".drop-down-menu .list");
// show filter
    fTabletMenuList.onclick = function () {
        this.lastElementChild.style.display = "none";
        var fon = dropDownMenu.lastElementChild;
        fon.style.height = document.documentElement.clientHeight + "px";
        dropDownMenu.style.display = "block";
        stripConteiner.style.height = document.documentElement.clientHeight - 119 +"px";
    }
// close filter
    dropDownMenu.firstElementChild.firstElementChild.onclick = function () {
        dropDownMenu.style.display = "none";
        fTabletMenuList.lastElementChild.style.display = "inline-block";
    }
// filter choose
    var spanList = document.body.querySelectorAll(".drop-down-menu .item__list span");
//flag for click not down
    var flag;
    for (var i =0, n = spanList.length; i < n; i++) {
        spanList[i].onclick = function (e) {
            if (flag == true)
                return;
            var parent = this.parentElement;
            var parentName = parent.previousElementSibling.innerHTML;
//reset color
            var shortSpanList = parent.querySelectorAll("span");
            for (var j =1, n = shortSpanList.length; j < n; j++) {
                shortSpanList[j].style.color = "#a8a8a8";    
            }
//get selector of name
            var selec;
            switch (parentName) {
                case "Fashion":
                    selec = "f1";
                    break;
                case "Product type":
                    selec = "f2";
                    break;
                case "Color":
                    selec = "f3";
                    break;
                case "Brand":
                    selec = "f4";
                    break;
                case "Size":
                    selec = "f5";
                    break;
                case "Price range":
                    selec = "f6";
                    break;
            }
            var spanChange = fTabletMenuList.getElementsByClassName(selec)[0];
//if not click on "not selected"
            if (this != shortSpanList[0]) {
                this.style.color = "#f14a58";
                spanChange.style.color = "#f14a58";
                spanChange.innerHTML = this.innerHTML;
            }
            else {
                spanChange.style.color = "#000000";
                spanChange.innerHTML = parentName;        
            }
//left sliding
            var leftMarg = 0.0520833333333333 * document.body.clientWidth;
            if (document.body.clientWidth < 480) 
                leftMarg = 0.0533333333333333 * document.body.clientWidth ;
            parent.style.transition = "all 1s";
            parent.style.marginLeft = (- this.offsetLeft + parseInt(getComputedStyle(parent).marginLeft) + leftMarg) + "px";
        }
    }
// filter strip move
    var stripList = dropDownMenu.querySelectorAll(".item__list");
    
    for (var i =0, n = stripList.length; i < n; i++) {
        stripList[i].onmousedown = function (e) {
            flag = false;
            var thisCoords = getCoords(this);
            var shiftX = e.pageX - thisCoords.left;
            var ContCoords = getCoords(stripConteiner);
            var tempStrip = this;
            document.onmousemove = function(e) {
                flag = true;
                var newLeft = e.pageX - shiftX - ContCoords.left;
//mostright position
                if ( newLeft < - (tempStrip.clientWidth) + 0.05078125 * stripConteiner.clientWidth + tempStrip.lastElementChild.clientWidth) {
                    newLeft = - (tempStrip.clientWidth) + 0.05078125 * stripConteiner.clientWidth + tempStrip.lastElementChild.clientWidth;
                }
//mostleft position
                if (newLeft > 0.05078125 * stripConteiner.clientWidth) {
                    newLeft = 0.05078125 * stripConteiner.clientWidth;
                }
                tempStrip.style.marginLeft = newLeft + 'px';
            }
            document.onmouseup = function() {
                document.onmousemove = document.onmouseup = null;
            }   
            return false;  
        }
        stripList[i].addEventListener("touchstart", function (e) {
            flag = false;
            var thisCoords = getCoords(this);
            var shiftX = e.touches[0].pageX - thisCoords.left;
            var ContCoords = getCoords(stripConteiner);
            var tempStrip = this;
            document.addEventListener("touchmove", stripMove); 
            function stripMove(e) {
                flag = true;
                var newLeft = e.touches[0].pageX - shiftX - ContCoords.left;
                if ( newLeft < - (tempStrip.clientWidth) + 0.05078125 * stripConteiner.clientWidth + tempStrip.lastElementChild.clientWidth) {
                    newLeft = - (tempStrip.clientWidth) + 0.05078125 * stripConteiner.clientWidth + tempStrip.lastElementChild.clientWidth;
                }
                if (newLeft > 0.05078125 * stripConteiner.clientWidth) {
                    newLeft = 0.05078125 * stripConteiner.clientWidth;
                }
                tempStrip.style.marginLeft = newLeft + 'px';
            }
            document.addEventListener("touchend", stripMoveEnd); 

            function stripMoveEnd() {
                document.removeEventListener("touchmove", stripMove);
                document.removeEventListener("touchend", stripMoveEnd);
            }   
            return false;  
        })
	    stripList[i].ondragstart = function() {
            return false;
        }
    }
// help function for coords
    function getCoords(elem) { 
        var box = elem.getBoundingClientRect();
        return {
            top: box.top + pageYOffset,
            left: box.left + pageXOffset
        } 
    }    
}

/* BANNER MOVE FOR DIFFERENT SIZE */
function bannerMove() {
    var ban = document.body.querySelector(".arrivals__banner");
    var parent = document.body.querySelector(".arrivals .conteiner"); 
    if (document.body.clientWidth < 1025 && document.body.clientWidth >= 480 ) {
        var test = parent.firstElementChild;
        test = test.nextElementSibling.nextElementSibling.nextElementSibling;
        if (test === ban)
            return;
        else {
            parent.removeChild(ban);
            parent.insertBefore(ban, parent.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling);
        }
    }
    if (document.body.clientWidth > 1024) {
       var test = parent.firstElementChild;
        test = test.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling;
        if (test === ban)
            return;
        else {
            parent.removeChild(ban);
            parent.insertBefore(ban, parent.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling);
        }
           
    }
    if (document.body.clientWidth < 480) {
        var test = parent.firstElementChild;
        test = test.nextElementSibling.nextElementSibling;
        if (test === ban)
            return;
        else {
            parent.removeChild(ban);
            parent.insertBefore(ban, parent.firstElementChild.nextElementSibling.nextElementSibling);
        }    
    }
 }

/* MAIN MENU ACTIVE COLOR */
function mainMenuActiveColor() {
    var mainMenu = document.body.querySelectorAll(".main-menu li a");
    for (var i =0, n = mainMenu.length; i < n; i++) {
        mainMenu[i].onclick = function () {
            for (var j =0, k = mainMenu.length; j < k; j++) {
                mainMenu[j].style.color = "#000";
            }
            this.style.color = "#f14a58";
        }
    }
}



/* ON DESK FILTER HOVER */
function createDeskFilter() {
    var mainMenuList = document.body.querySelectorAll(".filters__menu >li");
// change background    
    for (var i =0, n = mainMenuList.length - 1; i < n; i++) {
        mainMenuList[i].onmouseenter = function () {
            this.firstElementChild.nextElementSibling.nextElementSibling.style.display = "block";
            if (this.firstElementChild.nextElementSibling.style.display == "none") {
                this.style.backgroundColor = "#f7f7f7";    
            }
        }
        mainMenuList[i].onmouseleave = function () {
            this.firstElementChild.nextElementSibling.nextElementSibling.style.display = "none";
            if (this.firstElementChild.nextElementSibling.style.display == "none") {
                this.style.backgroundColor = "#ffffff";    
            }
        }
    }
// on choose filter  
    var subMenuList = document.body.querySelectorAll(".filters__sub-menu >li");
    for (var i =0, n = subMenuList.length; i < n; i++) {
        subMenuList[i].onclick = function () {
            var Parent = this.parentElement;
            var GrandParent = Parent.parentElement;
// change style for choosen filter
            if (this.innerHTML !== "Not selected") {
                GrandParent.firstElementChild.style.paddingTop = "13px";
                GrandParent.firstElementChild.style.font = "bold 12px Roboto";
                GrandParent.firstElementChild.nextElementSibling.innerHTML = this.innerHTML;
                GrandParent.firstElementChild.nextElementSibling.style.display = "block";
                GrandParent.style.backgroundColor = "#f7f7f7";
            }
            else {
                GrandParent.firstElementChild.style = "";
                GrandParent.style.backgroundColor = "#ffffff";
                GrandParent.firstElementChild.nextElementSibling.style.display = "none";
            }
            Parent.style.display = "none";
        }
    } 
}

/* PRICE TRACKBAR */
function createPriceTrackBar() {
    var mainMenuList = document.body.querySelectorAll(".filters__menu >li");
//trackbar mooving    
    var mainTrack = document.body.querySelector(".main-track");
    var left = document.body.querySelector(".price-slider .left");
    var subTrack = document.body.querySelector(".sub-track");
    var right = document.body.querySelector(".price-slider .right");
    var begin = document.body.querySelector(".price__begin");
    var end = document.body.querySelector(".price__end");
// left bar    
    left.onmousedown = function (e) {
        var leftCoord = getCoords(this);
        var shiftX = e.pageX - leftCoord.left;
        var mainTrackCoord = getCoords(mainTrack);
        document.onmousemove = function (e) {
            var newLeft = e.pageX - shiftX - mainTrackCoord.left;
// on cursor out left 
            if (newLeft < - 3) {
                newLeft = - 3;
            }
// on cursor out right
            var rightEdge = getCoords(right).left - mainTrackCoord.left - left.offsetWidth; 
            if (newLeft > rightEdge) {
                newLeft = rightEdge;
            }
            left.style.left = newLeft + "px";
            subTrack.style.left = newLeft + "px";
            subTrack.style.width = (rightEdge - newLeft + left.offsetWidth) + "px"
            begin.innerHTML ="&pound; " + Math.round((newLeft + left.offsetWidth) * (1000/(mainTrack.clientWidth - 3))) + ".00";
        }
        document.onmouseup = function () {
            document.onmousemove = document.onmouseup = null;
        }
        return false;
    }
// right bar   
    right.onmousedown = function (e) {
        var leftCoord = getCoords(this);
        var shiftX = e.pageX - leftCoord.left;
        var mainTrackCoord = getCoords(mainTrack);
        document.onmousemove = function (e) {
            var newLeft = e.pageX - shiftX - mainTrackCoord.left;
            if (newLeft < getCoords(left).left - mainTrackCoord.left + left.offsetWidth) {
                newLeft = getCoords(left).left - mainTrackCoord.left + left.offsetWidth;
            }
// on cursor out right
            var rightEdge = mainTrack.offsetWidth - right.offsetWidth;
            if (newLeft > rightEdge) {
                newLeft = rightEdge;
            }
            right.style.left = newLeft + "px";
            subTrack.style.width = newLeft -  (getCoords(left).left - mainTrackCoord.left) + "px";
            end.innerHTML = "&pound; " + Math.round(newLeft*(1000/(mainTrack.clientWidth - 3))) + ".00";
        }
        document.onmouseup = function () {
            document.onmousemove = document.onmouseup = null;
        }
        return false;
    }

    left.ondragstart = function () {
        return false;
    }

    right.ondragstart = function () {
        return false;
    }
    
    right.style.left = (mainTrack.clientWidth - 3) +"px"; 
    var sBegin = document.body.querySelector(".price__begin");
    sBegin.innerHTML = "&pound; 0.00"
    
    function getCoords(elem) { 
        var box = elem.getBoundingClientRect();
        return {
            top: box.top + pageYOffset,
            left: box.left + pageXOffset
        }
    }
}

function PriceTrackBarOnResize() {
    var sBegin = document.body.querySelector(".price__begin").innerHTML;
    sBegin = sBegin.substr(1, sBegin.length - 3);
    var sEnd = document.body.querySelector(".price__end").innerHTML; 
    sEnd = sEnd.substr(1, sEnd.length - 3);
    var left = document.body.querySelector(".price-slider .left");
    var subTrack = document.body.querySelector(".sub-track");
    var right = document.body.querySelector(".price-slider .right");
    var mainTrack = document.body.querySelector(".main-track");
    left.style.left = Math.round( sBegin/(1000/(mainTrack.clientWidth)) - 3) + "px";
    right.style.left = Math.round(sEnd/(1000/(mainTrack.clientWidth - 3))) + "px";
    subTrack.style.left = left.style.left;
    subTrack.style.width = parseInt(right.style.left) - parseInt(left.style.left) + "px";  
    
    
}

/* LOAD DATA TO TOP BAG */
function LoadTopBagData() {
    var bag = null;
    if(localStorage.getItem("bag") != null)
    var bag = JSON.parse(localStorage.getItem("bag"));
    var topBag = document.body.querySelector(".bag");
    //if bag not empty    
    if (bag != null) {
        var sumQuan = getSummQuant(bag);
        topBag.innerHTML = "Bag &pound; "+sumQuan[0] + " (" +sumQuan[1]+")";
    }
    else {
        topBag.innerHTML = "Bag";
    }
}

/* GET SUMM AND COUNT FOR ITEMS FROM BAG */
function getSummQuant(baggins) {
    var arr = new Array(2);
    arr[0] = 0;
    arr[1] = 0;
    for (var i = 0, n = baggins.length; i < n; i++) {
        arr[0] += +baggins[i].price;    
        arr[1] += +baggins[i].quantity;    
    }
    arr[0]= arr[0].toFixed(2);
    return arr;
} 

/* ANIMATION IN SLIDER*/
function sliderAnime() {
    var flag = true; 
    var slider1Timer = setInterval(function () {
        var slider1 = document.body.querySelector(".section-1 .slider");
        if (- parseInt(getComputedStyle(slider1).marginTop)  > slider1.clientHeight * 1/3) {
            slider1.style.transitionDuration = "0ms"
            slider1.style.marginTop = 0;
        }
        else {
            slider1.style.transitionDuration = "650ms"
            slider1.style.marginTop = parseInt(getComputedStyle(slider1).marginTop) - slider1.clientHeight/3 + "px";
        }
    }, 3000); 
    var slider2Timer = setInterval(function () {
// Part 4 with bags 
        var slider2 = document.body.querySelector(".section-2 .right a");
        flag = !flag;
        if (flag == true)
            slider2.style.backgroundImage = 'url("img/start/slide_2/5_1.png")';
        else
            slider2.style.backgroundImage = 'url("img/start/slide_2/5_2.png")'; 
    }, 1000); 

}


/* ADD MORE ITEMS */
function getXmlHttp() {
    var xmlhttp;
    try {
      xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
    } catch (e) {
      try {
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
      } catch (e) {
        xmlhttp = false;
      }
    }
    if (!xmlhttp && typeof XMLHttpRequest!='undefined') {
      xmlhttp = new XMLHttpRequest();
    }
    return xmlhttp;
  } 

function addMoreItems() {
    var showMore = document.body.querySelector(".show-more");
    showMore.onclick = function () {
        var xmlhttp = getXmlHttp(); 
        xmlhttp.open('GET', 'items.json', true); 
        xmlhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded'); 
        xmlhttp.onreadystatechange = function() {  
            if (xmlhttp.readyState == 4) {  
                if(xmlhttp.status == 200) {  
                    var list = JSON.parse(xmlhttp.responseText);
                        for (var i = 0, n = list.length; i < n; i++){
                            var arrItem = document.createElement("div");
                            arrItem.className = "arrivals__item";
                            var a = document.createElement("a");
                            a.href = "item.html";
                            var img = document.createElement("img");
                            img.src = list[i]["img"];
                            var quickView = document.createElement("div");
                            quickView.className = "quick-view";
                            var itemName = document.createElement("div");
                            itemName.className = "name";
                            var itemPrice = document.createElement("div");
                            itemPrice.className = "price";
                            //compile
                            itemPrice.innerHTML = "&pound; " + list[i]["price"];
                            itemName.innerHTML = list[i]["name"];
                            quickView.innerHTML = "View item";
                            a.appendChild(img);
                            a.appendChild(quickView);
                            a.appendChild(itemName);
                            a.appendChild(itemPrice);
                            arrItem.appendChild(a);
                            var arrConteiner = document.body.querySelector(".conteiner");
                            arrConteiner.appendChild(arrItem);
                        }
                        var arrItemList = document.body.querySelectorAll(".arrivals__item");
                        for (var i = 0, n = arrItemList.length; i < n; i++){
                            arrItemList[i].style.display = "block";
                        }
                        var doc =   xmlhttp.responseText;
                }
            }
        }
        xmlhttp.send();
    }
}
