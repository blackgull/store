$(document).ready(() => {
    //Товары
    new Product('json/getProduct.json', '.products-box');

    //Товары недели
    new Product('json/getProductWeek.json', '.products-box-week');

    //Популярные товары
    new Product('json/getProductSimilar.json', '.products-box-similar');

    //Корзина
    let mycart = new Cart('json/getCart.json');

    //Отзывы
    new Review('json/getReviews.json', '.form-field-reviews', '.reviews-add-container');

    //Добавление товара в корзину
    $('.products-box, .products-box-week, .products-box-similar').on('click', '.add-to-cart', e => {
        mycart.addProduct(e.target);
    });

    //Добавление товара в корзину на странице одного товара
    $('.arrivals-collection').on('click', '.button-add-to-cart-arrivals', e => {
        mycart.addProduct(e.target);
    });

    //Удаление товара
    $('.cart-create').on('click', '.cross-delete-product', e => {
        let idProduct = parseInt($(e.target).attr('data-id'));
        mycart.remove(idProduct);
    });

    //Удаление товара из всплывающего меню корзины
    $('.cart-header-create').on('click', '.button-del-box-head-cart', e => {
        let idProduct = parseInt($(e.target).attr('data-id'));
        mycart.remove(idProduct);
    });

    //Изменение количества товара в корзине
    $('.cart-create').on('click', '.field-quantity-shopping-cart', e => {
        let quantityProduct = parseInt($(e.target).val());
        let idProduct = parseInt($(e.target).attr('data-id'));
        mycart.getQuantity(idProduct, quantityProduct);
    });

    //Очистка корзины
    $('.cart-create').on('click', '.button-clear-shoping-cart', e => {
        let clearCartBtn = parseInt($(e.target).attr('data-id'));
        mycart.clearCart(clearCartBtn);
    });
});