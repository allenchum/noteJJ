function createTextbox(data) {

    let textboxTemp =$($("#textbox-template").html());


    //insert text to textbox
    let textboxP = textboxTemp.find("p");

    textboxP.eq(0).html(data.title);
    textboxP.eq(1).html(data.content);
    console.log(textboxTemp.width());

    //set txtbox position
    let x = parseInt(data.x2,10) + parseInt($('#canvasDraft').offset().left,10);
    let y = parseInt(data.y2,10);
    console.log(x,y);

    if(data.x2>data.x1){
        x += 20;
    }else if(data.x2<data.x1){
        x -= 100;
    }
    if(data.y2>data.y1){
        y += 50;
    }else if(data.y2<data.y1){
        y -= 50;
    }

    let textContainer = textboxTemp.find(".text-container");

    textboxTemp.css('top',`${y}px`);
    textboxTemp.css('left',`${x}px`);

    let textboxesContainer = $("#textboxesContainer");

    textboxesContainer.append(textboxTemp);

}
