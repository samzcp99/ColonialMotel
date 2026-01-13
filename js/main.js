 AOS.init({
 	duration: 800,
 	easing: 'slide'
 });

(function($) {

	"use strict";

	var isMobile = {
		Android: function() {
			return navigator.userAgent.match(/Android/i);
		},
			BlackBerry: function() {
			return navigator.userAgent.match(/BlackBerry/i);
		},
			iOS: function() {
			return navigator.userAgent.match(/iPhone|iPad|iPod/i);
		},
			Opera: function() {
			return navigator.userAgent.match(/Opera Mini/i);
		},
			Windows: function() {
			return navigator.userAgent.match(/IEMobile/i);
		},
			any: function() {
			return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
		}
	};


	$(window).stellar({
    responsive: true,
    parallaxBackgrounds: true,
    parallaxElements: true,
    horizontalScrolling: false,
    hideDistantElements: false,
    scrollProperty: 'scroll'
  });


	var fullHeight = function() {

		$('.js-fullheight').css('height', $(window).height());
		$(window).resize(function(){
			$('.js-fullheight').css('height', $(window).height());
		});

	};
	fullHeight();

	// loader
	var loader = function() {
		setTimeout(function() { 
			if($('#ftco-loader').length > 0) {
				$('#ftco-loader').removeClass('show');
			}
		}, 1);
	};
	loader();

	// Scrollax
   $.Scrollax();

	var carousel = function() {
		$('.home-slider').owlCarousel({
	    loop:true,
	    autoplay: true,
	    margin:0,
	    animateOut: 'fadeOut',
	    animateIn: 'fadeIn',
	    nav:false,
	    dots: true,
	    autoplayHoverPause: false,
	    items: 1,
	    navText : ["<span class='ion-md-arrow-back'></span>","<span class='ion-chevron-right'></span>"],
	    responsive:{
	      0:{
	        items:1
	      },
	      600:{
	        items:1
	      },
	      1000:{
	        items:1
	      }
	    }
		});
		$('.carousel-testimony').owlCarousel({
			autoplay: true,
			loop: true,
			items:1,
			margin: 0,
			stagePadding: 0,
			nav: false,
			navText: ['<span class="ion-ios-arrow-back">', '<span class="ion-ios-arrow-forward">'],
			responsive:{
				0:{
					items: 1
				},
				600:{
					items: 1
				},
				1000:{
					items: 1
				}
			}
		});

		$('.single-slider').owlCarousel({
			animateOut: 'fadeOut',
	    animateIn: 'fadeIn',
			autoplay: true,
			loop: true,
			items:1,
			margin: 0,
			stagePadding: 0,
			nav: true,
			dots: true,
			navText: ['<span class="ion-ios-arrow-back">', '<span class="ion-ios-arrow-forward">'],
			responsive:{
				0:{
					items: 1
				},
				600:{
					items: 1
				},
				1000:{
					items: 1
				}
			}
		});

		$('.single-slider-resto').owlCarousel({
			animateOut: 'fadeOut',
	    animateIn: 'fadeIn',
			autoplay: true,
			loop: true,
			items:1,
			margin: 0,
			stagePadding: 0,
			nav: false,
			dots: false,
			navText: ['<span class="ion-ios-arrow-back">', '<span class="ion-ios-arrow-forward">'],
			responsive:{
				0:{
					items: 1
				},
				600:{
					items: 1
				},
				1000:{
					items: 1
				}
			}
		});

	};
	carousel();

	$('nav .dropdown').hover(function(){
		var $this = $(this);
		// 	 timer;
		// clearTimeout(timer);
		$this.addClass('show');
		$this.find('> a').attr('aria-expanded', true);
		// $this.find('.dropdown-menu').addClass('animated-fast fadeInUp show');
		$this.find('.dropdown-menu').addClass('show');
	}, function(){
		var $this = $(this);
			// timer;
		// timer = setTimeout(function(){
			$this.removeClass('show');
			$this.find('> a').attr('aria-expanded', false);
			// $this.find('.dropdown-menu').removeClass('animated-fast fadeInUp show');
			$this.find('.dropdown-menu').removeClass('show');
		// }, 100);
	});


	$('#dropdown04').on('show.bs.dropdown', function () {
	  console.log('show');
	});

	// scroll
	var scrollWindow = function() {
		$(window).scroll(function(){
			var $w = $(this),
					st = $w.scrollTop(),
					navbar = $('.ftco_navbar'),
					sd = $('.js-scroll-wrap');

			if (st > 150) {
				if ( !navbar.hasClass('scrolled') ) {
					navbar.addClass('scrolled');	
				}
			} 
			if (st < 150) {
				if ( navbar.hasClass('scrolled') ) {
					navbar.removeClass('scrolled sleep');
				}
			} 
			if ( st > 350 ) {
				if ( !navbar.hasClass('awake') ) {
					navbar.addClass('awake');	
				}
				
				if(sd.length > 0) {
					sd.addClass('sleep');
				}
			}
			if ( st < 350 ) {
				if ( navbar.hasClass('awake') ) {
					navbar.removeClass('awake');
					navbar.addClass('sleep');
				}
				if(sd.length > 0) {
					sd.removeClass('sleep');
				}
			}
		});
	};
	scrollWindow();

	var isMobile = {
		Android: function() {
			return navigator.userAgent.match(/Android/i);
		},
			BlackBerry: function() {
			return navigator.userAgent.match(/BlackBerry/i);
		},
			iOS: function() {
			return navigator.userAgent.match(/iPhone|iPad|iPod/i);
		},
			Opera: function() {
			return navigator.userAgent.match(/Opera Mini/i);
		},
			Windows: function() {
			return navigator.userAgent.match(/IEMobile/i);
		},
			any: function() {
			return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
		}
	};

	
	var counter = function() {
		
		$('#section-counter').waypoint( function( direction ) {

			if( direction === 'down' && !$(this.element).hasClass('ftco-animated') ) {

				var comma_separator_number_step = $.animateNumber.numberStepFactories.separator(',')
				$('.number').each(function(){
					var $this = $(this),
						num = $this.data('number');
						console.log(num);
					$this.animateNumber(
					  {
					    number: num,
					    numberStep: comma_separator_number_step
					  }, 7000
					);
				});
				
			}

		} , { offset: '95%' } );

	}
	counter();

	var contentWayPoint = function() {
		var i = 0;
		$('.ftco-animate').waypoint( function( direction ) {

			if( direction === 'down' && !$(this.element).hasClass('ftco-animated') ) {
				
				i++;

				$(this.element).addClass('item-animate');
				setTimeout(function(){

					$('body .ftco-animate.item-animate').each(function(k){
						var el = $(this);
						setTimeout( function () {
							var effect = el.data('animate-effect');
							if ( effect === 'fadeIn') {
								el.addClass('fadeIn ftco-animated');
							} else if ( effect === 'fadeInLeft') {
								el.addClass('fadeInLeft ftco-animated');
							} else if ( effect === 'fadeInRight') {
								el.addClass('fadeInRight ftco-animated');
							} else {
								el.addClass('fadeInUp ftco-animated');
							}
							el.removeClass('item-animate');
						},  k * 50, 'easeInOutExpo' );
					});
					
				}, 100);
				
			}

		} , { offset: '95%' } );
	};
	contentWayPoint();


	// navigation
	var OnePageNav = function() {
		$(".smoothscroll[href^='#'], #ftco-nav ul li a[href^='#']").on('click', function(e) {
		 	e.preventDefault();

		 	var hash = this.hash,
		 			navToggler = $('.navbar-toggler');
		 	$('html, body').animate({
		    scrollTop: $(hash).offset().top
		  }, 700, 'easeInOutExpo', function(){
		    window.location.hash = hash;
		  });


		  if ( navToggler.is(':visible') ) {
		  	navToggler.click();
		  }
		});
		$('body').on('activate.bs.scrollspy', function () {
		  console.log('nice');
		})
	};
	OnePageNav();


	// magnific popup
	$('.image-popup').magnificPopup({
    type: 'image',
    closeOnContentClick: true,
    closeBtnInside: false,
    fixedContentPos: true,
    mainClass: 'mfp-no-margins mfp-with-zoom', // class to remove default margin from left and right side
     gallery: {
      enabled: true,
      navigateByImgClick: true,
      preload: [0,1] // Will preload 0 - before current, and 1 after the current image
    },
    image: {
      verticalFit: true
    },
    zoom: {
      enabled: true,
      duration: 300 // don't foget to change the duration also in CSS
    }
  });

  $('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
    disableOn: 700,
    type: 'iframe',
    mainClass: 'mfp-fade',
    removalDelay: 160,
    preloader: false,

    fixedContentPos: false
  });


  $('.checkin_date, .checkout_date').datepicker({
	  'format': 'm/d/yyyy',
	  'autoclose': true
	});


})(jQuery);


// Invercargill weather bar (Open-Meteo, no API key)
(function ($) {
	"use strict";

	function initGoogleAnalytics() {
		try {
			var cfg = (window.CI_SITE && typeof window.CI_SITE === "object") ? window.CI_SITE : {};
			var id = (cfg.ga4MeasurementId || "").trim();
			if (!id) return;
			if (!/^G-[A-Z0-9]+$/i.test(id)) return;
			if (window.__ciGa4Loaded) return;
			window.__ciGa4Loaded = true;

			var script = document.createElement("script");
			script.async = true;
			script.src = "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(id);
			document.head.appendChild(script);

			window.dataLayer = window.dataLayer || [];
			function gtag() { window.dataLayer.push(arguments); }
			gtag("js", new Date());
			gtag("config", id);
		} catch (e) {
			// no-op
		}
	}

	function roundTemp(value) {
		if (value === null || value === undefined || Number.isNaN(Number(value))) return "--";
		return String(Math.round(Number(value)));
	}

	function iconSvgForWmo(code, size) {
		var wmo = Number(code);
		var svgSize = size || 40;
		var accent = "var(--ci-weather-accent)";

		// Very small, custom SVG icons (simple shapes, no external assets)
		var sun =
			'<svg viewBox="0 0 64 64" width="' + svgSize + '" height="' + svgSize + '" aria-hidden="true">' +
			'<g fill="none" style="stroke:' + accent + '" stroke-width="4" stroke-linecap="round">' +
			'<circle cx="32" cy="32" r="10" style="fill:' + accent + '" stroke="none" />' +
			'<path d="M32 6v8" /><path d="M32 50v8" /><path d="M6 32h8" /><path d="M50 32h8" />' +
			'<path d="M13 13l6 6" /><path d="M45 45l6 6" /><path d="M51 13l-6 6" /><path d="M19 45l-6 6" />' +
			"</g></svg>";

		var cloud =
			'<svg viewBox="0 0 64 64" width="' + svgSize + '" height="' + svgSize + '" aria-hidden="true">' +
			'<path d="M22 46h25a11 11 0 0 0 0-22c-.6 0-1.2.05-1.8.14A14 14 0 0 0 18 28.5A9.5 9.5 0 0 0 22 46Z" fill="currentColor" fill-opacity="0.95" />' +
			"</svg>";

		var partly =
			'<svg viewBox="0 0 64 64" width="' + svgSize + '" height="' + svgSize + '" aria-hidden="true">' +
			'<g transform="translate(0,0)">'
			+ '<g fill="none" style="stroke:' + accent + '" stroke-width="4" stroke-linecap="round">'
			+ '<circle cx="24" cy="24" r="8" style="fill:' + accent + '" stroke="none" />'
			+ '<path d="M24 6v6" /><path d="M24 36v6" /><path d="M6 24h6" /><path d="M36 24h6" />'
			+ '<path d="M11 11l4 4" /><path d="M33 33l4 4" /><path d="M37 11l-4 4" /><path d="M15 33l-4 4" />'
			+ '</g>'
			+ '<path d="M26 50h22a9.5 9.5 0 0 0 0-19c-.5 0-1 0-1.5.1A12 12 0 0 0 23 35a8 8 0 0 0 3 15Z" fill="currentColor" fill-opacity="0.95" />'
			+ '</g>'
			+ "</svg>";

		var rain =
			'<svg viewBox="0 0 64 64" width="' + svgSize + '" height="' + svgSize + '" aria-hidden="true">' +
			'<path d="M22 40h25a11 11 0 0 0 0-22c-.6 0-1.2.05-1.8.14A14 14 0 0 0 18 22.5A9.5 9.5 0 0 0 22 40Z" fill="currentColor" fill-opacity="0.95" />'
			+ '<g style="stroke:' + accent + '" stroke-width="4" stroke-linecap="round">'
			+ '<path d="M24 46l-3 8" /><path d="M36 46l-3 8" /><path d="M48 46l-3 8" />'
			+ '</g>'
			+ "</svg>";

		var thunder =
			'<svg viewBox="0 0 64 64" width="' + svgSize + '" height="' + svgSize + '" aria-hidden="true">' +
			'<path d="M22 38h25a11 11 0 0 0 0-22c-.6 0-1.2.05-1.8.14A14 14 0 0 0 18 20.5A9.5 9.5 0 0 0 22 38Z" fill="currentColor" fill-opacity="0.95" />'
			+ '<path d="M30 40l-6 12h8l-4 10 14-18h-8l4-10Z" style="fill:' + accent + '" />'
			+ "</svg>";

		if (wmo === 0) return sun;
		if (wmo === 1 || wmo === 2) return partly;
		if (wmo === 3) return cloud;
		if (wmo === 45 || wmo === 48) return cloud;
		if ((wmo >= 51 && wmo <= 67) || (wmo >= 80 && wmo <= 82)) return rain;
		if ((wmo >= 71 && wmo <= 77) || (wmo >= 85 && wmo <= 86)) return cloud;
		if (wmo >= 95 && wmo <= 99) return thunder;
		return cloud;
	}

	function getLocaleForSiteCode(code) {
		if (code === "zh") return "zh-CN";
		if (code === "mi") return "mi-NZ";
		if (code === "ja") return "ja-JP";
		if (code === "ko") return "ko-KR";
		return "en-NZ";
	}

	function formatDow(dateStr, locale) {
		try {
			var date = new Date(dateStr + "T00:00:00");
			return date.toLocaleDateString(locale || "en-NZ", { weekday: "short" });
		} catch (e) {
			return "";
		}
	}

	function initCiWeatherBar(site) {
		var $bar = $(".ci-weatherbar");
		if (!$bar.length) return;

		var locale = getLocaleForSiteCode(site && site.code ? site.code : "en");

		var lat = $bar.attr("data-lat") || "-46.4077033";
		var lon = $bar.attr("data-lon") || "168.3644008";
		var tz = $bar.attr("data-tz") || "Pacific/Auckland";

		var url =
			"https://api.open-meteo.com/v1/forecast"
			+ "?latitude=" + encodeURIComponent(lat)
			+ "&longitude=" + encodeURIComponent(lon)
			+ "&timezone=" + encodeURIComponent(tz)
			+ "&current=temperature_2m,weather_code"
			+ "&daily=weather_code,temperature_2m_max,temperature_2m_min"
			+ "&forecast_days=7"
			+ "&temperature_unit=celsius";

		$.getJSON(url)
			.done(function (data) {
				var currentTemp = data && data.current ? data.current.temperature_2m : null;
				var currentCode = data && data.current ? data.current.weather_code : null;

				$bar.find(".ci-weatherbar__tempValue").text(roundTemp(currentTemp));
				$bar.find(".ci-weatherbar__icon").html(iconSvgForWmo(currentCode, 40));

				var daily = data && data.daily ? data.daily : null;
				var times = daily && daily.time ? daily.time : [];
				var codes = daily && daily.weather_code ? daily.weather_code : [];
				var maxs = daily && daily.temperature_2m_max ? daily.temperature_2m_max : [];
				var mins = daily && daily.temperature_2m_min ? daily.temperature_2m_min : [];

				var html = "";
				for (var i = 0; i < times.length; i++) {
					var dow = formatDow(times[i], locale);
					var hi = roundTemp(maxs[i]);
					var lo = roundTemp(mins[i]);
					html +=
						'<div class="ci-weatherbar__day">'
						+ '<div class="ci-weatherbar__dow">' + dow + "</div>"
						+ '<div class="ci-weatherbar__dayIcon" aria-hidden="true">' + iconSvgForWmo(codes[i], 34) + "</div>"
						+ '<div class="ci-weatherbar__hi">' + hi + "°C</div>"
						+ '<div class="ci-weatherbar__lo">' + lo + "°C</div>"
						+ "</div>";
				}

				$bar.find(".ci-weatherbar__days").html(html);
			})
			.fail(function () {
				// If the API call fails, avoid showing a broken empty bar.
				$bar.hide();
			});
	}

	function detectSiteLanguage() {
		try {
			var path = (window.location && window.location.pathname) ? window.location.pathname : "";
			var segments = path.split("/").filter(function (s) { return !!s; });
			var supported = { zh: true, mi: true, ja: true, ko: true };
			var code = "en";
			if (segments.length >= 2 && segments[0] === "lan" && supported[segments[1]]) {
				code = segments[1];
			} else if (segments.length >= 1 && supported[segments[0]]) {
				// Back-compat if someone still has /zh/... deployed
				code = segments[0];
			}
			var prefix = code === "en" ? "" : ("lan/" + code + "/");
			var basename = segments.length ? segments[segments.length - 1] : "index.html";
			if (!basename || basename.indexOf(".html") === -1) basename = "index.html";
			return { code: code, prefix: prefix, basename: basename };
		} catch (e) {
			return { code: "en", prefix: "", basename: "index.html" };
		}
	}

	function hrefIsExternal(href) {
		if (!href) return true;
		if (href.indexOf("#") === 0) return true;
		if (href.indexOf("mailto:") === 0) return true;
		if (href.indexOf("tel:") === 0) return true;
		if (href.indexOf("javascript:") === 0) return true;
		if (href.indexOf("http:") === 0 || href.indexOf("https:") === 0) return true;
		if (href.indexOf("//") === 0) return true;
		return false;
	}

	function rewriteNavbarLinksForLanguage(site) {
		if (!site || !site.prefix) return;
		var prefix = site.prefix;

		// Brand always goes to the language homepage.
		var $brand = $(".navbar-brand");
		if ($brand.length) {
			$brand.attr("href", prefix + "index.html");
		}

		// Rewrite navbar links to keep navigation within the selected language.
		$(".navbar-nav a").each(function () {
			var $a = $(this);
			var href = ($a.attr("href") || "").trim();
			if (!href || hrefIsExternal(href)) return;

			// Only rewrite simple local .html links (e.g. rooms.html). Skip already-prefixed links.
			if (href.indexOf(".html") === -1) return;
			if (href.indexOf("/") !== -1) return;

			$a.attr("href", prefix + href);
		});
	}

	function injectLanguageSwitcher(site) {
		var $nav = $(".navbar-nav.ml-auto");
		if (!$nav.length) return;
		if ($nav.find(".nav-lang").length) return;

		var languages = [
			{ code: "en", label: "English", short: "EN", prefix: "" },
			{ code: "mi", label: "Māori", short: "MI", prefix: "lan/mi/" },
			{ code: "zh", label: "中文", short: "中文", prefix: "lan/zh/" },
			{ code: "ja", label: "日本語", short: "日本語", prefix: "lan/ja/" },
			{ code: "ko", label: "한국어", short: "한국어", prefix: "lan/ko/" }
		];

		var current = languages.filter(function (l) { return l.code === site.code; })[0] || languages[0];
		var toggleText = current.short;
		var toggleId = "langDropdown";

		var $li = $(
			'<li class="nav-item dropdown nav-lang">'
			+ '<a class="nav-link dropdown-toggle" href="#" id="' + toggleId + '" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">'
			+ toggleText
			+ '</a>'
			+ '<div class="dropdown-menu dropdown-menu-right" aria-labelledby="' + toggleId + '"></div>'
			+ '</li>'
		);

		var $menu = $li.find(".dropdown-menu");
		languages.forEach(function (lang) {
			var href = lang.prefix + site.basename;
			// If pages aren't scaffolded yet for a language, still allow navigation (will 404).
			// We'll scaffold directories to avoid broken links.
			var $item = $('<a class="dropdown-item" href="' + href + '">' + lang.label + '</a>');
			if (lang.code === site.code) {
				$item.addClass("active");
			}
			$menu.append($item);
		});

		$nav.append($li);
	}

	$(function () {
		initGoogleAnalytics();
		var site = detectSiteLanguage();
		initCiWeatherBar(site);
		rewriteNavbarLinksForLanguage(site);
		injectLanguageSwitcher(site);
	});
})(jQuery);

