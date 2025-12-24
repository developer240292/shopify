jQuery(document).ready(function ($) {
    "use strict";

    $(document).on("click", ".mobile-menu-toggle", function () {
        $('.header-mobile-menu').toggleClass('open');
    });

    $(document).on("click", ".main-menu-tab", function () {
        $(this).addClass('active');
        $('#main-menu-tab').addClass('active');
        $('.vertical-menu-tab, #vertical-menu-tab').removeClass('active');
    });

    $(document).on("click", ".vertical-menu-tab", function () {
        $(this).addClass('active');
        $('#vertical-menu-tab').addClass('active');
        $('.main-menu-tab, #main-menu-tab').removeClass('active');
    });

    $(document).on("click", ".mobile-menu-inner .caret", function () {
        let $this = $(this);
        let titleText = $this.siblings("a").text();
        let $menuItem = $this.closest(".menu-item");
        let $subMenu = $this.closest(".sub-menu");
        let $mobileMenuTitle = $this.closest(".mobile-menu-inner").siblings(".mobile-menu-title");
        $menuItem.toggleClass("show-sub-menu");
        $mobileMenuTitle.addClass('active');
        if ($this.hasClass("active")) {
            if ($subMenu.length) {
                titleText = $subMenu.siblings("a").text();
            } else {
                $mobileMenuTitle.removeClass('active');
            }
        }
        $mobileMenuTitle.text(titleText);
        $this.toggleClass("active");
    });

    function draly_vertical_menu($elem) {
        var _blockTitle = $elem.find('.block-title');
        _blockTitle.on('click', function () {
            $(this).toggleClass('active');
            $(this).parent().toggleClass('has-open');
        });
    }

    if ($('.block-nav-category').length) {
        draly_vertical_menu($('.block-nav-category'));
    }

    function draly_header_sticky($elem) {
        var $this = $elem;
        $this.on('draly_header_sticky', function () {
            $this.each(function () {
                var previousScroll = 0,
                    header_wrap = $(this),
                    header_position = $(this).find('.header-position'),
                    headerOrgOffset = header_position.offset().top;
                header_wrap.css('height', header_position.outerHeight());
                $(document).on('scroll', function (ev) {
                    var currentScroll = $(this).scrollTop();
                    if (currentScroll > headerOrgOffset) {
                        header_position.addClass('fixed');
                    } else {
                        header_position.removeClass('fixed');
                    }
                    previousScroll = currentScroll;
                });
            })
        }).trigger('draly_header_sticky');
        $(window).on('resize', function () {
            $this.trigger('draly_header_sticky');
        });
    }

    if ($('.header-sticky .header-desktop-wrap').length) {
        draly_header_sticky($('.header-sticky .header-desktop-wrap'));
    }

    if ($('.header-mobile-sticky .header-mobile-wrap').length) {
        draly_header_sticky($('.header-mobile-sticky .header-mobile-wrap'));
    }

    function draly_init_carousel($elem) {
        $elem.not('.swiper-initialized').each(function () {
            var _this = $(this),
                _config = _this.data('swiper');
            new Swiper(_this[0],_config);
        });
    }

    if ($('.draly-carousel').length) {
        console.log('31241');
        $('.draly-carousel').each(function () {
            draly_init_carousel($(this));
            console.log('zzz');
        });
    }
    
    // Home Page Product Tab
    $(".nav-tabs .nav-item.active").click();
    $(document).on('click', '.nav-tabs .nav-item', function (e) {
        e.preventDefault();
        $(".nav-tabs .nav-item").removeClass('active');
        $(this).addClass('active');
        let tid = $(this).find('a').attr('href');
        $('.tab-pane').removeClass('active show');
        $(tid).addClass('active show');
    });

    // Collection Grid/List View
    $(document).on('click', '.vtlistgridbtn', function (e) {
        $(this).addClass('active').siblings().removeClass('active');
        if ($(this).hasClass('listv')) {
            $('#product-grid').addClass('product-list').removeClass('product-grid').removeClass('product-galleryv');
        } else if ($(this).hasClass('gridv')) {
            $('#product-grid').addClass('product-grid').removeClass('product-list').removeClass('product-galleryv');
        } else if ($(this).hasClass('galleryv')) {
            $('#product-grid').addClass('product-galleryv').removeClass('product-list').removeClass('product-grid');
        }
    });

    // Countdown Timer
    $('[data-countdown]').each(function () {
        var $this = $(this), finalDate = $(this).data('countdown');
        Date.prototype.yyyymmdd = function () {
            var yyyy = this.getFullYear().toString();
            var mm = (this.getMonth() + 1).toString(); // getMonth() is zero-based
            var dd = this.getDate().toString();
            return yyyy + "/" + (mm[1] ? mm : "0" + mm[0]) + "/" + (dd[1] ? dd : "0" + dd[0]); // padding
        };
        var date = new Date();
        if (finalDate > date.yyyymmdd()) {
            $(this).parents('.timer_outer').css('display', 'block');
        } else {
            $(this).parents('.timer_outer').css('display', 'none');
        }
        $this.countdown(finalDate, function (event) {
            $this.html(event.strftime('<li><span>%D</span><p>Days</p></li><li><span>%H</span><p>Hours</p></li><li><span>%M</span><p>Mins</p></li><li><span>%S</span><p>Secs</p></li>'));
        });
    });

    // Scroll To top
    $("#scroll").addClass("scrollhide");
    $(window).scroll(function () {
        if ($(this).scrollTop() === 0) {
            $("#scroll").addClass("scrollhide")
        } else {
            $("#scroll").removeClass("scrollhide")
        }
    });
    $(document).on('click', '#scroll', function (e) {
        $("html, body").animate({ scrollTop: 0 }, 600);
        return false;
    });
});

jQuery(window).on('load', function () {
    jQuery('body').addClass('loaded');
});

