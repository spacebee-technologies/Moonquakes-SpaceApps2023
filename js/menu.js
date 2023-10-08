$(document).ready(function() {
  $('.has-submenu').click(function(e) {
    e.preventDefault();
    $(this).find('.submenu').slideToggle();
  });

  // Evitar que el submenú se cierre al hacer clic en un enlace del submenú
  $('.submenu').click(function(e) {
    e.stopPropagation(); // Evita que el evento se propague al elemento principal '.has-submenu'
  });
});