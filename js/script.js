$(document).ready(function() {

   // ---------------------------------- //
   // Variables.                         //
   // ---------------------------------- //

   var currentlyViewing;
   var displayBreadcrumbs;
   var breadcrumbsHTML;
   var author;
   var lastUpdate;
   
   // ---------------------------------- //
   // Debug.                             //
   // ---------------------------------- //

   function debug(){
      console.log("===========vvvvvvvv=============");
      console.log(currentlyViewing);
      console.log(displayBreadcrumbs);
      console.log(breadcrumbsHTML);
      console.log(author);
      console.log(lastUpdate);
   }
      
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
      console.log("Started loading a new page");
      $("#content").hide().load("content/" + id + ".html").fadeIn('250');
      console.log("Finished loading a new page");
      updateBreadCrumbs();
      currentlyViewing = id;
   }

   // ---------------------------------- //
   // Functionality for breadcrumbs.     //
   // ---------------------------------- //

   function updateBreadCrumbs() {
      console.log("breadCrumbs function is called");
      debug();
      
      if (displayBreadcrumbs) {

         // Adjust content of breadcrumbs.
         var crumbs = "";
         breadcrumbsHTML.forEach(function(item, index) {
            console.log(index, item);
            var goto = item[0];
            var title = item[1];
            crumbs = crumbs + "<div data-goto=\"" + goto + "\"><span class=\"material-icons\">arrow_left</span>&nbsp" + title + "</div>";
         });
         document.getElementById("breadcrumbs").innerHTML = "" + crumbs;

         // Slide breadcrumbs into view.
         if ($('#breadcrumbs').not(':visible')) {
            $('#breadcrumbs').slideDown();
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
   $("#breadcrumbs").click(function() {
      var goto = event.target.data - goto;
      console.log(goto);
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
