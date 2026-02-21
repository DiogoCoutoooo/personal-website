/* ==========================================================================

    Project: Par
    Author: Gaspar
    Last updated: @@timestamp

   ========================================================================== */

'use strict';

var Par = {

  pagination: 12,
  
  /**
   * Init function
   */
  init: function() {
    // Par.initClock();
    Par.featureSlider();
    Par.readmore();
    Par.readmoreButton();
    Par.multipleChoice();
    Par.datePicker();
    Par.checkToogle();
    Par.filterAjaxContent();
    Par.filterList();
    Par.filterTags();
    Par.fullAjax();
    Par.advancedSearchFilters();
    Par.authentication();
    Par.topScroll();
    Par.checkoutSubmit();
    Par.orderTaxCalc();
    
    $('.selectric').selectric({
      maxHeight: 200,
      disableOnMobile: true,
      arrowButtonMarkup: '<b class="button"><span class="icon icon-angle-down"></span></b>',
    });

    $('.tip, abbr').tooltip({
      placement: function(tip, element) {
          var position = $(element).position();
          
          if ( $(document).width() < 500) {
            return "top";
          } else {

            if (position.left > 515) {
                return "left";
            }
            if (position.left < 515) {
                return "right";
            }
            if (position.top < 110){
                return "bottom";
            }
            return "top";
          }
      },
    });

    $('#advanced-search').on('submit', function(e){
        
      var $input = $(this).find('#input-palavra-chave');
      var $value = $input.val();
      
      if($value.length > 0 && $value.length < 3) {
        e.preventDefault();
      }

    });

    if ( $(".back-button-wrap a").length ) {
      $(".back-button-wrap a").on("click", function(event){

        history.back(1);
        event.preventDefault();
      });
    }
  },

  initClock: function() {
    
    var months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
    var $clock = $('#clock');
    
    var update_clock = function() {
      var d = new Date();
      var h = d.getHours();
      var m = d.getMinutes();
      
      if(m < 10) {
        m = '0' + m;
      }
      
      $clock.html(d.getDate() + ' ' + months[d.getMonth()] + '. ' + d.getFullYear() + ' | ' + h + ':' + m);
    };
    
    update_clock();
    
    setInterval(update_clock, 60000);
  },

  //Sticky header
  topScroll: function(){

    var admin_bar = 0;

    if ( $("#wpadminbar").length ) {
      admin_bar = 32;
      admin_bar = $("#wpadminbar").height();
    }

    // on load
    checkScroll($(window).scrollTop());
      
    function checkScroll( $posTop) {

      var $top = $('#collapse-navigation-header'),
          $top_generic = $('.uninav-wrapper').first(),
          posTop = $posTop;

      if ( posTop >= (60 + admin_bar)) {
        $top.addClass("fixed");
      } else {
        $top.removeClass("fixed");
      }

      if ( posTop >= 148) {
        $top_generic.addClass("fixed");
        $top.addClass("fixed-top");
      } else {
        $top_generic.removeClass("fixed");
        $top.removeClass("fixed-top");
      }

    }
    
    $(window).scroll(function(){  

      checkScroll($(window).scrollTop());

    });

  },


  authentication: function() {

    if ( $("#register-form").length ) {
      
      $("#input-mesmo-dados-registo").on("change", function() {
        

        if ( $(this).is(':checked') ) {

          var $first_name = $("#first-name").val(),
              $last_name = $("#last-name").val();

          $("#user_bill_first_name").val($first_name)
          $("#user_bill_last_name").val($last_name)

        }

      });

      $("#input-mesmo-dados-faturacao").on("change", function() {
        

        if ( $(this).is(':checked') ) {

          var $first_name = $("#user_bill_first_name").val(),
              $last_name = $("#user_bill_last_name").val(),
              $user_nif = $("#user_nif").val(),
              $user_bill_address = $("#user_bill_address").val(),
              $user_cp1 = $("#user_cp1").val(),
              $user_cp2 = $("#user_cp2").val(),
              $user_city = $("#user_city").val(),
              $user_country = $("#user_country:selected").val();

          $("#user_ship_first_name").val($first_name);
          $("#user_ship_last_name").val($last_name);
          $("#user_ship_nif").val($user_nif);
          $("#user_ship_address").val($user_bill_address);
          $("#user_ship_cp1").val($user_cp1);
          $("#user_ship_cp2").val($user_cp2);
          $("#user_ship_city").val($user_city);
          $('#user_ship_country option[value='+ user_country +']').prop('selected', true);

        }

      });
    }

    if ( $("#tipo-utilizacao").length ) {
      
      var $sel1 = $('#tipo-utilizacao'),
          $sel2 = $('#duracao-contrato'),
          $sel3 = $('#zona-geo'),
          $sel4 = $('#numero-utilizacoes'),
          $all = $('#group-selects select').not('#tipo-utilizacao').find('option'),
          $mainSelect = "",
          $price = $('#price_total');



      var $conditions = $sel1.find('option').not('.default').length;

      $sel1.on("change", function() {

        var $this = $(this).find(":selected");
        
        if($('#content_id').val() != 0) {
          if ( $this.val() != '' ) {
            $price.removeClass("hide");
          } else {
            $price.addClass("hide");
          }
        }

        $all.removeClass("hide")
        .filter(".default").prop('selected', true)
        .siblings()
        .prop('disabled', false)
        .prop('selected', false);

        //TEMP 
        //for (i = 1; i <= $conditions; i++) { 
        for (var i = 7; i <= 8; i++) { 
          if ( $this.hasClass('condition' + i)) {
            $mainSelect = 'condition' + i;
            $all.filter(".not" + i).addClass("hide").prop('disabled', true);
            $all.filter(".this" + i).prop('selected', true);
          }             
        }
      });
      
      $sel1.change();
      

      $sel3.on("change", function() {

        var $this = $(this).find(":selected");
        
        if ( $this.hasClass("sub_confition2") && $mainSelect == "condition2" ) {
          $sel4.find(".not_sub_confition2").addClass("hide").prop('disabled', true);
          $sel4.find(".this_sub_confition2").prop('selected', true).siblings().prop('selected', false);
        } 
        else if ( $this.hasClass("sub_confition3") && $mainSelect == "condition2" ) {
          $sel4.find(".not_sub_confition3").addClass("hide").prop('disabled', true);
          $sel4.find(".this_sub_confition3").prop('selected', true).siblings().prop('selected', false);
        }
        else if ( $this.hasClass("sub_confition1") && $mainSelect == "condition2" ) {
          $sel4.find(".not_sub_confition3, .not_sub_confition2").removeClass("hide").prop('disabled', false);
          $sel4.find(".this_sub_confition3, .this_sub_confition2").prop('selected', false);
          $sel4.find(".default").prop('selected', true);
        }
        
      });
      
      $sel3.change();
      
      
      $sel2.on("change", function() {

        var $this = $(this).find(":selected");
        
        if ( $this.hasClass("sub_confition10") && $mainSelect == "condition1" ) {
          $sel4.find(".not_sub_confition10").addClass("hide").prop('disabled', true);
          $sel4.find(".this_sub_confition10").prop('selected', true);
        } else if ( $mainSelect == "condition1" ){
          $sel4.find(".not_sub_confition10").removeClass("hide").prop('disabled', false);
          $sel4.find("option").prop('selected', false);
          $sel4.find(".default").prop('selected', true);
        }

      });
      
      $sel2.change();

    }

    if ( $("#input-entrega").length ) {
      
      $("#input-entrega").on("change", function() {
        
        var $this = $(this).find(":selected"),
            $address = $('#address_fields');

        if ( $this.data("show") == 'show' ) {
          $address.removeClass("hide");
        } else {
          $address.addClass("hide");
        }

      });
      
      $("#input-entrega").change();
    }
    

    // Saml requests
    $('.saml-request').click(function(e) {
      e.preventDefault();
      
      if(!$('#saml-form').length) {
        
        $(document.body).append('<form id="saml-form" method="post"></form');
        var $saml_form = $('#saml-form');
        
        $.getJSON($(this).attr('href') + '&t=' + new Date().getTime() + Math.random(), function(response) {
          
          $saml_form.attr('action', response['endpoint']);
          
          for(var i in response['params']) {
            $saml_form.append('<input type="hidden" name="'+i+'" value="'+response['params'][i]+'" />');
          }
          
          $saml_form.submit();
        });
          
      }
      
      
    });

    // keep session alive
    if(window.location.pathname.match(/^\/licenciar-conteudo/)) {
      setInterval(function() {
        $.getJSON('/licenciar-conteudo?action=ping');
      }, 12000);
    }

  },

  filterTags: function(){

    $('.filterTags').each( function(){
      
      var $elem = $(this);
      
      var selected = $elem.data('selected');
      
      var ms = $elem.magicSuggest({
        placeholder: '',
        hideTrigger: true,
        allowFreeEntries: false,
        autoSelect: false,
        selectionCls: 'btn btn-xs btn-default btn-checked',
        data: ajaxurl,
        dataUrlParams: {
          type: $elem.data('type'),
          action: 'quick_search'
        },
        selectionPosition: 'bottom',
        selectionStacked: true,
        selectionRenderer: function(data){
            return data.name;
        },
        noSuggestionText: 'Sem resultados',
        highlight: false
      });
      
      if(typeof(selected) != 'undefined' && selected.length) {
        for(var i in selected) {
          ms.addToSelection(selected[i]);
        }
      }
      
    });
  },

  filterAjaxContent: function() {
    
    var loader_timeout = 0;
    
    function loadAjaxContent($filter_section, callback, push_state) {
      
      if(typeof(push_state) == 'undefined') {
        push_state = true;
      }
      
      if(loader_timeout) {
        clearTimeout(loader_timeout);
      }
      
      loader_timeout = setTimeout(function() {
        __loadAjaxContent($filter_section, callback, push_state);
      }, 50);
      
    }
    
    function fetchAjaxContent($filter_section, data, callback) {
      
      if(typeof(callback) == 'undefined') {
        callback = function() {};
      }
      
      jQuery.post(ajaxurl, data, function(response) {
        
        var $container = $($filter_section.data('container'));
        $filter_section.find('.loading').removeClass('loading');
        
        if(response.total == 0) {
          $container.html('<p class="no-content">Sem resultados</p>');
        } else if(data['page'] == 1) {
          $container.html(response.posts);
        } else {
          $container.append(response.posts);
        }

        // Filtered or not
        if ( $filter_section.find(".active.all").length === 0 ) {
          $container.addClass("filtered");
        } else {
          $container.removeClass("filtered");
        }
        
        // hide or show "view more" btn
        var $btn = $container.siblings('.grid-footer').find('.view-more');
        
        if($btn.length) {
          
          if( ($btn.data('last-page') && $btn.data('last-page') == data.page) || data.page * Par.pagination >= response.total || response.total == 0) {
            $btn.addClass('hidden');
          } else {
            $btn.removeClass('hidden');
          }
          
        }
        
        if($(document.body).hasClass('post-type-archive-show') && $('#letter-filter a.active').length) {
          $btn.addClass('hidden');
        }
        
        // letter update
        if($('#letter-filter').length && response.letters) {
          
          $('#letter-filter li').addClass('disabled');
          
          for(var i in response.letters) {
            
            if(!response.letters[i].length) {
              continue;
            }
            
            if(response.letters[i] == '#') {
              $('#letter-filter li:last').removeClass('disabled');
            } else if(response.letters[i].match(/[a-z]/)) {
              $('#letter-filter a[data-term=' + response.letters[i] + ']').parent().removeClass('disabled');
            }
          }
        }
        
        callback(response);
        
      });
      
    }
    
    function __loadAjaxContent($filter_section, callback, push_state) {
      
      if(typeof(callback) == 'undefined') {
        callback = function() {};
      }
      
      if(typeof(push_state) == 'undefined') {
        push_state = true;
      }
      
      var data = {
        action: 'load_content',
        type: $filter_section.data('type'),
        taxonomies: {},
        order: 1,
        page: $filter_section.data('page')
      };
      
      // filter
      $filter_section.find('.section-filter-tags').each(function(i, e) {
        
        var $filter  = $(e);
        var taxonomy = $filter.data('taxonomy');
        
        if($filter.find('.all.active').length == 0) {
          
          $filter.find('.active').each(function(i, e) {
            
            if(typeof(data['taxonomies'][taxonomy]) == 'undefined') {
              data['taxonomies'][taxonomy] = [];
            }
            
            data['taxonomies'][taxonomy].push($(e).data('term'));
            
          });
        }
        
      });
      
      // order
      var $order_elem = $filter_section.find('.order-type');
      
      if($order_elem.length) {
        data.order = $order_elem.val();
      }
      
      // limit
      var limit = $filter_section.data('limit');
      
      if(limit) {
        data.limit = limit;
      }
      
      // get them
      fetchAjaxContent($filter_section, data, callback);
      
      
      // push state
      var query = [];
      
      for(var i in data['taxonomies']) {
        query.push('f_'+i + '=' + data['taxonomies'][i][0]);
      }
      
      
      // at homepage, keep all defined order in url
      if(PAR_BASE_URL[0] == '/') {
        
        $('.order-type').each(function(i, e) {
          query.push($(e).parents('.ajax-filters:first').data('type') + '_order=' + $(e).val());
        });
        
      } else {
        if(typeof(data.order) != 'undefined') {
          query.push(data.type + '_order=' + data.order);
        }
      }
      
      
      if(push_state) {
        
        var query_str = query.join('&');
        
        if(query_str.length) {
          query_str = '?' + query_str;
        }
        
        ParUtils.pushState(PAR_BASE_URL + query_str);
      }
      
      if(!$(document.body).is('.home')) {
        Par.sendPageView();
      }
      
    }
    
    /* On back */
    if($('.tags-filter-ajax').length) {
      
      window.addEventListener('popstate', function(event) {
        
        var params_str = document.location.search.substring(1);
        
        if(params_str.length) {
          
          var params        = params_str.split('&');
          var $parent       = false;
          var tax_in_params = {};
          
          for(var i = 0; i < params.length; i++) {
            var values   = params[i].split('=');
            var taxonomy = values[0].substring(2);
            
            tax_in_params[taxonomy] = true;
            
            $('.tags-filter-ajax[data-tax='+taxonomy+']').find('a.active').removeClass('active');
            $('.tags-filter-ajax[data-tax='+taxonomy+']').find('a[data-term='+values[1]+']').addClass('active loading');
            
            if(!$parent) {
              $parent = $('.tags-filter-ajax[data-tax='+taxonomy+']').parents('.ajax-filters:first');
            }
          }
          
          $('.tags-filter-ajax').each(function(i, e) {
            
            if(typeof(tax_in_params[$(e).data('tax')]) == 'undefined') {
              $(e).find('.active').removeClass('active');
              $(e).find('.all').addClass('active');
            }
            
          });
          
          loadAjaxContent($parent, function() {}, false);
          
        } else {
          
          // best effort
          var $ajax_filters = $('.ajax-filters:first');
          $ajax_filters.find('a.active').removeClass('active');
          $ajax_filters.find('a.all').addClass('active loading');
          loadAjaxContent($ajax_filters, function() {}, false);
          
        }
        
      });
    }
    
    
    // on filter click
    $('.tags-filter-ajax').on('click', 'a', function(e) {
      e.preventDefault();
      
      var $elem       = $(this);
      var $parent     = $elem.parents('ul:first');
      var to_activate = !$elem.hasClass('active');

      if(to_activate) {
        $parent.find('.active').removeClass('active loading');
      }
      
      
      if(to_activate) {
        $elem.addClass('active loading');

      } else {
        $elem.removeClass('active loading');
        
        if($parent.find('.active').length == 0) {
          $parent.find('.all').addClass('active loading');
        }
        
      }
      
      
      // reset pagination
      var $filter_parent = $elem.parents('.ajax-filters:first');
      $filter_parent.data('page', 1);
      
      loadAjaxContent($filter_parent);
      
    });
    
    
    // on order change
    $('.order-type').change(function() {
      
      // reset pagination
      var $filter_parent = $(this).parents('.ajax-filters:first');
      $filter_parent.data('page', 1);
      
      loadAjaxContent($filter_parent);
    });
    
    
    // click on "see more"
    $('.view-more').click(function(e) {
      e.preventDefault();
      
      var $this = $(this);
      
      if($(this).hasClass('loading')) {
        return;
      }
      
      var $filter_parent = $('.ajax-filters:first');
      $filter_parent.data('page', $filter_parent.data('page') + 1);
      
      $this.addClass('loading');
      
      loadAjaxContent($filter_parent, function(response) {
        $this.removeClass('loading');
      });
    });
    
    $(document.body).on('click', '.alphabetical-list a', function() {
      
      if($(this).hasClass('active')) {
        $('.order-type option[value=3]').prop('selected', true);
      } else {
        $('.order-type option[value=1]').prop('selected', true);
      }

      
    });

  },

  filterList: function(){

    var $checks = $(".filter-list .filter_list_status");

    $checks.on("change", function(){

      var $this = $(this);

      if ( $this.is(":checked") ) {
        // console.log($this.parent("li").siblings().find(".filter_list_status"));

        // $this.parent("li").siblings().find(".filter_list_status").prop( "checked", false );

        $checks.not($this).prop( "checked", false );

      } 
    });
  },

  checkToogle: function() {

    $(".check-toggle").each(function(){

      var $radio = $(this),
          $name = $radio.attr("name"),
          $group = $("input[name=" + $name +"]");

          $group.on("change", function(){

            $group.each(function(){
              if ( $(this).hasClass("check-toggle")) {

                var $target = $($(this).data("target"));

                if ( $(this).is(":checked")) {
                  $target.removeClass("hide");
                } else {
                  $target.addClass("hide");
                }
              }
            });
          });
    });

  },

  datePicker: function(){

    

      var d = new Date(),
          options = { year: 'numeric', month: '2-digit', day: 'numeric' };

      $('.datepicker').each( function(){
        
        var $picker = $(this);

        var $trigger = $( "<span></span>" )
          .addClass( "icon icon-calendar2")
          .on({
            click: function( event ) {
              $picker.click();
            }
          });

        var default_date;

        if($(this).val().length == 0) {
          
          var today = new Date();
          default_date = today;
          
          if($(this).is('.birthday')) {
            default_date = new Date(today.getFullYear() - 18, today.getMonth(), today.getDay());
          }
          
        } else {
          
          var parts = $(this).val().split('-');
          
          if(parts.length == 3) {
            default_date = new Date(parts[2], parts[1]-1, parts[0]);
          }
          
        }

        
        $picker.pikaday({
          showDaysInNextAndPreviousMonths: true,
          position: "bottom right",
          minDate: new Date(1920, 0, 1),
          maxDate: new Date(d.setDate(d.getDate())),
          defaultDate: default_date,
          reposition: false,
          yearRange: 100,
          i18n: {
            previousMonth : 'Mês Anterior',
            nextMonth     : 'Próximo Mês',
            months        : ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'],
            weekdays      : ['Domingo','Segunda','Terça','Quarta','Quinta','Sexta','Sábado'],
            weekdaysShort : ['Dom','Seg','Ter','Qua','Qui','Sex','Sab']
          },
          format: 'DD-MM-YYYY',
          onSelect: function(d) {
            // $picker.val(d.toLocaleString('pt-PT', options));
            // var date = this.getMoment().format('DD MM YY');
            // $picker.val(date);
          },

        }).parent().addClass("set_picker").append($trigger);

      });    

  },

  multipleChoice: function(){

    var $groups = $(".multiple-choice");

    $groups.each(function(){



      var $this = $(this),
          $add = $this.find(".multiple-choice-trigger-add"),
          $remove = $this.find(".multiple-choice-trigger-remove"),
          $init = $this.find(".list-init"),
          $selected = $this.find(".list-selected");

      // Add checked
      $add.on("click", function(){
        if ($add.is(":hidden")) { return false; }

        var $checked = $init.find("input:checked");

        $.each($checked, function(){
          var $li = $(this).parent("li"),
              $li_index = $li.data("index"),
              $li_content = $li.html();

              $li.empty();
              
              var $here = $selected.find("li[data-index='" + $li_index + "']");
              $here.html($li_content).find("input").prop( "checked", true );
        });

      });

      $add.click();

      // Remove unchecked
      $remove.on("click", function(){
        if ($remove.is(":hidden")) { return false; }

        var $unchecked = $selected.find("input:not(:checked)");

          $.each($unchecked, function(){
            var $li = $(this).parent("li"),
                $li_index = $li.data("index"),
                $li_content = $li.html();

              $li.empty();
              
              var $here = $init.find("li[data-index='" + $li_index + "']");
              $here.html($li_content).find("input").prop( "checked", false );
          });
      });

      // Add on double click
      $init.delegate( "label", "dblclick", function() {

        if ($add.is(":hidden")) { return false; }

        $(this).prev("input").prop( "checked", true );
        var $li = $(this).parent("li"),
            $li_index = $li.data("index"),
            $li_content = $($li.html());

        $li.empty();
        
        var $here = $selected.find("li[data-index='" + $li_index + "']");
        $here.html($li_content).find("input").prop( "checked", true );

      });

      // Remove on double click
      $selected.delegate( "label", "dblclick", function() {

        if ($add.is(":hidden")) { return false; }

        $(this).prev("input").prop( "checked", false );
        var $li = $(this).parent("li"),
            $li_index = $li.data("index"),
            $li_content = $($li.html());
        
        $li.empty();

        var $here = $init.find("li[data-index='" + $li_index + "']");
        $here.html($li_content).find("input").prop( "checked", false );
        
        

      });

    });

  },

  /**
   * Features slider init
   */
  featureSlider: function() {

    var $slider = $(".features-main-slider");

    // On before slide change
    $slider.on('init', function(event, slick){
      slick.$slides.removeClass("not-load");
    });

    $slider.slick({
      infinite: false,
      accessibility: false,
      dots: false,
      mobileFirst: true,
      prevArrow: '<button type="button" data-role="none" class="slick-prev" aria-label="Previous" tabindex="0" role="button"><span class="icon icon-chevron-left"></span></button>',
      nextArrow: '<button type="button" data-role="none" class="slick-next" aria-label="Next" tabindex="0" role="button"><span class="icon icon-chevron-right"></span></button>',
    });
    
    $('.feature-slider').removeClass('invisible');
  },

  readmore: function(){
    var $readmore = $(".readmore-status");

    $readmore.parent().nextAll().hide();

    $readmore.on("click", function(){
      var $this = $(this);

      if( $this.hasClass("active") ) {
        $this.removeClass("active");
        $this.text("Ver mais");
        $this.parent().nextAll().hide();
      } else {
        $this.addClass("active");
        $this.text("Ver menos");
        $this.parent().nextAll().removeAttr("style");
      }

    }).css("cursor","pointer");
  },

  readmoreButton: function(){
    var $readmore = $(".readmore-button");

    $readmore.on("click", function(event){
      var $this = $(this),
          $target = $($this.attr("href")),
          $top = $("#top-content").offset().top;

      if( $this.hasClass("active") ) {


        $('html, body').animate({
          scrollTop: $top - 100
        }, 1000, function(){

          $this.removeClass("active");
          $target.removeClass("active");
          $this.text("Ver mais");
          
        });



      } else {
        $this.addClass("active");
        $target.addClass("active");
        $this.text("Ver menos");
      }

      event.preventDefault();
    });
  },
  
  fullAjax: function() {
    
    window.addEventListener('popstate', function(event) {
      
      var $anchor = $('a[href="'+document.location.pathname + document.location.search+'#filters"]');
      
      if($anchor.length) {
        $anchor.click();
        
      } else {
        
        $anchor = $('a[href="'+document.location.pathname.substring(0, document.location.pathname.length-1) +'#filters"]');
        
        if($anchor.length) {
          $anchor.click();
        }
        
      }
      
    });
    
    $('.full-ajax').each(function(i, e) {
      
      var $elem = $(e);
      
      $elem.on('click', '.ajax-href, .pagination a', function(e) {
        e.preventDefault();
      
        var $this = $(this);
        var href  = $this.attr('href');

        $this.not(".page-text").addClass('loading');

        if(e.which) {
          ParUtils.pushState(href);
        }
        
        $.ajax(href, {
          method: 'GET'
        })
        .done(function(response) {
          
          $this.removeClass('loading');
          
          var $content = $(response).find('#' + $elem.attr('id'));
          
          setTimeout(function() {
            
            $elem.html($content.html());
            
            $('html, body').animate({
              scrollTop: $elem.offset().top - 150
            }, 1000);
            
            Par.sendPageView();
            
          }, 100);
          

        })
        .fail(function() {
          window.location = href;
        });
        
      });
      
    });
    
  },
  
  advancedSearchFilters: function() {
    
    var $container = $('.advanced-search-results');
    
    if(!$container.length) {
      return;
    }
    
    $.ajaxSetup({
        beforeSend: function(jqXHR, settings) {
            jqXHR.url = settings.url;
        }
    });
    
    var timer = 0;
    
    function getResults(data) {
      
      $.ajax('/', {
        method: 'GET',
        data: data
      })
      .done(function(response, status, jqXHR) {
        
        var $response = $(response);
        var $content  = $response.find('.entry-content');
        
        if(!$content.find('.article').length) {
          $('.entry-content').html('<p class="no-results">Sem resultados</p>');
          $('.entry-header .append-title').html('0 resultados');
        } else {
          
          // content
          $('.entry-content').html($content.html());
          
          // title
          $('.entry-header .append-title').html($response.find('.entry-header .append-title'));
          
        }
        
        ParUtils.pushState(jqXHR.url);
        Par.sendPageView();
        
      })
      .fail(function(jqXHR) {
        window.location = jqXHR.url;
      });
      
    }
    
    function updateResults() {
      
      var data = {
        s: SEARCH_QUERY.join(''),
        advanced: 1,
        sort: $('#sort-search').val()
      };
      
      if(typeof(SEARCH_START_YEAR) != 'undefined') {
        data.start_year = SEARCH_START_YEAR[0];
      }
      
      if(typeof(SEARCH_END_YEAR) != 'undefined') {
        data.end_year = SEARCH_END_YEAR[0];
      }
      
      if(typeof(SEARCH_SHOWS) != 'undefined') {
        data.shows = SEARCH_SHOWS;
      }
      
      $('.filter-wrap input[type=checkbox]:checked').each(function(i, e) {
        
        var field_name = $(this).attr('name').replace('[]', '');
        
        if(typeof(data[field_name]) == 'undefined') {
          data[field_name] = [];
        }
        
        data[field_name].push($(this).data('id'));
        
      });
      
      if(timer) {
        clearTimeout(timer);
      }
      
      getResults(data);
    }
    
    
    $('.filter-wrap input[type=checkbox]').change(updateResults);

    if ( $(".reset-filters").length > 0 ) {
      var $filters = $(".reset-filters");

      $filters.each(function(){
        var $this = $(this);

        $this.on("click", function(event){

          var $target = $($this.data("filter"));

          $target.find("input:checkbox").prop('checked', false); 
          updateResults();

          event.preventDefault();
        });

      });
    }
    
    $('#sort-search').on('change', updateResults);
    
  },
  
  onSolveCaptcha: function() {
    if($('#user_login').val().length && $('#user_pass').val().length) {
      $('#user_login').parents('form:first').submit();
    }
  },
  
  sendPageView: function() {
    try {
      
      // gemius
      pp_gemius_hit(pp_gemius_identifier.replace('USED_', ''), pp_gemius_extraparameters[0]);
      
      // ga
      ga('send', 'pageview', window.location.pathname + window.location.search);
      
    } catch(e) {
      console.log(e);
    }
  },
  
  checkoutSubmit: function() {
    
    var $btn = $('.checkout-submit');
    
    $btn.parents('form:first').on('submit', function(e) {
      
      if($btn.hasClass('loading')) {
        e.preventDefault();
      }
      
      $btn.addClass('loading');
      
    });
    
  },
  
  orderTaxCalc: function() {
    
    if(!$('form.calc-tax').length) {
      return;
    }
    
    var timeout = 0;
    
    function calcTax() {
      
      if(timeout) {
        clearTimeout(timeout);
      }
      
      setTimeout(function() {
        
        $.getJSON('/licenciar-conteudo/?action=calc&country='+ $('#billing_country').val() +'&cp4=' + $('#billing_cp4').val(), function(response) {
          
          if(response.tax_percentage == 0) {
            $('.tax-row').addClass('hidden');
          } else {
            $('.tax-row').removeClass('hidden');
          }
          
          $('.tax-percentage').html(response.tax_percentage);
          $('.tax-value').html(response.tax);
          $('.order-total').html(response.total);
          
        });
        
      }, 100);
      
    }
    
    $('#billing_cp4').on('keydown change blur', function() {
      calcTax();
    });
    
    $('#billing_country').on('change', function() {
      calcTax();
    });
    
    calcTax();
    
  }

};

Par.initClock();


function parOnCaptchaSolve() { Par.onSolveCaptcha(); }


var ParUtils = {
  pushState: function(href, title) {
      
      if(typeof(title) == 'undefined') {
        title = document.title;
      }
      
      document.title = title;
      
      if(!!history.pushState) {
          history.pushState('', title, href);
      } else {
          window.location.hash = '!'+href;
      }
  }
};

document.addEventListener('DOMContentLoaded', function() {
  Par.init();
});
