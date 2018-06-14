/**
 * Created by Sheludiackow on 19/04/18.
 */

var cart = {};   // Корзина

function init() {
    // Вычитываем файл tsconfig.json
    $.getJSON("tsconfig.json", tsconfigOut);
}

function tsconfigOut(data) {
    // Вывод на страницу
    console.log(data);
    var out='';
    for (var key in data) {
        //out +='<div class="cart">';
        //out +='<p class="name">+data[key].name+</p>';
        //out +='<img src="images/'+data[key].img+'" alt="">';
        //out +='<div class="cost">'+data[key].cost+'</div>';
        //out +='<button class="add-to-cart">Купить</button>';
        //out +='</div>';
        //---------------es6 new features-----------------------
        out +='<div class="cart">';
        out +=`<p class="name">${data[key].name}</p>`;
        out +=`<img src="images/${data[key].img}" alt="">`;
        out +=`<div class="cost">${data[key].cost}</div>`;
        out +=`<button class="add-to-cart" data-id="${key}">Купить</button>`;
        out +='</div>';
    }
    $('.tsconfig-out').html(out);                      // Выводим товар
    $('.add-to-cart').on('click', addToCart);          // Добавить товар в корзину
}

function addToCart() {
    // Добавляем товар в корзину
    var id = $(this).attr('data-id');
    //console.log(id);
    if (cart[id]==undefined){
        cart[id] = 1;           // Если в корзине нет товара то делаем равным 1
    }
    else {
        cart[id] ++;            // Если такой товар есть то увеличиваем на единицу
    }
    showMiniCart();
    saveCart();
}

function saveCart() {
    // Сохраняем корзину в localStorage (локальное хранилище браузера)
    localStorage.setItem('cart', JSON.stringify(cart));   // Корзину в строку
}

function showMiniCart() {      // Визуализация мини корзины
    var out="";
    for (var key in cart) {
        out += key +' ---- '+ cart[key]+'<br>';  // Отображение товара в корзине и перенос строки
    }
    $('.mini-cart').html(out);
}

function loadCart() {  // Если в локальном хранилище есть товар то показать корзину
    // Проверяем есть ли в localStorage запись cart
    if (localStorage.getItem('cart')){
        // Если есть то расшифровываем и записываем в переменную cart
        cart = JSON.parse(localStorage.getItem('cart'));
        showMiniCart();
    }
}

$(document).ready(function () {
    init();
    loadCart();  // Проверяет есть ли в localStorage что либо
});