function createTextbox(data) {

    let textboxTemp = $("#textbox-template").clone();

    let textboxContainer = textboxTemp.contents().find("p");

    textboxContainer.eq(0).html(data.title);
    textboxContainer.eq(1).html(data.content);

    let textboxesContainer = $("#textboxesContainer");

    textboxesContainer.append(textboxTemp.html());  
    
}

function textboxPosition(e){
    let x = e.x2;
    let y = e.y2;

    e.css('top',`${y}px`);
    e.css('left',`${x}px`);


}