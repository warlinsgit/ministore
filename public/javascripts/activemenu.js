

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
