const tileSize = 12;

let playButton;
let resetButton;
let clearButton;
let canvas;

let paintMode;
let label;

let grid;

function setup() {
    canvas = createCanvas(1201, 601);
    background(175);
    noLoop();

    canvas.mousePressed(paintTile);

    paintMode = true;
    label = document.getElementById("click-type");

    grid = new Automata(tileSize, [3], [2,3]);
    grid.display();

    playButton = {
        button: createButton("Play").size(150, 30),
        state: false
    };
    playButton.button.mousePressed(() => {
        playButton.state = !playButton.state;

        if(playButton.state) {
            playButton.button.html("Pause");
            loop();
        } else {
            playButton.button.html("Play");
            noLoop();
        }
    });

    resetButton = createButton("Reset").size(150, 30);
    resetButton.mousePressed(() => {
        grid = new Automata(tileSize, [3], [2,3]);
        grid.display();

        playButton.button.html("Play");
        playButton.state = false;
        noLoop();
    });

    clearButton = createButton("Clear Grid").size(150, 30);
    clearButton.mousePressed(() => {
        for(let row of grid.layout) {
            for(let tile of row) {
                tile.live = false;
                tile.willChange = false;
            }
        }
        grid.display();

        playButton.button.html("Play");
        playButton.state = false;
        noLoop();
    });
}

function draw() {
    grid.nextGen();
    grid.displayAndUpdate();
}

function paintTile() {
    let mX = Math.floor(mouseX / tileSize);
    let mY = Math.floor(mouseY / tileSize);

    let clickedTile = grid.get(mX, mY);

    if(!clickedTile) {
        return;
    }

    if(paintMode) {
        clickedTile.live = true;
    } else {
        clickedTile.live = false;
    }

    grid.display();
}

function keyPressed() {
    if(keyCode === 83) {
        paintMode = !paintMode;

        if(paintMode) {
            label.innerHTML ="Draw";
        } else {
            label.innerHTML = "Erase";
        }
    }
    console.log(keyCode);
}

function mouseDragged() {
    paintTile();
}
