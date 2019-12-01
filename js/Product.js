class Product {
    constructor(source, containerProductBody) {
        this.source = source;   // ссылка на подключаемый JSON файл с товарами
        this.container = containerProductBody;
        this.productItems = []; // Массив с товарами
        this._init(this.source);
    };

    _renderItem(product) {
        let $containerProduct = $('<div/>', {
            class: 'product-parent'
        });

        let $productBlockLink = $('<a/>', {
            class: 'product-blok',
            href: 'single-page.html'
        });
        $productBlockLink.appendTo($containerProduct);

        let $productBlockImg = $('<img/>', {
            class: 'image-style',
            src: `${product.src_Img}`,
            alt: `${product.alt_Img}`
        });
        $productBlockImg.appendTo($productBlockLink);

        let $productBlockText = $('<div/>', {
            class: 'product-text'
        });
        $productBlockText.append($(`<p class="product-description">${product.product_name}</p>`));
        // $productBlockText.append($(`<p class="product-price">$${product.price.toFixed(2)}</p>`));
        $productBlockText.appendTo($productBlockLink);

        let $productBlockPrice = $('<p/>', {
            class: 'product-price'
        });
        $productBlockPrice.text(`$${product.price.toFixed(2)}`);
        $productBlockPrice.appendTo($productBlockText);

        const $productBlockStars = $('<span/>', {
            class: 'star'
        });
        if (`${product.stars}` > 0) {
            $productBlockStars.append($(`<span class="product-popularity"><i class="fas fa-star"></i></span>`));
            $productBlockStars.append($(`<span class="product-popularity"><i class="fas fa-star"></i></span>`));
            $productBlockStars.append($(`<span class="product-popularity"><i class="fas fa-star"></i></span>`));
            $productBlockStars.append($(`<span class="product-popularity"><i class="fas fa-star"></i></span>`));
            $productBlockStars.append($(`<span class="product-popularity"><i class="fas fa-star"></i></span>`));
        }
        $productBlockStars.appendTo($productBlockPrice);

        let $productBtnBody = $('<div/>', {
            class: 'product-link-flex'
        });
        $productBtnBody.appendTo($containerProduct);

        let $containerBtnToCart = $('<div/>', {
            class: 'add-to-cart'
        });
        $containerBtnToCart.appendTo($productBtnBody);

        let $btnImgCartDiv = $('<div/>', {
            class: 'button-image-cart',
            'data-product': product.id_product,
            'data-name': product.product_name,
            'data-price': product.price
        });
        $btnImgCartDiv.appendTo($containerBtnToCart);

        let $containerImgCart = $('<img/>', {
            src: 'img/add-to-cart.svg',
            alt: 'add product to cart',
            'data-product': product.id_product,
            'data-name': product.product_name,
            'data-price': product.price
        });
        $containerImgCart.appendTo($containerBtnToCart);

        let $btnTextCartDiv = $('<div/>', {
            class: 'button-text-cart',
            'data-product': product.id_product,
            'data-name': product.product_name,
            'data-price': product.price
        });
        $btnTextCartDiv.text('Add to Cart');
        $btnTextCartDiv.appendTo($containerBtnToCart);

        $containerProduct.appendTo($(this.container));
    };

    _init(source) {
        fetch(source)
            .then(result => result.json())
            .then(data => {
                for (let product of data.contents) {
                    this.productItems.push(product);
                    this._renderItem(product);
                }
            });
    };
}