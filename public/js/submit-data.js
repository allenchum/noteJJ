$(function () {
    $('form').bind('submit', function () {
      $.ajax({
        type: 'post',
        url: 'post.php',
        data: $('form').serialize(),
        success: function () {
          alert('form was submitted');
        }
      });
      return false;
    });
  });