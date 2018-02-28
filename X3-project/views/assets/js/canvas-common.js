let canvasDraft = document.getElementById('canvasDraft');
let contextDraft = canvasDraft.getContext('2d');
let canvasReal = document.getElementById('canvasReal');
let contextReal = canvasReal.getContext('2d');
let currentFunction;
let dragging = false;
let imageSize = {height:$('#height-input').val() ,width: $('#width-input').val() }
let nodeArray = [];

//ParentFunction
class ParentFunction{
    constructor(){}
    onMouseDown(){}
    onDragging(){}
    onMouseMove(){}
    onMouseUp(){}
    onMouseLeave(){}
    onMouseEnter(){}
};

currentFunction = new ParentFunction();


//call function to 'currentFunction' when user click the button

$('#add-node').click(function(){
    currentFunction = new AddNode(contextReal, contextDraft);
});
$('#upload-image').click(function(){
    console.log('button is clicked');
    $('#file').trigger('click');

});
$('#file').click(function(){
    console.log('file input is clicked');
})


//Apply currentFunction to Canvas

function logCoor(e,mouse){
    console.log(`e.page:${e.pageX},${e.pageY}   offset:${this.offsetLeft},${this.offsetTop}   mouse:${mouse.x},${mouse.y}`)
}

$('#canvasDraft').mousedown(function(e){
    contextDraft.clearRect(0, 0, contextDraft.canvas.width, contextDraft.canvas.height);
    let mouse = {
        x: Math.round(e.pageX - $( this ).offset().left),      //Allen: object "mouse" store x-coordinate & y-coordinate of mouse event
        y: Math.round(e.pageY -  $( this ).offset().top)          //instead of [mouseX,mouseY]
    };
                             //I try keep using 'object' to store data, make it more consist.
    currentFunction.onMouseDown(mouse,e);
    logCoor(e,mouse);
    dragging = true;
});
$('#canvasDraft').mousemove(function(e){
    let mouse = {
      x: Math.round(e.pageX - $( this ).offset().left),      //Allen: object "mouse" store x-coordinate & y-coordinate of mouse event
      y: Math.round(e.pageY -  $( this ).offset().top)          //instead of [mouseX,mouseY]
    };
    if (dragging){
     currentFunction.onDragging(mouse,e);
     logCoor(e,mouse);
    }else{currentFunction.onMouseMove(mouse,e);}
});

$('#canvasDraft').mouseup(function(e){
    dragging = false;
    let mouse = {
      x: Math.round(e.pageX - $( this ).offset().left),      //Allen: object "mouse" store x-coordinate & y-coordinate of mouse event
      y: Math.round(e.pageY -  $( this ).offset().top)          //instead of [mouseX,mouseY]
    };
    currentFunction.onMouseUp(mouse,e);
    contextReal.drawImage(canvasDraft,0,0);
    contextDraft.clearRect(0, 0, contextDraft.canvas.width, contextDraft.canvas.height);
});

$('#canvasDraft').mouseleave(function(e){
    dragging = false;
    let mouse =  {
      x: Math.round(e.pageX - $( this ).offset().left),      //Allen: object "mouse" store x-coordinate & y-coordinate of mouse event
      y: Math.round(e.pageY -  $( this ).offset().top)          //instead of [mouseX,mouseY]
    };
    currentFunction.onMouseLeave(mouse,e);
    contextReal.drawImage(canvasDraft,0,0);
    contextDraft.clearRect(0, 0, contextDraft.canvas.width, contextDraft.canvas.height);
});
$('#canvasDraft').mouseenter(function(e){
    let mouse = {
      x: Math.round(e.pageX - $( this ).offset().left),      //Allen: object "mouse" store x-coordinate & y-coordinate of mouse event
      y: Math.round(e.pageY -  $( this ).offset().top)          //instead of [mouseX,mouseY]
    }; 
    currentFunction.onMouseEnter(mouse,e);
});
