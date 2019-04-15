

//Script for notification    https://css-tricks.com/pop-from-top-notification/

close = document.getElementById("close");
close.addEventListener('click', function() {
  note = document.getElementById("success");
  note.style.display = 'none';
}, false);




// fly to cart effect

var url = window.location.href;

var els = document.querySelectorAll(".nav-item a");
for (var i = 0, l = els.length; i < l; i++) {
    var el = els[i];
    if (el.href === url) {
       el.classList.add("active");
       var parent = el.closest(".main-nav"); // add this class for the top level "li" to get easy the parent
       parent.classList.add("active");
    }

}
