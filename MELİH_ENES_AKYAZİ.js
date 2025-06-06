(() => {
  const API_URL =
    "https://gist.githubusercontent.com/sevindi/8bcbde9f02c1d4abe112809c974e1f49/raw/9bf93b58df623a9b16f1db721cd0a7a539296cf0/products.json";
  const STORAGE_KEYS = {
    products: "carousel_products",
    favorites: "carousel_favorites",
  };

  const loadJQuery = () => {
    return new Promise((resolve, reject) => {
      if (typeof window.jQuery !== "undefined") {
        resolve();
        return;
      }

      const script = document.createElement("script");
      script.src = "https://code.jquery.com/jquery-3.6.0.min.js";
      script.onload = () => resolve();
      script.onerror = () => reject();
      document.head.appendChild(script);
    });
  };

  const loadFont = () => {
    const link = document.createElement("link");
    link.href =
      "https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
  };

  const buildCSS = () => {
    const css = `
        * {
            box-sizing: border-box;
        }
        #carousel-container {
            width: 100%;
            max-width: 1320px;
            margin: 20px auto;
            border-radius: 50px 50px 16px 16px;
            position: relative;
            box-shadow: 0 2px 4px 0 #00000024;
        }

        #carousel-container h2 {
            font-family: Quicksand-Bold;
            font-size: 3rem;
            font-weight: 700;
            line-height: 1.11;
            color: #f28e00;
            margin-bottom: 10px;
        }

        .carousel-wrapper {
            position: relative;
        }

        .carousel-title-wrapper {
            display: flex;
            align-items: center;
            justify-content: space-between;
            background-color: #fef6eb;
            padding: 25px 67px;
            border-top-left-radius: 35px;
            border-top-right-radius: 35px;
            font-family: Quicksand-Bold;
            font-weight: 700;
        }

        .carousel-viewport {
            overflow: hidden;
            margin-top: 20px;
        }

        .carousel-track {
            display: flex;
            transform: translateX(0);
            transition: transform 0.3s ease;
        }

        .product-card {
            border: 2px solid transparent;
            border-radius: 12px;
            padding: 17px;
            background: white;
            position: relative;
            cursor: pointer;
            flex-shrink: 0;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            margin-right: 20px;
            width: 18.9%;
            border: 1px solid #ededed;
            border-radius: 10px;
        }

        .product-card:hover {
            border-color: #f28e00;
        }

        .product-image {
            height: 180px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 10px;
        }

        .product-image img {
            max-height: 100%;
            object-fit: contain;
        }

        .product-info {
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            flex-grow: 1;
        }     

        .product-title {
            font-size: 1.2rem;
            font-family: 'Poppins', "cursive";
            font-weight: bold;
            margin-bottom: 5px;
            min-height: 55px; 
            line-height: 1.2;
            color: #7d7d7d;
        }

        .product-price {
            display: block;
            width: 100%;
            font-size: 2.2rem;
            font-weight: 600;
            height: 43px;
            color: #7d7d7d;
        }

        .price-discount-wrapper {
            display: flex;
            flex-direction: column;
        }

        .product-price.discounted{
            color: #00a365;
        }

        .discount-rate {
            color: #00a365;
            font-size: 16px;
            font-weight: 800;
            display: inline-flex;
            justify-content: center;
        }

        .price-row {
            display: flex;
            align-items: center;
            gap: 5px;
        }

        .old-price {
            text-decoration: line-through;
            color: #999;
            font-size: 12px;
            margin-left: 5px;
        }

        .discount {
            color: #f28e00;
            font-size: 13px;
        }

        .heart {
            position: absolute;
            top: 10px;
            right: 15px;
            cursor: pointer;
            background-color: #fff;
            border-radius: 50%;
            box-shadow: 0 2px 4px 0 #00000024;
            width: 50px;
            height: 50px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 20px;
            color: #ccc;
            transition: all 0.3s ease;
            z-index: 2;
        }

        .heart.filled {
            color: #f28e00;
        }

        .heart:hover {
            border: 1px solid #f28e00;
            box-shadow: 0 0 6px #f28e00;
        }

        .carousel-btn {
            width: 50px;
            height: 50px;
            background-color: #fef6eb;
            background-repeat: no-repeat;
            background-position: 18px center;
            border: 1px solid transparent;
            border-radius: 50%;
            position: absolute;
            bottom: 50%;
            transform: translateY(-50%);
            cursor: pointer;
            z-index: 9;
        }

        .carousel-btn.left {
            background-image: url('/assets/svg/prev.svg');
            left: -65px;
        }

        .carousel-btn.right {
            background-image: url('/assets/svg/next.svg');
            right: -65px;
        }

        .star-wrapper {
            color: #fed100;
            font-size: 24px;
            padding: 5px 0 15px;
            margin-bottom: .5rem;
        }

        .add-to-cart{
            width: 100%;
            padding: 15px 20px;
            border-radius: 37.5px;
            background-color: #fff7ec;
            color: #f28e00;
            font-family: Poppins, sans-serif;
            font-size: 1.4rem;
            font-weight: 700;
            margin-top: auto;
        }


        @media (max-width: 1480px) {
            .product-card {
                width: 23.5%;
            }
             #carousel-container {
            width: 85%;
        }
        }

        @media (max-width: 1280px) {
            .product-card {
                width: 32%;
            }
            
            .carousel-title-wrapper {
                padding: 20px 40px;
            }
            
            #carousel-container h2 {
                font-size: 2.5rem;
            }
            #carousel-container {
            width: 70%;
        }
        }

        @media (max-width: 992px) {
            .product-card {
                width: 49%;
            }
            #carousel-container {
                width: 52%;
            }

            .carousel-title-wrapper {
                padding: 15px 20px;
            }
            
            #carousel-container h2 {
                font-size: 2rem;
            }
            
            .carousel-btn.left {
                left: -45px;
            }
            
            .carousel-btn.right {
                right: -45px;
            }
        }

        @media (max-width: 768px) {
            .carousel-btn.left {
                left: -25px;
            }
            
            .carousel-btn.right {
                right: -25px;
            }
            #carousel-container {
                width: 40%;
            }
            .carousel-btn {
                width: 40px;
                height: 40px;
                background-position: 15px center;
            }
        }`;

    jQuery("<style>").addClass("carousel-style").html(css).appendTo("head");
  };

  const getProducts = async () => {
    const cached = localStorage.getItem(STORAGE_KEYS.products);
    if (cached) {
      return JSON.parse(cached); // local storage kontrolü
    }

    //local storage boşsa fetchle
    const res = await fetch(API_URL);
    const data = await res.json();
    localStorage.setItem(STORAGE_KEYS.products, JSON.stringify(data));
    return data;
  };

  const getVisibleCount = () => {
    if (window.innerWidth <= 992) return 2;
    if (window.innerWidth <= 1280) return 3;
    return 4;
  };

  const FAVORITES_KEY = STORAGE_KEYS.favorites;

  const getFavorites = () => {
    const favs = localStorage.getItem(FAVORITES_KEY);
    return favs ? JSON.parse(favs) : [];
  };

  const setFavorites = (favs) => {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favs));
  };

  const buildHTML = (products) => {
    const favorites = JSON.parse(
      localStorage.getItem(STORAGE_KEYS.favorites) || "[]"
    );

    const $outerWrapper = jQuery(
      '<div class="carousel-outer-wrapper" style="width: 100%;"></div>'
    );
    const $container = jQuery('<div id="carousel-container"></div>');

    const $titleWrapper = jQuery('<div class="carousel-title-wrapper"></div>');
    const $title = jQuery("<h2>Beğenebileceğinizi düşündüklerimiz</h2>");

    const $carouselWrapper = jQuery('<div class="carousel-wrapper"></div>');
    const $carouselViewport = jQuery('<div class="carousel-viewport"></div>');
    const $track = jQuery('<div class="carousel-track"></div>');

    let position = 0;
    let visibleCount = getVisibleCount();

    const updateCarousel = () => {
      const newVisibleCount = getVisibleCount();
      if (newVisibleCount !== visibleCount) {
        visibleCount = newVisibleCount;
        position = 0;
        $track.css("transform", `translateX(0)`);
      }
    };

    products.forEach((product) => {
      const hasDiscount = product.price !== product.original_price;
      const discountRate = hasDiscount
        ? Math.round(
            ((product.original_price - product.price) /
              product.original_price) *
              100
          )
        : 0;

      const $card = jQuery('<div class="product-card"></div>');

      const $imageWrapper = jQuery('<div class="product-image"></div>');
      $imageWrapper.append(
        `<img src="${product.img}" alt="${product.name}" />`
      );

      const $info = jQuery('<div class="product-info"></div>');
      $info.append(`<p class="product-title">${product.name}</p>`);
      $info.append(`<div class="star-wrapper">★★★★★</div>`);

      if (hasDiscount) {
        $info.append(`
            <div class="price-discount-wrapper">
            <div class="price-row">
                <span class="old-price">${product.original_price.toFixed(
                  2
                )} TL</span>
             <span class="discount-rate">%${discountRate}</span>
             </div>
             <div class="product-price discounted">${product.price.toFixed(
               2
             )} TL</div>
            </div>
        `);
      } else {
        $info.append(`
         <div class="price-discount-wrapper">
            <div class="price-row" style="visibility: hidden;">
             <span class="old-price">00,00 TL</span>
             <span class="discount-rate">%00</span>
            </div>
             <div class="product-price">${product.price.toFixed(2)} TL</div>
            </div>
        `);
      }

      $info.append(`<button class="add-to-cart">Sepete Ekle</button>`);

      const isFavorite = favorites.includes(product.id);
      const $heart = jQuery(
        `<span class="heart ${isFavorite ? "filled" : ""}">♡</span>`
      );
      $heart.attr("data-id", product.id);

      $card.append($imageWrapper, $info, $heart);

      $card.on("click", function (e) {
        if (!jQuery(e.target).hasClass("heart")) {
          window.open(product.url, "_blank");
        }
      });

      $track.append($card);
    });

    const $leftBtn = jQuery('<button class="carousel-btn left"></button>');
    const $rightBtn = jQuery('<button class="carousel-btn right"></button>');

    const getMaxScroll = () => {
      const currentVisibleCount = getVisibleCount();
      return Math.max(0, products.length - currentVisibleCount);
    };

    $leftBtn.on("click", () => {
      if (position > 0) {
        position--;
        const translateX = (position * 100) / getVisibleCount();
        $track.css("transform", `translateX(-${translateX}%)`);
      }
    });

    $rightBtn.on("click", () => {
      const maxScroll = getMaxScroll();
      if (position < maxScroll) {
        position++;
        const translateX = (position * 100) / getVisibleCount();
        $track.css("transform", `translateX(-${translateX}%)`);
      }
    });

    // Window resize handler
    jQuery(window).on("resize", () => {
      updateCarousel();
    });

    $carouselViewport.append($track);
    $carouselWrapper.append($leftBtn, $carouselViewport, $rightBtn);
    $titleWrapper.append($title);
    $container.append($titleWrapper, $carouselWrapper);

    $outerWrapper.append($container);
    const section2A = jQuery('cx-page-slot[position="Section2A"]');
    if (section2A.length) {
      section2A.prepend($outerWrapper);
    } else {
      jQuery("body").append($outerWrapper);
    }
  };

  const setEvents = () => {
    jQuery(document).on("click", ".heart", function (e) {
      e.stopPropagation();
      const id = parseInt(jQuery(this).attr("data-id"));
      let favorites = getFavorites();

      if (jQuery(this).hasClass("filled")) {
        favorites = favorites.filter((favId) => favId !== id);
        jQuery(this).removeClass("filled");
      } else {
        favorites.push(id);
        jQuery(this).addClass("filled");
      }

      setFavorites(favorites);
    });
  };

  const init = async () => {
    if (window.location.pathname !== "/") {
      console.log("wrong page");
      return;
    }

    await loadJQuery();
    loadFont();
    buildCSS();

    const products = await getProducts();
    buildHTML(products);
    setEvents();
  };

  init();
})();
