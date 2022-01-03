$(document).ready(function() {

    // ---------------------------------- //
    // Local variable, current page.      //
    // ---------------------------------- //
    var currentlyViewing;

    // ---------------------------------- //
    // Stop caching pages.                //
    // ---------------------------------- //
    $.ajaxSetup({
        cache: false
    });

    // ---------------------------------- //
    // GENERIC functions.                  //
    // ---------------------------------- //

    // --> Change CSS to display as a flex object.
    function showAsFlexBox(object) {
        $(object).css('display', 'flex');
    }

    // --> Set HTML content.
    function setContent(id, content) {
        document.getElementById(id).innerHTML = content;
    }

    // ---------------------------------- //
    // CONTENT.                           //
    // ---------------------------------- //

    // --> Load new data into the content section.
    function loadContent(id) {
        setContent('content', "");
        $("#content").load("content/" + id + ".html", function() {
            updateBreadCrumbs();
            replacePlaceholders();
        });
        currentlyViewing = id;
    }

    // ---------------------------------- //
    // NAVIGATION menu.                   //
    // ---------------------------------- //

    // --> Pop menu in and out of view.
    function toggleMenu() {
        $("#nav").slideToggle({
            duration: 250,
            start: function() {
                showAsFlexBox(this)
            }
        });
    }

    // ---------------------------------- //
    // BREADCRUMBS                        //
    // ---------------------------------- //

    function updateBreadCrumbs() {
        var breadcrumbs = $("#settings").data("breadcrumbs");
        var breadcrumbsListLinks = $("#settings").data("breadcrumbs-list-links");
        var breadcrumbsListTitles = $("#settings").data("breadcrumbs-list-titles");

        if (breadcrumbs) {
            var crumbs = "";
            breadcrumbsListLinks.forEach(function(item, index) {
                var goto = item;
                var title = breadcrumbsListTitles[index];
                crumbs = crumbs + "<span class=\"material-icons\">arrow_left</span><span class=\"breadcrumbs-item\" data-goto=\"" + goto + "\">&nbsp" + title + "</span>";
            });
            setContent("breadcrumbs", "" + crumbs);

            if ($('#breadcrumbs').not(':visible')) {
                $("#breadcrumbs").show({
                    duration: 50,
                    start: function() {
                        showAsFlexBox(this);
                    }
                });
                makeCrumbsClickable();
            }

        } else {
            if ($('#breadcrumbs').is(':visible')) {
                $('#breadcrumbs').hide();
            }
        }
    }

    // ---------------------------------- //
    // CLICK events.                      //
    // ---------------------------------- //

    // --> Menu-icon-click.
    $("#header-dropdown").click(function() {
        toggleMenu();
    });

    // --> Logo-click.
    $("#header-logo").click(function() {
        if (currentlyViewing !== "main") {
            loadContent("main");
        }
    });

    // --> Menu-entry-click.
    $("#nav").click(function() {
        if(event.target.id === "nav" || event.target.id === "" || event.target.id === "fysiologie" || event.target.id === "medicatie"){
            // do nothing, prevents buggy behaviour;
        }else{
            var data = $('#' + event.target.id).data("expand-id");
            if(data === undefined){
               toggleMenu();
              if (currentlyViewing !== event.target.id) {
                   loadContent(event.target.id);
               }
             }else{
              if ($('#' + data).not(':visible')) {
                  $('#chevron-' + data).html("expand_less");
               }
               if ($('#' + data).is(':visible')) {
                    $('#chevron-' + data).html("expand_more");
               }

              $('#' + data).slideToggle({
                  duration: 250,
                  start: function() {
                      showAsFlexBox(this)
                  }
              });
             }
         }
    });

    // --> Breadcrumbs-click.
    function makeCrumbsClickable() {
        $(".breadcrumbs-item").click(function() {
            var goto = $(this).data("goto");
            loadContent(goto);
        });
    }

    // ---------------------------------- //
    // BACK-TO-TOP button.                //
    // ---------------------------------- //

    $("#footer").click(function() {
        $("html, body").animate({
            scrollTop: "0"
        }, 500);
    });

    $(window).scroll(function() {
        if ($(this).scrollTop() === 0) {
            $('#footer').fadeOut();
        } else {
            if ($('#footer').not(':visible')) {
                $('#footer').fadeIn();
                if ($('#footer').is(':visible')) {
                    showAsFlexBox('#footer');
                }
            }
        }
    });

    // ---------------------------------- //
    // Done scripting! Now show homepage. //
    // ---------------------------------- //

    loadContent("main");
});