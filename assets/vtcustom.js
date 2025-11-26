jQuery(document).ready(function ($) {
    "use strict";
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
        $elem.not('.slick-initialized').each(function () {
            var _this = $(this),
                _responsive = _this.data('responsive'),
                _config = [];

            if (_this.hasClass('slick-vertical')) {
                _config.prevArrow = '<span class="fa fa-angle-up prev"></span>';
                _config.nextArrow = '<span class="fa fa-angle-down next"></span>';
            } else {
                _config.prevArrow = '<span class="prev"><svg width="10" height="20" viewBox="0 0 10 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 1L1.59055 9.33564C1.25376 9.71452 1.25376 10.2855 1.59055 10.6644L9 19" stroke="currentColor" stroke-linecap="round"/></svg></span>';
                _config.nextArrow = '<span class="next"><svg width="10" height="20" viewBox="0 0 10 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1L8.40945 9.33564C8.74624 9.71452 8.74624 10.2855 8.40945 10.6644L1 19" stroke="currentColor" stroke-linecap="round"/></svg></span>';
            }
            _config.responsive = _responsive;

            _this.slick(_config);
        });
    }

    $(document).on('click', function (event) {
        var _target = $(event.target).closest('.draly-dropdown'),
            _parent = $('.draly-dropdown');

        if (_target.length > 0) {
            _parent.not(_target).removeClass('open');
            if (
                $(event.target).is('[data-draly="draly-dropdown"]') ||
                $(event.target).closest('[data-draly="draly-dropdown"]').length > 0
            ) {
                _target.toggleClass('open');
                event.preventDefault();
            }
        } else {
            $('.draly-dropdown').removeClass('open');
        }
    });

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

    setTimeout(function () {
        if ($('.owl-slick').length) {
            $('.owl-slick').each(function () {
                draly_init_carousel($(this));
            });
        }
    }, 10);
});

jQuery(window).on('load', function () {
    jQuery('body').addClass('loaded');
});

