/** Created by Sheludiackow on 25/04/18. ...*/

var cart = {};
function loadCart() {
    // Проверяю есть ли в localStorage запись cart
    if (localStorage.getItem('cart')) {
        // если есть - расшифровываю и заисываю в переменную cart
        cart = JSON.parse(localStorage.getItem('cart'));
            showCart();
        }
    else {
        $('.main-cart').html('Корзина пуста!');
    }
}

function showCart() {
    // Вывод корзины
    if (!isEmpty(cart)) {
        $('.main-cart').html('Корзина пуста');
    }
    else {
        $.getJSON('tsconfig.json', function (data) {
            var tsconfig = data;
            var out = '';
            for (var id in cart) {
                out += `<button data-id="${id}" class="del-tsconfig">x</button>`;
                out += `<img src="images//${tsconfig[id].img}">`;
                out += `${tsconfig[id].name }`;
                out += `  <button data-id="${id}" class="minus-tsconfig">-</button>  `;
                out += `${cart[id] }`;
                out += `  <button data-id="${id}" class="plus-tsconfig">+</button>  `;
                out += cart[id]*tsconfig[id].cost;
                out += '<br>';
            }
            $('.main-cart').html(out);
            $('.del-tsconfig').on('click', delTsconfig);
            $('.plus-tsconfig').on('click', plusTsconfig);
            $('.minus-tsconfig').on('click', minusTsconfig);

        });
    }
}

function delTsconfig() {
    // Удаляем весь товар из корзины
    var id = $(this).attr('data-id');  // получили id товара
    delete cart[id];                   // удалили из массива корзины
    saveCart();                        // Сохраняем корзину в localStorage
    showCart();                        // перерисовали корзину
}

function plusTsconfig() {
    // Добавляем товар в корзине
    var id = $(this).attr('data-id');  // получили id товара
    cart[id]++;                        // увеличивает количество товара на 1
    saveCart();                        // Сохраняем корзину в localStorage
    showCart();                        // перерисовали корзину
}

function minusTsconfig() {
    // Уменьшаем количество товара в корзине
    var id = $(this).attr('data-id');  // получили id товара
    if (cart[id]==1){                  // если количество товара равно 1
        delete cart[id];               // удаляем товар из корзины
    }
    else {
        cart[id]--;                    // уменьшаем количество товара на 1
    }
    saveCart();                        // Сохраняем корзину в localStorage
    showCart();                        // перерисовали корзину
}

function saveCart() {
    // Сохраняем корзину в localStorage (локальное хранилище браузера)
    localStorage.setItem('cart', JSON.stringify(cart));   // Корзину в строку
}

function isEmpty(object) {
    // Проверяем корзину на пустоту
    for (var key in object)
    if (object.hasOwnProperty(key)) return true;
    return false;
}

function sendEmail() {
    // Функция отправки сообщения клиенту
    var ename = $('#ename').val();
    var email = $('#email').val();
    var ephone = $('#ephone').val();
    if (ename!='' && email!='' && ephone!=''){   // Если поля заполнены то...
        if (isEmpty(cart)){                      // Если карзина не пуста то...
            $.post(
                "core/mail.php",
                {
                    "ename" : ename,
                    "email" : email,
                    "ephone" : ephone,
                    "cart" : cart
                },
                function (data) {
                    console.log(data);
                }
            );
        }
        else {
            alert('Корзина пуста');
        }
    }
    else {
        alert('Заполните поля');
    }
}

$(document).ready(function () {
    loadCart();
    $('.send-email').on('click', sendEmail);   // вешаем обытие на кнопку заказать (отправить письмо с заказом)
});

///// Смотреть урок 7
///// https://vk.com/web_assistant_page?w=wall-69629534_367%2Fall