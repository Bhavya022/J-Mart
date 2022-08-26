import header from './header.js';
import footer from './footer.js';

let footer_div = document.querySelector('footer');
let nav = document.querySelector('nav');


footer_div.innerHTML = footer();
nav.innerHTML = header();
nav.style.width = "100%";
footer_div.style.width = "100%";

let display_pin = document.getElementById('pin');

let count_display = document.getElementById('cart_counter');
let cart_count;

displayCount();
currentLocation();

function counter(){
    cart_count += 1;
    localStorage.setItem('count', JSON.stringify(cart_count));
    displayCount();
}

function displayCount(){
    cart_count = JSON.parse(localStorage.getItem('count'))||0;
    count_display.innerText = +cart_count;
}


let data = JSON.parse(localStorage.getItem("check"));

let small_img = document.querySelector(".small-img > img");
small_img.src = data.image;
let item_img = document.querySelector(".item-img > img");
item_img.src = data.image;

document.title = data.title.substring(0,20)+"...";

let link = document.getElementById("link");
link.innerText = data.title.substring(0,30)+"...";

let title = document.querySelector(".all-description > h1:first-child");
title.innerText = data.title;

let rs = document.getElementById("rs");
rs.innerText = data.price;

let title1 = document.getElementById("title");
title1.innerText = data.title;

let description = document.getElementById("description");
description.innerText = data.description;

let ratingCount = document.getElementById("ratingCount");
ratingCount.innerText = data.rating.rate;

let basedon = document.getElementById("basedon");
basedon.innerText = data.rating.count;

let i_add_to_cart = document.querySelector(".i_add_to_cart");
i_add_to_cart.addEventListener("click", function(){
    let jiomart = JSON.parse(localStorage.getItem("jiomart")) || [];
    jiomart.push(data);
    localStorage.setItem("jiomart", JSON.stringify(jiomart));
    counter();
});

function currentLocation(){
    const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
    };

    async function success(pos) {
    const crd = pos.coords;
    // console.log(crd);

    let res = await fetch(`https://api.openweathermap.org/geo/1.0/reverse?lat=${crd.latitude}&lon=${crd.longitude}&limit=5&appid=63c3704e63cc40d74ad87bdb9f68f3b8`);
    let data = await res.json();
    let city = data[0].name;
    // console.log(city)

    let res2 = await fetch(`https://api.postalpincode.in/postoffice/${city}`);
    let data2 = await res2.json();
    // console.log(data2[0])
    display_pin.innerText = data2[0].PostOffice[0].Pincode;
    }


    function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
    }

    navigator.geolocation.getCurrentPosition(success, error, options);
}