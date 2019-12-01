class Cart {
    constructor(source, containerCartBody = '.cart-create', containerCartHead = '.cart-header-create') {
        this.source = source;
        this.container = containerCartBody;
        this.containerHead = containerCartHead;
        this.countGoods = 0; // Общее кол-во товаров в корзине
        this.subAmount = 0;  // Предварительная стоимость товаров
        this.amount = 0;     // Общая стоимость товаров
        this.cartItems = []; // Массив с товарами
        this._init(this.source);
    }

    _render() {
        let $containerProducts = $('<div/>', {
            class: 'container-product-create'
        });

        let $shopBtnCart = $('<div/>', {
            class: 'button-shopping-cart'
        });
        $shopBtnCart.append($(`<button class="button-clear-shoping-cart">CLEAR SHOPPING CART</button>`));
        $shopBtnCart.append($(`<a href="product.html" class="button-clear-shoping-cart">CONTINUE SHOPPING</a>`));

        let $containerFormOrder = $('<div/>', {
            class: 'form-field-order'
        });

        let $shippingAadressDiv = $('<div/>', {
            class: 'shipping-adress'
        });
        $shippingAadressDiv.text('Shipping Adress');
        $shippingAadressDiv.appendTo($containerFormOrder);

        let $containerFormAdress = $('<form/>', {
            class: '',
            action: '#'
        });
        $containerFormAdress.append($(`<select class="form-shipping-adress-country"><option class="form-shipping-adress-country-default">Bangladesh</option><option>Bangladesh-2</option></select>`));
        $containerFormAdress.append($(`<input class="form-shipping-adress-state" type="text" placeholder="State">`));
        $containerFormAdress.append($(`<input class="form-shipping-adress-state" type="text" placeholder="Postcode / Zip">`));
        $containerFormAdress.append($(`<button class="button-get-a-quote" type="submit">Get a&nbsp;quote</button>`));
        $containerFormAdress.appendTo($shippingAadressDiv);

        let $couponeDiscountDiv = $('<div/>', {
            class: 'coupon-discount'
        });
        $couponeDiscountDiv.text('Coupon Discount');
        $couponeDiscountDiv.appendTo($containerFormOrder);

        let $containerFormCoupone = $('<form/>', {
            class: '',
            action: '#'
        });
        $containerFormCoupone.append($(`<div class="text-enter-coupon-code">Enter your coupon code if&nbsp;you have one</div>`));
        $containerFormCoupone.append($(`<input class="form-shipping-adress-state" type="text" placeholder="Coupon code">`));
        $containerFormCoupone.append($(`<button class="button-get-a-quote" type="submit">Apply coupon</button>`));
        $containerFormCoupone.appendTo($couponeDiscountDiv);

        let $containerCartTotal = $('<div/>', {
            class: 'proceed-to-checkout'
        });
        $containerCartTotal.appendTo($containerFormOrder);

        let $subTotalPrice = $('<div/>', {
            class: 'sub-total-block'
        });
        $subTotalPrice.append($(`<div class="text-sub-total">Sub total</div>`));
        $subTotalPrice.append($(`<div class="number-sub-total">${this.subAmount}</div>`));
        $subTotalPrice.appendTo($containerCartTotal);

        let $grandTotalPrice = $('<div/>', {
            class: 'grand-total-block'
        });
        $grandTotalPrice.append($(`<div class="text-grand-total">GRAND TOTAL</div>`));
        $grandTotalPrice.append($(`<div class="number-grand-total">${this.amount}</div>`));
        $grandTotalPrice.appendTo($containerCartTotal);

        let $borderBottom = $('<div/>', {
            class: 'grand-total-border-bottom'
        });
        $borderBottom.appendTo($containerCartTotal);

        let $toCheckoutBtn = $('<a/>', {
            class: 'button-proceed-to-checkout',
            href: 'checkout.html'
        });
        $toCheckoutBtn.text('Proceed to checkout');
        $toCheckoutBtn.appendTo($containerCartTotal);

        let $cartHeader = $('<a/>', {
            href: 'shopping-cart.html'
        });
        $cartHeader.append($(`<img class="cart" src="img/cart.svg" alt="cart">`));
        $cartHeader.append($(`<span class="product-quantity-in-cart">${this.countGoods}</span>`));

        $containerProducts.appendTo($(this.container));
        $shopBtnCart.appendTo($(this.container));
        $containerFormOrder.appendTo($(this.container));
        $cartHeader.appendTo($(this.containerHead));

        //--- Рендер всплывающего меню корзины ---//

        let $menuBoxCart = $('<div/>', {
            class: 'mega-box-cart'
        });

        let $containerMenuCart = $('<div/>', {
            class: 'mega-flex'
        });

        let $menuCartBoxProduct = $('<div/>', {
            class: 'head-menu-cart-box-product'
        });
        $menuCartBoxProduct.appendTo($containerMenuCart);

        let $totalMenuCart = $('<div/>', {
            class: 'text-total-box-head-cart'
        });
        $totalMenuCart.text('TOTAL');
        $totalMenuCart.append($(`<span class="price-total-box-head-cart">${this.amount}</span>`));
        $totalMenuCart.appendTo($containerMenuCart);

        let $menuCartButtons = $('<div/>', {
        });
        $menuCartButtons.append($(`<a class="button-checkout-box-head-cart" href="checkout.html">Checkout</a>`));
        $menuCartButtons.append($(`<a class="button-toCart-box-head-cart button-checkout-box-head-cart" href="shopping-cart.html">Go to cart</a>`));
        $menuCartButtons.appendTo($containerMenuCart);

        $containerMenuCart.appendTo($menuBoxCart);
        $menuBoxCart.appendTo('.container-menu-head-cart');
    }

    _renderItem(product) {
        let $cartItemsDiv = $('<div/>', {
            class: 'shopping-cart-box-line2',
            'data-id': product.id_product
        });

        let $nameImgDiv = $('<div/>', {
            class: 'x4-column-table-content'
        });
        $nameImgDiv.append($(`<img src="${product.src_Img}" alt="${product.alt_Img}" class="img-cart-style">`));

        let $containerDiv = $('<div/>', {
            class: 'product-caption-text'
        });
        $containerDiv.append($(`<a href="single-page.html">${product.product_name}</a>`));
        $containerDiv.appendTo($nameImgDiv);

        let $popularStarsDiv = $('<div/>', {
            class: 'star alignment'
        });
        $popularStarsDiv.append($(`<span class="product-popularity-shopping-cart"><i class="fas fa-star"></i></span>`));
        $popularStarsDiv.append($(`<span class="product-popularity-shopping-cart"><i class="fas fa-star"></i></span>`));
        $popularStarsDiv.append($(`<span class="product-popularity-shopping-cart"><i class="fas fa-star"></i></span>`));
        $popularStarsDiv.append($(`<span class="product-popularity-shopping-cart"><i class="fas fa-star"></i></span>`));
        $popularStarsDiv.append($(`<span class="product-popularity-shopping-cart"><i class="fas fa-star-half-alt"></i></span>`));
        $popularStarsDiv.appendTo($containerDiv);

        let $specificationsDiv = $('<div/>', {
            class: 'product-color-shopping-cart'
        });
        $specificationsDiv.append($(`<div class="product-color-shopping-cart">Color:<span class="color-shopping-cart">${product.product_color}</span></div>`));
        $specificationsDiv.append($(`<div class="product-color-shopping-cart">Size:<span class="color-shopping-cart">${product.product_size}</span></div>`));
        $specificationsDiv.appendTo($containerDiv);

        let $unitePrice = $('<div/>', {
            class: 'x1-column-table-content',
            'data-price': product.price
        });
        $unitePrice.append($(`<div class="product-cart-price" data-price="${product.price}">$${product.price}</div>`));

        let $quantityCart = $('<div/>', {
            class: 'x1-column-table-content',
            'data-quantity': product.quantity,
            'data-id': product.id_product
        });
        $quantityCart.append($(`<input type="number" min="1" max="100" class="field-quantity-shopping-cart" data-id="${product.id_product}" data-quantity="${product.quantity}" name="quantity" value="${product.quantity}" placeholder="">`));

        let $shippingCart = $('<div/>', {
            class: 'x1-column-table-content'
        });
        $shippingCart.append($(`<div class="">FREE</div>`));

        let $subTotalPrice = $('<div/>', {
            class: 'x1-column-table-content'
        });
        $subTotalPrice.append($(`<div class="product-sub-price">$${product.price * product.quantity}</div>`));

        let $removeBtn = $('<div/>', {
            class: 'x1-column-table-content-right',
            'data-id': product.id_product
        });
        $removeBtn.append($(`<div class="cross-delete-product"><i class="fas fa-times-circle" data-id="${product.id_product}"></i></div>`));

        $nameImgDiv.appendTo($cartItemsDiv);
        $unitePrice.appendTo($cartItemsDiv);
        $quantityCart.appendTo($cartItemsDiv);
        $shippingCart.appendTo($cartItemsDiv);
        $subTotalPrice.appendTo($cartItemsDiv);
        $removeBtn.appendTo($cartItemsDiv);
        $cartItemsDiv.appendTo('.container-product-create');

        //--- Рендер товара во всплывающем меню корзины ---//

        let $containerProdCart = $('<div/>', {
            class: 'x3-column-table-cart',
            'data-id': product.id_product
        });
        $containerProdCart.append($(`<img src="${product.src_Img}" alt="${product.alt_Img}" class="img-box-head-cart" >`));

        let $productBoxHeadCart = $('<div/>', {
            class: 'product-box-head-cart'
        });
        $productBoxHeadCart.append($(`<a href="single-page.html">${product.product_name}</a>`));
        $productBoxHeadCart.appendTo($containerProdCart);

        let $popStarsHeadCart = $('<div/>', {
            class: 'star-box-head-cart alignment-box-head-cart'
        });
        $popStarsHeadCart.append($(`<span class="product-popularity-shopping-cart"><i class="fas fa-star"></i></span>`));
        $popStarsHeadCart.append($(`<span class="product-popularity-shopping-cart"><i class="fas fa-star"></i></span>`));
        $popStarsHeadCart.append($(`<span class="product-popularity-shopping-cart"><i class="fas fa-star"></i></span>`));
        $popStarsHeadCart.append($(`<span class="product-popularity-shopping-cart"><i class="fas fa-star"></i></span>`));
        $popStarsHeadCart.append($(`<span class="product-popularity-shopping-cart"><i class="fas fa-star-half-alt"></i></span>`));
        $popStarsHeadCart.appendTo($productBoxHeadCart);

        let $QPriceMenuCart = $('<div/>', {
            class: 'quantity-price-box-head-cart',
            'data-id': product.id_product
        });
        $QPriceMenuCart.append($(`<div class="quant-prod-menu-cart">${product.quantity}</div><span class="symbol-box-head-cart">x</span><div class="price-prod-menu-cart">$${product.price}</div>`));
        $QPriceMenuCart.appendTo($productBoxHeadCart);

        let $btnDelProdMenuCart = $('<div/>', {
            class: 'button-del-box-head-cart',
            'data-id': product.id_product
        });
        $btnDelProdMenuCart.append($(`<i class="fas fa-times-circle" data-id="${product.id_product}"></i>`));
        $btnDelProdMenuCart.appendTo($containerProdCart);

        $containerProdCart.appendTo('.head-menu-cart-box-product');
    }

    _renderSum() {
        $('.number-sub-total').text(`$${this.subAmount}`);
        $('.number-grand-total').text(`$${this.amount}`);
        $('.product-quantity-in-cart').text(`${this.countGoods}`);
        $('.price-total-box-head-cart').text(`$${this.amount}`);
    }

    _init(source) {
        this._render();
        fetch(source)
            .then(result => result.json())
            .then(data => {
                for (let product of data.contents) {
                    this.cartItems.push(product);
                    this._renderItem(product);
                }
                this.countGoods = data.countGoods;
                this.subAmount = data.subAmount;
                this.amount = data.amount;
                this._renderSum();
            })
    }

    _updateCart(product) {
        let $container = $(`div[data-id="${product.id_product}"]`);
        $container.find('.field-quantity-shopping-cart').val(`${product.quantity}`);
        $container.find('.product-sub-price').text(`$${product.quantity * product.price}`);
        $container.find('.quant-prod-menu-cart').text(`${product.quantity}`);
    }

    addProduct(element) {
        let productId = +$(element).data('product');
        let find = this.cartItems.find(product => product.id_product === productId);
        if (find) {
            find.quantity++;
            this.countGoods++;
            this.amount += find.price;
            this.subAmount += find.price;
            this._updateCart(find);
        } else {
            let product = {
                id_product: productId,
                price: +$(element).data('price'),
                product_name: $(element).data('name'),
                quantity: 1,
                src_Img: `img/products/prod-${productId}.jpg`,
                alt_Img: "product photo",
                product_color: "Blue",
                product_size: "XII"
            };
            this.cartItems.push(product);
            this.countGoods += product.quantity;
            this.subAmount += product.price;
            this.amount += product.price;
            this._renderItem(product);
        }
        this._renderSum();
    }

    remove(idProduct) {
        let find = this.cartItems.find(product => product.id_product === idProduct);

        this.countGoods -= find.quantity;
        this.subAmount -= find.price * find.quantity;
        this.amount -= find.price * find.quantity;
        this._renderSum();

        let $container = $(`div[data-id="${idProduct}"]`);
        this.cartItems.splice(this.cartItems.indexOf(find), 1);
        $container.remove();
    }

    getQuantity(idProduct, quantityProduct) {
        let find = this.cartItems.find(product => product.id_product === idProduct);
        if (find.quantity < quantityProduct) {
            find.quantity++;
            this._updateCart(find);
            this.countGoods++;
            this.subAmount += find.price;
            this.amount += find.price;
            this._renderSum();
        }
        if (find.quantity > quantityProduct) {
            find.quantity--;
            this._updateCart(find);
            this.countGoods--;
            this.subAmount -= find.price;
            this.amount -= find.price;
            this._renderSum();
        }
    }

    clearCart(clearCartBtn) {
        if (!clearCartBtn) {
            let $container = $('.container-product-create');
            this.cartItems.length = 0;
            $container.remove();
        }
        this.countGoods = 0;
        this.subAmount = 0;
        this.amount = 0;
        this._renderSum();
    }
}