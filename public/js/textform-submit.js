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

$('#text-input').on('submit', function (e) {
  e.preventDefault();

  let x1 = $('#x1').val();
  let y1 = $('#y1').val();
  let x2 = $('#x2').val();
  let y2 = $('#y2').val();
  let title = $("#text-title");
  let content = $("#content");
  let nodeData = {
    x1: x1,
    y1: y1,
    x2: x2,
    y2: y2,
    title: title.val(),
    content: content.val()
  }

  console.log(nodeData);

  if (validateForm()) {
    $.post('/create-new/new-node', nodeData)
      .done(function (data) { //data is form serverside
        createTextbox([data]);
        $('#text-input')[0].reset();
      }).fail(function (data) {
        console.log("This POST AJAX function will be run if the ajax if failed");
      }).always(function (data) {
        console.log("This POST AJAX function runs no matter success or fail.");
      });
  }else{
      swal("Missing Information","","error");
  }
})

function validateForm() {
  if ($('#text-title').val() == null || $('#text-title').val() == '')
    return false;
  else if ($('#content').val() == null || $('#content').val() == '')
    return false;
  else if ($('#x1').val() == null || $('#x1').val() == '')
    return false;
  else if ($('#x2').val() == null || $('#x2').val() == '')
    return false;
  else
    return true;
}