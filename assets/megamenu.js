; (function (factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register module depending on jQuery using requirejs define.
        define(['jquery'], factory);
    } else {
        // No AMD.
        factory(jQuery);
    }
}(function ($) {
    $.fn.addBack = $.fn.addBack || $.fn.andSelf;

    $.fn.extend({

        actual: function (method, options) {
            // check if the jQuery method exist
            if (!this[method]) {
                throw '$.actual => The jQuery method "' + method + '" you called does not exist';
            }

            var defaults = {
                absolute: false,
                clone: false,
                includeMargin: false,
                display: 'block'
            };

            var configs = $.extend(defaults, options);

            var $target = this.eq(0);
            var fix, restore;

            if (configs.clone === true) {
                fix = function () {
                    var style = 'position: absolute !important; top: -1000 !important; ';

                    // this is useful with css3pie
                    $target = $target.clone().attr('style', style).appendTo('body');
                };

                restore = function () {
                    // remove DOM element after getting the width
                    $target.remove();
                };
            } else {
                var tmp = [];
                var style = '';
                var $hidden;

                fix = function () {
                    // get all hidden parents
                    $hidden = $target.parents().addBack().filter(':hidden');
                    style += 'visibility: hidden !important; display: ' + configs.display + ' !important; ';

                    if (configs.absolute === true) style += 'position: absolute !important; ';

                    // save the origin style props
                    // set the hidden el css to be got the actual value later
                    $hidden.each(function () {
                        // Save original style. If no style was set, attr() returns undefined
                        var $this = $(this);
                        var thisStyle = $this.attr('style');

                        tmp.push(thisStyle);
                        // Retain as much of the original style as possible, if there is one
                        $this.attr('style', thisStyle ? thisStyle + ';' + style : style);
                    });
                };

                restore = function () {
                    // restore origin style values
                    $hidden.each(function (i) {
                        var $this = $(this);
                        var _tmp = tmp[i];

                        if (_tmp === undefined) {
                            $this.removeAttr('style');
                        } else {
                            $this.attr('style', _tmp);
                        }
                    });
                };
            }

            fix();
            // get the actual value with user specific methed
            // it can be 'width', 'height', 'outerWidth', 'innerWidth'... etc
            // configs.includeMargin only works for 'outerWidth' and 'outerHeight'
            var actual = /(outer)/.test(method) ?
                $target[method](configs.includeMargin) :
                $target[method]();

            restore();
            // IMPORTANT, this plugin only return the value of the first element
            return actual;
        }
    });
}));
(function ($) {
    "use strict"; // Start of use strict
    /* ---------------------------------------------
     Resize mega menu
     --------------------------------------------- */

    function scrollbar_width() {
        var $inner = jQuery('<div style="width: 100%; height:200px;">menu</div>'),
            $outer = jQuery('<div style="width:200px;height:150px; position: absolute; top: 0; left: 0; visibility: hidden; overflow:hidden;"></div>').append($inner),
            inner = $inner[0],
            outer = $outer[0];

        jQuery('body').append(outer);

        var width1 = inner.offsetWidth;

        $outer.css('overflow', 'scroll');

        var width2 = outer.clientWidth;

        $outer.remove();

        return (width1 - width2);
    }

    function responsive_megamenu(container, element) {
        if (container !== 'undefined') {
            var left = 0,
                container_width = 0,
                container_offset = container.offset();

            if (typeof container_offset != 'undefined') {
                container_width = container.innerWidth();
                setTimeout(function () {
                    element.children('.megamenu').css({
                        'max-width': container_width + 'px'
                    });
                    var sub_menu_width = element.children('.megamenu').outerWidth(),
                        item_width = element.outerWidth();
                    element.children('.megamenu').css({
                        'left': '-' + (sub_menu_width / 2 - item_width / 2) + 'px'
                    });
                    var container_left = container_offset.left,
                        container_right = (container_left + container_width),
                        item_left = element.offset().left,
                        overflow_left = (sub_menu_width / 2 > (item_left - container_left)),
                        overflow_right = ((sub_menu_width / 2 + item_left) > container_right);

                    if (overflow_left) {
                        left = (item_left - container_left);
                        element.children('.megamenu').css({
                            'left': -left + 'px'
                        });
                    }
                    if (overflow_right && !overflow_left) {
                        left = (item_left - container_left);
                        left = left - (container_width - sub_menu_width);
                        element.children('.megamenu').css({
                            'left': -left + 'px'
                        });
                    }
                }, 100);
            }
        }
    }

    $.fn.villa_resize_megamenu = function () {

        var megamenu = $(this);

        megamenu.on('villa_resize_megamenu', function () {

            var window_size = jQuery('body').innerWidth();

            window_size += scrollbar_width();

            if ($(this).length > 0 && window_size > 991) {
                $(this).each(function () {
                    var _class_responsive = $(this).children('.megamenu').data('responsive'),
                        _container = $(this).closest('.container-megamenu');

                    if (_class_responsive !== '' && $(this).closest(_class_responsive).length) {
                        _container = $(this).closest(_class_responsive);
                    }

                    responsive_megamenu(_container, $(this));
                });
            }
        }).trigger('villa_resize_megamenu');

        $(window).on('resize', function () {
            megamenu.trigger('villa_resize_megamenu');
        });

    };

    /**==============================
     Auto width Vertical menu
     ===============================**/
    $.fn.villa_vertical_megamenu = function () {

        var vertical_menu = $(this);

        vertical_menu.on('villa_vertical_megamenu', function () {
            $(this).each(function () {
                var menu = $(this),
                    menu_offset = menu.offset().left > 0 ? menu.offset().left : 0,
                    menu_width = parseInt(menu.actual('width')),
                    menu_left = menu_offset + menu_width;

                menu.find('.megamenu').each(function () {
                    var megamenu = $(this),
                        element_caculator = megamenu.closest('.container-megamenu');

                    if (element_caculator.length > 0) {
                        var container_width = parseInt(element_caculator.innerWidth()) - 30,
                            container_offset = element_caculator.offset(),
                            container_left = container_offset.left + container_width,
                            width = (container_width - menu_width);

                        if (menu_offset > container_left || menu_left < container_offset.left)
                            width = container_width;
                        if (menu_left > container_left)
                            width = container_width - (menu_width - (menu_left - container_left)) - 30;

                        if (width > 0) {
                            $(this).css('max-width', width + 'px');
                        }
                    }

                });
            });
        }).trigger('villa_vertical_megamenu');

        $(window).on('resize', function () {
            vertical_menu.trigger('villa_vertical_megamenu');
        });

    };
    $(document).ready(function () {

        var horizontal = $('.villa-menu-wrapper.horizontal'),
            vertical = $('.villa-menu-wrapper.vertical');

        if (horizontal.length) {
            horizontal.each(function () {
                if ($(this).find('.menu-item-has-megamenu').length) {
                    $(this).find('.menu-item-has-megamenu').villa_resize_megamenu();
                }
            });
        }
        if (vertical.length) {
            vertical.villa_vertical_megamenu();
        }

    });
})(jQuery);
