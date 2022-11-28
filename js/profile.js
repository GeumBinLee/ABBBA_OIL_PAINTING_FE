
"use strict";
jQuery(document).ready(function ($) {
  //for Preloader

  $(window).load(function () {
    $("#loading").fadeOut(500);
  });

  /*---------------------------------------------*
     * Mobile menu
     ---------------------------------------------*/
  $("#navbar-menu")
    .find("a[href*=#]:not([href=#])")
    .click(function () {
      if (
        location.pathname.replace(/^\//, "") ==
          this.pathname.replace(/^\//, "") &&
        location.hostname == this.hostname
      ) {
        var target = $(this.hash);
        target = target.length
          ? target
          : $("[name=" + this.hash.slice(1) + "]");
        if (target.length) {
          $("html,body").animate(
            {
              scrollTop: target.offset().top - 80,
            },
            1000
          );
          if ($(".navbar-toggle").css("display") != "none") {
            $(this)
              .parents(".container")
              .find(".navbar-toggle")
              .trigger("click");
          }
          return false;
        }
      }
    });



  $(".popup-img").magnificPopup({
    type: "image",
    gallery: {
      enabled: true,
    },
  });

  $(".video-link").magnificPopup({
    type: "iframe",
  });

  // slick slider active Home Page Tow
  $(".service_slid_item").slick({
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    prevArrow: "<i class='icon icon-chevron-left nextprevleft'></i>",
    nextArrow: "<i class='icon icon-chevron-right nextprevright'></i>",
    autoplay: true,
    autoplaySpeed: 2000,
  });

  // slick slider active Home Page Tow
  $(".choose_slide").slick({
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    prevArrow: "<i class='icon icon-chevron-left nextprevleft'></i>",
    nextArrow: "<i class='icon icon-chevron-right nextprevright'></i>",
    autoplay: true,
    autoplaySpeed: 2000,
  });

  //---------------------------------------------
  // Counter
  //---------------------------------------------

  $(".statistic-counter").counterUp({
    delay: 10,
    time: 2000,
  });

  //---------------------------------------------
  // Scroll Up
  //---------------------------------------------

  $(".scrollup").click(function () {
    $("html, body").animate({ scrollTop: 0 }, 1000);
    return false;
  });

  //Team Skillbar active js

  jQuery(".teamskillbar").each(function () {
    jQuery(this)
      .find(".teamskillbar-bar")
      .animate(
        {
          width: jQuery(this).attr("data-percent"),
        },
        6000
      );
  });

  // scrool Down

  //$('.scrooldown a').bind('click', function () {
  //    $('html , body').stop().animate({
  //        scrollTop: $($(this).attr('href')).offset().top - 160
  //    }, 1500, 'easeInOutExpo');
  //    event.preventDefault();
  //});

  //End
});

$(function () {
  // Initialize Isotope
  var $notes = $(".grid").isotope({
    itemSelector: ".grid-item",
  });

  // On filter button click
  $(".filters-button-group .btn").on("click", function (e) {
    var $this = $(this);

    // Prevent default behaviour
    e.preventDefault();

    // Toggle the active class on the correct button
    $(".filters-button-group .btn").removeClass("is-checked");
    $this.addClass("is-checked");

    // Get the filter data attribute from the button
    $notes.isotope({
      filter: $this.attr("data-filter"),
    });
  });

  $(".mouse-scroll").bind("click", function () {
    $("html , body")
      .stop()
      .animate(
        {
          scrollTop: $($(this).attr("href")).offset().top - 60,
        },
        1500,
        "easeInOutExpo"
      );
    event.preventDefault();
  });
});


 
window.addEventListener('DOMContentLoaded', function()
{
  GetProfile()
});

async function GetProfile(){
 
  const response = await fetch ('http://127.0.0.1:8000/users/profile/?page=1',{
      headers : {
          "authorization" : "Bearer " + localStorage.getItem("access")
      },
      method : 'GET'
  })
.then (response=>response.json())
console.log(response);
console.log(response.next)


const prevprev = document.getElementById("prevprev")
const nextnext = document.getElementById("nextnext")
prevprev.onclick = `location.href=${response.previous}`
nextnext.onclick = `location.href=${response.next}`

response.results.forEach(element => {
  console.log(response)

  const div_box = document.querySelector("#container_box")

  const image = document.createElement("img")
  image.src = "http://127.0.0.1:8000"+element.painting
  div_box.appendChild(image)




  // all.onclick = function () {
  //   const image = document.createElement("img")
  //   image.src = "http://127.0.0.1:8000"+element.painting
  //   div_box.appendChild(image)
  // }
  
})




  // for(let i = response.results.length -1; i >= 0; i--){
    
    
  
    // const abc = document.querySelector("#abc")
    // abc.src = image_url
    // const feed = document.getElementById("grid")
    // const Div = document.createElement("div")
    // $(Div).addClass('grid-item');
    // $(Div).addClass(`${response.results[i].painter}`)
    // console.log(image_url)
   
  //   Div.innerHTML=
  //   `<img alt="" src="${image_url}" />
  //    <div class="grid_hover_area text-center">
  //     <div class="girid_hover_text m-top-50">
  //       <h4 class="text-white">${response.results[i].painter}</h4>
  //       <p class="text-white">-${create_at}-</p>
  //       <a href="images/porfolio-1.jpg" class="btn btn-primary popup-img">다운로드</a>
  //     </div>
  //   </div>
  // </div>
  // `;
  // feed.appendChild(Div)
  // }
  
// }

function handleLogout() {
  localStorage.removeItem("access");
  localStorage.removeItem("refresh");
  localStorage.removeItem("payload");
  alert("로그아웃이 완료되었습니다!");
  location.href = "signup.html";
}

function myFunction(id) {
  // Declare variables
  var filter, ul, li, a, i, txtValue;
  id = document.getElementById('myInput');
  filter = id.value.toUpperCase();
  ul = document.getElementsByClassName("grid");
  li = ul.getElementsByTagName('li');

  // Loop through all list items, and hide those who don't match the search query
  for (i = 0; i < li.length; i++) {
    a = li[i].getElementsByTagName("a")[0];
    txtValue = a.textContent || a.innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      li[i].style.display = "";
    } else {
      li[i].style.display = "none";
    }
  }
}
}