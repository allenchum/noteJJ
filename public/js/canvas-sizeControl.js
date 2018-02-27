(function ($) {
    $('.spinner .height:first-of-type').on('click', function() {
      $('.spinner #height-input').val( parseInt($('.spinner #height-input').val(), 10) + 10);
      updateCanvasHeight()
    });
    $('.spinner .height:last-of-type').on('click', function() {
      $('.spinner #height-input').val( parseInt($('.spinner #height-input').val(), 10) - 10);
      updateCanvasHeight()
    });
  })(jQuery);

(function ($) {
    $('.spinner .width:first-of-type').on('click', function() {
      $('.spinner #width-input').val( parseInt($('.spinner #width-input').val(), 10) + 10);
      updateCanvasWidth()
    });
    $('.spinner .width:last-of-type').on('click', function() {
      $('.spinner #width-input').val( parseInt($('.spinner #width-input').val(), 10) - 10);
      updateCanvasWidth()
    });

  })(jQuery);

  $('.spinner #width-input').on('change', updateCanvasWidth);

  $('.spinner #height-input').on('change',updateCanvasHeight);


  function updateCanvasHeight(){
      var canvasReal = document.getElementById("canvasReal");
      var canvasDraft = document.getElementById("canvasDraft");
      canvasReal.height = $('.spinner #height-input').val();
      canvasDraft.height = $('.spinner #height-input').val();
  }

  function updateCanvasWidth(){
    var canvasReal = document.getElementById("canvasReal");
    var canvasDraft = document.getElementById("canvasDraft");
    canvasReal.width = $('.spinner #width-input').val();
    canvasDraft.width= $('.spinner #width-input').val();
  }