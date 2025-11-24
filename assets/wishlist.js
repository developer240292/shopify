;(function (Wishlist, $) {
    var $vtwishlistBtn = $('.vtwishremove');
    var $wishlistCart = $('.cart');
    var $vtwishcount = $('.vtwishcount');
    var numProductTiles = $wishlistCart.length;
    var wishlist = localStorage.getItem('vtwishtems') || [];
    var wishcountall = localStorage.getItem('vtwishtemscount');

    

    $vtwishcount.html(wishcountall == null ? 0 : wishcountall);

    if (wishlist.length > 0) {
        wishlist = JSON.parse(localStorage.getItem('vtwishtems'));
    }
    var animateWishlist = function (e) {
        $(e).toggleClass('wishactive');
    };
    var updateWishlist = function (self) {
        var productHandle = $(self).attr('data-product-handle');
        var isRemove = $(self).hasClass('wishactive');
        //var vtwishcountvalue = localStorage.getItem('vtwishtemscount');
        if (isRemove) {
            var removeIndex = wishlist.indexOf(productHandle);
                wishlist.splice(removeIndex, 1);
            var vtwishcountp = localStorage.getItem('vtwishtemscount');
            if(vtwishcountp != null){
                var minus_val = -1;
                var wish_ct = Math.max(parseInt(vtwishcountp) + minus_val, 0);
                localStorage.setItem('vtwishtemscount', wish_ct);
            }
            localStorage.setItem('vtwishtems', JSON.stringify(wishlist));
            //var icon_length = $(self).find("span").length;
            if($(self).find("span").length != 0){
                $vtwishlistBtn.html('<span class="vtaddtowish"><svg><use xlink:href="#wish"></use></svg></span><span class="vtloadtowish wishanimated"><svg><use xlink:href="#refresh"></use></svg></span><span class="vtwishirmv"><svg><use xlink:href="#icon-close"></use></svg></span>');
            }
            //var vtwishcountp_value = localStorage.getItem('vtwishtemscount');
            $vtwishcount.html(localStorage.getItem('vtwishtemscount'));
        }
        else {
            wishlist.push(productHandle);
            var vtwishcountp = localStorage.getItem('vtwishtemscount');
            if(vtwishcountp == null){
                var plus_val = 1;
                var wish_ct = plus_val;
            }else{
            var plus_val = 1;
            var wish_ct = Math.max(parseInt(vtwishcountp) + plus_val, 0);
        }
            localStorage.setItem('vtwishtemscount',wish_ct);
            localStorage.setItem('vtwishtems', JSON.stringify(wishlist));
            var icon_length = $(self).find("span").length;
            if(icon_length != 0){
                $vtwishlistBtn.html('<span class="vtaddtowish"><svg><use xlink:href="#wish"></use></svg></span><span class="vtloadtowish wishanimated"><svg><use xlink:href="#refresh"></use></svg></span><span class="vtwishirmv"><svg><use xlink:href="#icon-close"></use></svg></span>');
            }
            var vtwishcountp_value = localStorage.getItem('vtwishtemscount');
            $vtwishcount.html(vtwishcountp_value);
        }
    };
    var activateWishItems = function () {
        $vtwishlistBtn.each(function () {
        var productHandle = $(this).attr('data-product-handle');
            if (wishlist.indexOf(productHandle) > -1) {
                $(this).addClass('wishactive');
                var icon_length = $(this).find("span").length;
                if($(this).hasClass('wishactive')){
                    if(icon_length != 0){
                        $(this).html('<span class="vtaddtowish"><svg><use xlink:href="#wish"></use></svg></span><span class="vtloadtowish wishanimated"><svg><use xlink:href="#refresh"></use></svg></span><span class="vtwishirmv"><svg><use xlink:href="#icon-close"></use></svg></span>');
                    }
                }else{
                    if(icon_length != 0){
                        $(this).html('<span class="vtaddtowish"><svg><use xlink:href="#wish"></use></svg></span><span class="vtloadtowish wishanimated"><svg><use xlink:href="#refresh"></use></svg></span><span class="vtwishirmv"><svg><use xlink:href="#icon-close"></use></svg></span>');
                    }
                }
            }
        });
    };
    var displayWishItems = function () {
        $wishlistCart.each(function () {
        var productHandle = $(this).attr('data-product-handle');
            if (wishlist.indexOf(productHandle) === -1) {
                $(this).remove();
                numProductTiles--;
            }
        });
    };
    var loadWishlist = function () {
        if (window.location.href.indexOf('pages/wishlist') > -1) {
        displayWishItems();
            $('.vtwishloader').fadeOut(2000, function () {
                $('.vtmainwish .wishlist-hero').addClass('wishvisible');
                //$('.wishlist-hero').addClass('wishvisible');
                if (numProductTiles == 0) {
                    $('.vtwishempty').addClass('wishvisible');
                    $('.vtmainwish').hide();
                } else {
                    $('.vtwishempty').hide();
                }
            });
        }
    };
    var bindUIActions = function () {
        $vtwishlistBtn.click(function (e) {
            e.preventDefault();
            updateWishlist(this);
            animateWishlist(this);
        });
    };
    Wishlist.init = function () {
        bindUIActions();
        activateWishItems();
        loadWishlist();
    };
    $("#vtwishcall").click(function(){
        //var raw = localStorage.getItem('vtwishtems');
        //var length = raw.length;
        var length = localStorage.getItem('vtwishtems').length;
        //var i;
        var productHandle = $(self).attr('data-product-handle');
        var isRemove = $(self).hasClass('wishactive');
        for ( var i=length-1; i>= 0; i--){
        var removeIndex = wishlist.indexOf(productHandle);
        wishlist.splice(removeIndex, 1);
        var vtwishcountp = localStorage.getItem('vtwishtemscount');
            if(vtwishcountp != null){
                var wish_ct = Math.max(parseInt(0), 0);
                localStorage.setItem('vtwishtemscount', wish_ct);
            }
            localStorage.setItem('vtwishtems', JSON.stringify(wishlist));
        }
        location.reload(true);
    });
}(window.Wishlist = window.Wishlist || {}, jQuery, undefined));
function reloadPage(){
    location.reload(true);
}