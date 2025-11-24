'use strict';
(function($){
    $('body').on('click', '.js-wbquickview-link', e => {
        e.preventDefault();
        const $currentTarget = $(e.currentTarget);
        var product_url = $currentTarget.data('url');
        if (product_url.indexOf("?") > 0) {
            var product_url = product_url.substring(0, product_url.indexOf("?"));
        }
        $.ajax({
            url: product_url + '?view=wbquickview',
            success: function(data) {
                if (!data) { return; }
                const html = $(data).find('[data-html="content"]').html();
                $('.js-wbquickview').html(html);
                $.magnificPopup.open({
                    preloader: true,
                    tLoading: '',
                    items: {
                        src: '<div id="wbquickview" class="js-wbquickview white-popup">'+ html +'</div>',
                        type: 'inline'
                    },
                    closeBtnInside: true
                });
                if (e.keyCode == 27) { //Escape button
                    $.magnificPopup.close();
                }
               
            }
        });
    });
})(jQuery);
