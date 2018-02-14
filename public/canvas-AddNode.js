class AddNode extends ParentFunction {
    constructor(contextReal, contextDraft) {
        super();
        this.contextReal = contextReal;
        this.contextDraft = contextDraft;
    }

    // draw(x,y){ 
    //     contextDraft.lineTo(x+1,y+1);
    //     contextDraft.moveTo(x+1,y+1);
    //     contextDraft.stroke();
    // }

    onMouseDown(mouse, e) {
        this.contextDraft.lineJoin = contextDraft.lineCap = 'round';
        this.contextReal.lineJoin = contextDraft.lineCap = 'round';
        this.contextReal.lineWidth=1;
        this.contextReal.fillStyle = '#000';
        this.contextReal.strokeStyle = '#000';
        this.storeX = mouse.x
        this.storeY = mouse.y  //find way to store value of current coordinates
        this.contextDraft.beginPath();
        this.contextDraft.moveTo(mouse.x, mouse.y);
        this.contextReal.beginPath();
        dragging = true;
        console.log("drawing line");
    }

    onDragging(mouse, event) {
        dragging = true;

        // this.contextDraft.beginPath();
        this.contextDraft.clearRect(0, 0, canvasDraft.width, canvasDraft.height);

        this.contextDraft.beginPath();
        this.contextDraft.moveTo(this.storeX, this.storeY);
        this.contextDraft.lineTo(mouse.x, mouse.y);
        this.contextDraft.closePath();     // use new begin path to start new line - otherwise it will not store
        this.contextDraft.stroke();

    }

    onMouseUp(mouse, e) {
        // this.contextDraft.clearRect(0,0, canvasDraft.width, canvasDraft.height)
        dragging = false;

        this.contextDraft.clearRect(0, 0, canvasDraft.width, canvasDraft.height);
        this.contextReal.moveTo(this.storeX, this.storeY)
        this.contextReal.lineTo(mouse.x, mouse.y);
        this.contextReal.closePath();
        this.contextReal.stroke();
        //draw node
        this.contextReal.lineWidth=4;
        this.contextReal.beginPath();
        this.contextReal.arc(mouse.x, mouse.y, 8, 0, 2 * Math.PI);
        this.contextReal.fillStyle = ' #2ecc71';
        this.contextReal.fill();
        this.contextReal.strokeStyle = '#15B358';
        this.contextReal.stroke();

    }
}