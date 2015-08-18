var grid = document.querySelector('.grid');
imagesLoaded(grid, function(e) {
  var msnry = new Masonry(grid, {
    itemSelector: '.grid-item',
    columnWidth: '.grid-item'
  });
});

var contactForm = $('#contactForm');
var apiUrl = window.location.protocol + "//" + window.location.hostname + "/saaacartfundraiser/back/sendmail.php";

contactForm.on('submit', function(e) {
  e.preventDefault();

  $('#contactForm *').fadeOut(200);
  $('#contactForm').prepend('Your submission is being processed...');

  $.ajax({
    type    : 'POST',
    cache   : false,
    url     : apiUrl,
    data    : $(this).serialize(),
    success : function(data) {
      responseSuccess(data);
      console.log(data);
    },
    error   : function(data) {
      console.log(data);
    }
  });

  return false;
});

function responseSuccess(data) {
  var response = JSON.parse(data);

  if(response.status === 'success') {
    $('#contactForm').html('Your message was sent successfully. We will get back to you as soon as we can.');
  } else {
    $('#contactForm').html('Error.');
  }
}
