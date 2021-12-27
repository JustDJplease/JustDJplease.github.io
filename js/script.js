$(document).ready(function() {

   // ---------------------------------- //
   // Variables.                         //
   // ---------------------------------- //

   var currentlyViewing;
      
   // ---------------------------------- //
   // Setting up AJAX.                   //
   // ---------------------------------- //

   $.ajaxSetup({
      cache: false
   });

   // ---------------------------------- //
   // Functionality for navigation menu. //
   // ---------------------------------- //

   // --> Pop menu in and out of view.
   function toggleMenu() {
      $("#navigation-menu").slideToggle({
         duration: 250,
         start: function() {
            $(this).css('display', 'flex');
         }
      });
   }

   // --> Clear the content section.
   function clearContent() {
      document.getElementById("content").innerHTML = "";
   }

   // --> Load new data into the content section.
   function loadContent(id) {
      $("#content").hide().load("content/" + id + ".html").fadeIn('250');
      currentlyViewing = id;
      setTimeout(function(){updateBreadCrumbs();}, 250);
   }

   // ---------------------------------- //
   // Functionality for breadcrumbs.     //
   // ---------------------------------- //

   function updateBreadCrumbs() {
      
      var author = $("#settings").data("author");
      var lastUpdate = $("#settings").data("lastUpdate");
      var breadcrumbs = $("#settings").data("breadcrumbs");
      var breadcrumbsListLinks = $("#settings").data("breadcrumbs-list-links");
      var breadcrumbsListTitles = $("#settings").data("breadcrumbs-list-titles");
      
      console.log(author);
      console.log(lastUpdate);
      console.log(breadcrumbs);
      console.log(breadcrumbsListLinks);
      console.log(breadcrumbsListTitles);
      
      if (breadcrumbs) {

         // Adjust content of breadcrumbs.
         var crumbs = "";
         breadcrumbsListLinks.forEach(function(item, index) {
            console.log(index, item);
            var goto = item;
            var title = breadcrumbsListTitles[index];
            crumbs = crumbs + "<span class=\"material-icons\">arrow_left</span><span class=\"crumb\" data-goto=\"" + goto + "\">&nbsp" + title + "</span>";
         });
         document.getElementById("breadcrumbs").innerHTML = "" + crumbs;

         // Slide breadcrumbs into view.
         if ($('#breadcrumbs').not(':visible')) {
            $("#breadcrumbs").slideDown({
               duration: 250,
               start: function() {
                  $('#breadcrumbs').css('display', 'flex');
               }
               });
         }

      } else {
         // Hide breadcrumbs.
         if ($('#breadcrumbs').is(':visible')) {
            $('#breadcrumbs').slideUp();
         }
      }
   }

   // ---------------------------------- //
   // OnClick eventhandlers.             //
   // ---------------------------------- //

   // --> Menu-icon-click.
   $("#menu").click(function() {
      toggleMenu();
   });

   // --> Logo-click.
   $("#logo").click(function() {
      if (currentlyViewing !== "main") {
         clearContent();
         loadContent("main");
      }
   });

   // --> Menu-entry-click.
   $("#navigation-menu").click(function() {
      toggleMenu();
      if (currentlyViewing !== event.target.id) {
         clearContent();
         loadContent(event.target.id);
      }
   });

   // --> Breadcrumbs-click.
   $(".crumb").click(function() {
      var goto = $(this).data("goto"); 
      console.log(goto);
      clearContent();
      loadContent(goto);
   });

   // ---------------------------------- //
   // Functionality for to-top-button.   //
   // ---------------------------------- //

   $("#footer").click(function() {
      $("html, body").animate({
         scrollTop: "0"
      }, 1000);
   });

   $(window).scroll(function() {
      if ($(this).scrollTop() === 0) {
         $('#footer').fadeOut();
      } else {
         if ($('#footer').not(':visible')) {
            $('#footer').fadeIn();
            if ($('#footer').is(':visible')) {
               $('#footer').css('display', 'flex');
            }
         }
      }
   });

   // ---------------------------------- //
   // Done scripting! Now show homepage. //
   // ---------------------------------- //
   loadContent("main");
});
