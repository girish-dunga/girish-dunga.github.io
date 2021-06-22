
var page = window.location.hash || '#home';
var pageName = page.split('#')[1];

$(window).on('load resize', function () {
    if ($(window).width() > 768) {
        $(".customScrollbar").mCustomScrollbar({
            autoHideScrollbar: true,
            theme: 'dark',
            advanced: {
                updateOnContentResize: true
            }
        });
    }
})

$(window).on('load', function () {
    // On window load hide loader
    $('.home-loader').fadeOut().promise().done(function () {
        $('.jsNavigation').removeClass('active');
        $('[data-page="' + pageName + '"]').addClass('active');
        $(page).addClass('active-page').fadeIn();
        $('#wrapper').attr('data-active', page);
        if (pageName.indexOf('portfolio') > -1) loadActiveTab();
    });

    // Left panel navigation menu clicks
    $(document).on('click', '.jsNavigation', function (e) {
        e.preventDefault();
        var pageId = '#' + $(this).attr('data-page');
        $('#wrapper').attr('data-active', pageId);
        window.location.hash = pageId;

        $('.jsNavigation').removeClass('active');
        $(this).addClass('active');

        $('.active-page').hide().promise().done(function () {
            $(pageId).addClass('active-page').fadeIn();
            if (pageName.indexOf('portfolio') > -1) loadActiveTab();
        });
    });
});

$(function () {
    console.log(" :::: AVAILABLE THEMES :::: ");
    console.log("%c%s%c%s",
        "background:#a6ff00;color:#000;padding:4px 10px;font-weight:bold;border-radius:4px;margin-right:10px;border:1px solid #a6ff00",
        "GREEN",
        "background:transparent;color:#a6ff00;padding:4px 10px;border-radius:4px;color:#a6ff00;font-weight:bold;border:1px solid #a6ff00",
        "?theme=green");
    console.log("%c%s%c%s",
        "background:#00d5d5;color:#000;padding:4px 10px;font-weight:bold;border-radius:4px;margin-right:10px;border:1px solid #00d5d5",
        "AQUA",
        "background:transparent;color:#00d5d5;padding:4px 10px;border-radius:4px;color:#00d5d5;font-weight:bold;border:1px solid #00d5d5",
        "?theme=aqua");
    console.log("%c%s%c%s",
        "background:#ffb900;color:#000;padding:4px 10px;font-weight:bold;border-radius:4px;margin-right:10px;border:1px solid #ffb900",
        "YELLOW",
        "background:transparent;color:#ffb900;padding:4px 10px;border-radius:4px;color:#ffb900;font-weight:bold;border:1px solid #ffb900",
        "?theme=yellow");
    console.log("%c%s%c%s",
        "background:#00A4EF;color:#000;padding:4px 10px;font-weight:bold;border-radius:4px;margin-right:10px;border:1px solid #00A4EF",
        "BLUE",
        "background:transparent;color:#00A4EF;padding:4px 10px;border-radius:4px;color:#00A4EF;font-weight:bold;border:1px solid #00A4EF",
        "?theme=blue");
    var queryParam = window.location.search,
        qpArr = queryParam.split('&'),
        theme = '';
    if (qpArr.length) {
        qpArr.forEach(el => {
            if (el.indexOf('theme=') > -1) {
                theme = el.split('theme=')[1].toLowerCase();
            }
        });
    }
    $('body').attr('data-theme', theme)
    // To load page with #pageName
    $(window).on('hashchange', function (e) {
        if (e.originalEvent.newURL !== e.originalEvent.oldURL) {
            var pageName = e.originalEvent.newURL.split('#')[1];
            var pageId = '#' + pageName;
            $('#wrapper').attr('data-active', pageId);
            window.location.hash = pageId;
            $('.jsNavigation').removeClass('active');
            $('[data-page="' + pageName + '"]').addClass('active');
            $('.active-page').hide().promise().done(function () {
                $(pageId).addClass('active-page').fadeIn();

                if (pageName.indexOf('portfolio') > -1) loadActiveTab();
            });
        }
    });

    // For tab selection
    $(document).on('click', '.panel-tab-link', function (e) {
        e.preventDefault();
        $('.modal').hide();
        $('.panel-tab-link').removeClass('active');
        $(this).addClass('active');
        $('.panel-active-tab-dd').removeClass('active').text($(this).text());
        loadActiveTab();
    });

    $(document).on('click', '.back-top', function () {
        $('html, body').animate({ scrollTop: 0 }, 500);
    });

    // For mobile tab dropdown options toggling
    $(document).on('click', '.panel-active-tab-dd', function () {
        $(this).toggleClass('active');
    });

    // To open modal from portfolio cards
    $(document).on('click', '.grid-card-link', function (e) {
        e.preventDefault();
        var modalHTML = $(this).parent().find('.modal-card-container').html();
        $('#allWorksModal').closest('.modal').fadeIn();
        $('.grid-card-link').removeClass('active');
        $(this).addClass('active');
        $('.modal-content-container').fadeOut();
        $('#tabPanel').addClass('modal-open');
        $('#allWorksModal').html(modalHTML).promise().done(function () {
            $('.modal').attr('data-index', $('.grid-card').index($('.active').closest('.grid-card')));
            $('.panel-tabs-content').css({
                'overflow': 'hidden',
                'height': 'auto',
                'margin': '0 -30px'
            });
            $('#allWorksModal').closest('.modal-content-container').fadeIn().promise().done(function () {
                $(".customScrollbar").mCustomScrollbar("disable", true);
                $('#allWorksModal .modal-card-image-slider').slick({
                    adaptiveHeight: true,
                    mobileFirst: true,
                    pauseOnHover: true
                });
                $('.modal-other-works-slider').slick({
                    infinite: true,
                    slidesToShow: 4,
                    slidesToScroll: 1,
                    responsive: [{
                        breakpoint: 1280,
                        settings: {
                            slidesToShow: 3
                        }
                    },
                    {
                        breakpoint: 1024,
                        settings: {
                            slidesToShow: 2
                        }
                    },
                    {
                        breakpoint: 768,
                        settings: {
                            slidesToShow: 1
                        }
                    }
                        // You can unslick at a given breakpoint now by adding:
                        // settings: "unslick"
                        // instead of a settings object
                    ]
                });
            });
        });
    });

    // To close modal
    $(document).on('click', '.modal-card-close', function (e) {
        e.preventDefault();
        $('.panel-tabs-content').attr('style', '');
        $('#allWorksModal').closest('.modal').hide();
        $('#tabPanel').removeClass('modal-open');
        $(".customScrollbar").mCustomScrollbar("update");
        $('.grid-card-link').removeClass('active');
        $('.modal').attr('data-index', '-1');
        $('#allWorksModal').html('');
    });

    // Open other works
    $(document).on('click', '.other-works-link', function (e) {
        e.preventDefault();
        var refWork = $(this).attr('data-link'),
            refTab = $(this).attr('data-tab'),
            modalHTML = $('.grid-card-link[data-work="' + refWork + '"]').parent().find('.modal-card-container').html();

        $('.grid-card-link').removeClass('active');
        $('.grid-card-link[data-work="' + refWork + '"]').addClass('active');
        // $('.panel-tab-link').removeClass('active');
        // $('.panel-tab-link[data-html="' + refTab + '"]').addClass('active');
        $('#allWorksModal').html(modalHTML).promise().done(function () {
            $('.modal').attr('data-index', $('.grid-card').index($('.active').closest('.grid-card')));
            $('#allWorksModal').closest('.modal-content-container').fadeIn().promise().done(function () {
                // $(".customScrollbar").mCustomScrollbar("disable", true);
                $('#allWorksModal .modal-card-image-slider').slick({
                    adaptiveHeight: true,
                    mobileFirst: true,
                    pauseOnHover: true
                });
                $(".modal-content-container").mCustomScrollbar("scrollTo", 0);
            });
        });
    });

    // To show next work
    $(document).on('click', '.modal-next', function (e) {
        e.preventDefault();
        $('.modal-content-container').hide();
        var activeIndex = Number($('.modal').attr('data-index')),
            nextIdx = (($('.grid-card').length - 1) > activeIndex) ? (++activeIndex) : 0, modalHTML;

        modalHTML = $('.grid-card').eq(nextIdx).find('.modal-card-container').html();

        $('#allWorksModal').html(modalHTML).promise().done(function () {
            $('.modal').attr('data-index', nextIdx);
            $('.modal-content-container').fadeIn();
        });
    });
    // To show previous work
    $(document).on('click', '.modal-prev', function (e) {
        e.preventDefault();
        $('.modal-content-container').hide();
        var activeIndex = Number($('.modal').attr('data-index')),
            prevIdx = (activeIndex) ? (--activeIndex) : ($('.grid-card').length - 1), modalHTML;

        modalHTML = $('.grid-card').eq(prevIdx).find('.modal-card-container').html();
        $('#allWorksModal').html(modalHTML).promise().done(function () {
            $('.modal').attr('data-index', prevIdx);
            $('.modal-content-container').fadeIn();
        });
    });
});

function loadActiveTab() {
    var tabName = $('.panel-tab-link.active').attr('data-html'),
        wip = $('.panel-tab-link.active').attr('data-wip'),
        tabContentUrl = tabName + '.html';
    if (wip == 'true') {
        $('.grid-card').fadeOut().promise().done(function () {
            $('.work-in-progress').fadeIn();
        });
    } else {
        $('.work-in-progress').hide();
        $('.grid-card').show();
        if (tabName == 'all-works') {
            $('#tabPanel').load(tabContentUrl, function () {
                $('#tabLoader').hide();
                $('#tabPanel').fadeIn(500);
            });
        } else {
            $('.grid-card').hide().promise().done(function () {
                $('.grid-card').each(function (idx, elem) {
                    if ($(elem).attr('data-tabs').indexOf(tabName) > -1) {
                        $(elem).fadeIn(600);
                    }
                })
            });
        }
    }
}
