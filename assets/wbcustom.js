// Dropdown Hover
$(document).on("click", function(event){
    var $trigger = $(".dropdown");
    if($trigger !== event.target && !$trigger.has(event.target).length){
        $(".dropdown-menu").slideUp("fast");
    }            
});
$(document).ready(function() {

    // User and Cart Toggle
    $(document).on('click', '.hmuser,.wbcollscart', function(e) {
        $(this).toggleClass('active');
        $(this).next().slideToggle('fast');
        $(".dropdown-menu").not($(this).next()).slideUp('fast');
    });
    
    // Left side Product Tab first
    $(".nav-tabs_secons .nav-item_second.active").click();
    $(document).on('click', '.nav-tabs_secons .nav-item_second', function(e) {
        e.preventDefault();
        $(".nav-tabs_secons .nav-item_second").removeClass('active');
        $(this).addClass('active');
        let tid=  $(this).find('a').attr('href');
        $('.tab-pane_second').removeClass('active show');
        $(tid).addClass('active show');
    });

    // Left side Product Tab second
    $(".nav-tabs_next .nav-item_next.active").click();
    $(document).on('click', '.nav-tabs_next .nav-item_next', function(e) {
        e.preventDefault();
        $(".nav-tabs_next .nav-item_next").removeClass('active');
        $(this).addClass('active');
        let tid=  $(this).find('a').attr('href');
        $('.tab-pane_next').removeClass('active show');
        $(tid).addClass('active show');
    });

    // Left side Product Tab third
    $(".nav-tabs_third .nav-item_third.active").click();
    $(document).on('click', '.nav-tabs_third .nav-item_third', function(e) {
        e.preventDefault();
        $(".nav-tabs_third .nav-item_third").removeClass('active');
        $(this).addClass('active');
        let tid=  $(this).find('a').attr('href');
        $('.tab-pane_third').removeClass('active show');
        $(tid).addClass('active show');
    });
    // Category tab
    $(".catnav-tabs .catnav-item.active").click();
    $(document).on('click', '.catnav-tabs .catnav-item', function(e) {
        e.preventDefault();
        $(".catnav-tabs .catnav-item").removeClass('active');
        $(this).addClass('active');
        let tid=  $(this).find('a').attr('href');
        $('.cattab-pane').removeClass('active show');
        $(tid).addClass('active show');
    });

    // Collapse Toggle
    $(document).on('click', '.toggle.collapsed', function(e) {
        $(this).toggleClass('active');
        $(this).next().slideToggle('fast');
    });

    // Home Page Product Tab
    $(".nav-tabs .nav-item.active").click();
    $(document).on('click', '.nav-tabs .nav-item', function(e) {
        e.preventDefault();
        $(".nav-tabs .nav-item").removeClass('active');
        $(this).addClass('active');
        let tid=  $(this).find('a').attr('href');
        $('.tab-pane').removeClass('active show');
        $(tid).addClass('active show');
    });

    // Scroll to top sticky cart
    $(".wbstickyadd_cart").addClass("scrollsky");
        $(window).scroll(function () {
        if ($(this).scrollTop() === 0) {
            $(".wbstickyadd_cart").addClass("scrollsky")
        } else {
            $(".wbstickyadd_cart").removeClass("scrollsky")
        }
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
    $(document).on('click', '#scroll', function(e) {
        $("html, body").animate({scrollTop: 0}, 600);
        return false;
    });

    // Collection Grid/List View
    $(document).on('click', '.wblistgridbtn', function(e) {
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
    $('[data-countdown]').each(function() {
        var $this = $(this), finalDate = $(this).data('countdown');
        Date.prototype.yyyymmdd = function() {
            var yyyy = this.getFullYear().toString();
            var mm = (this.getMonth()+1).toString(); // getMonth() is zero-based
            var dd  = this.getDate().toString();
            return yyyy + "/" + (mm[1]?mm:"0"+mm[0]) + "/" + (dd[1]?dd:"0"+dd[0]); // padding
        };
        var date = new Date();
        if (finalDate > date.yyyymmdd()){
            $(this).parents('.timer_outer').css('display','block');
        }else{
            $(this).parents('.timer_outer').css('display','none');  
        }
        $this.countdown(finalDate, function(event) {
            $this.html(event.strftime('<li><span>%D</span><p>Days</p></li><li><span>%H</span><p>Hours</p></li><li><span>%M</span><p>Mins</p></li><li><span>%S</span><p>Secs</p></li>'));
        });
    });

    // Box Layout
    $(".wbboxdemo").click(function(){
        $(".wbboxlt").attr("id","wbboxlayout");
    });
    $(".wbwidedemo").click(function(){
        $(".wbboxlt").removeAttr("id");
    }); 
    // Color Customizer
    $("body").on("click", ".wbinnerclr a", function(e){
    e.preventDefault();
    $('.wbinnerclr').find(".active").removeClass("active");
    $(this).parent().addClass("active");
    $('[wbcolorname=""]').remove();
    if(!$(this).hasClass($('html').attr(''))) $("body").append('<link rel="stylesheet" type="text/css" wbcolorname href="' + $(this).attr('href') + '">');
    });
    // Rtl Mode
    $("body").on("click", ".wbrtlmode a", function(e){ 
    e.preventDefault();
    $('.wbrtlmode').find(".active").removeClass("active");
    $(this).parent().addClass("active");
    $('[wbrtl=""]').remove();
    if(!$(this).hasClass($('html').attr(''))) $("body").append('<link rel="stylesheet" type="text/css" wbrtl href="' + $(this).attr('href') + '">');
    });
    // Color Open/Close 
    $('.wbopen-closeclr').click(function() {
        if ($(this).hasClass('wbclrdisable')) {
            $(this).removeClass('wbclrdisable');
            $(this).addClass('wbclrenable');
            $('.wbcolor_box').animate({right: '30px'}, 450);
            $('.wbcolor_box').css({'box-shadow': '0 10px 35px 10px rgba(0,0,0,.06)', 'background': '#fff', 'border-radius': '4px 0 4px 4px'});
            $('.wbcolor_option,.wbcolor_title').animate({'opacity': '1'}, 450);
        } else {
            $(this).removeClass('wbclrenable');
            $(this).addClass('wbclrdisable');
            $('.wbcolor_box').animate({right: '-250px'}, 450);
            $('.wbcolor_box').css({'box-shadow': 'none', 'background': 'transparent'});
            $('.wbcolor_option,.wbcolor_title').animate({'opacity': '0'}, 450);
        }
    });
    

}); // Document Ready Div End



