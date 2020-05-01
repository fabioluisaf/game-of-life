class Grid {
    constructor(tileSize) {
        this.tileSize = tileSize;
        this.layout = [];

        for(let x = 0; x < width / this.tileSize; x++) {
            this.layout[x] = [];
            for(let y = 0; y < height / this.tileSize; y++) {
                this.layout[x][y] = new Cell(x, y, this.tileSize, random(1) < 0.3);
            }
        }
    }

    get(x, y) {
        return this.layout[x][y];
    }

    nextGen() {
        for(let line of this.layout) {
            for(let tile of line) {
                 // rules 1 and 3 only checks live cells
                if(tile.live && (this.liveNeighbors(tile) < 2 || this.liveNeighbors(tile) > 3)) {
                    tile.willChange = true;
                 // rule 4 only checks on dead cells
                } else if (!tile.live && this.liveNeighbors(tile) === 3) {
                    tile.willChange = true;
                }
            }
        }
    }

    display() {
        for(let line of this.layout) {
            for(let tile of line) {
                tile.display();
            }
        }
    }

    displayAndUpdate() {
        for(let line of this.layout) {
            for(let tile of line) {
                tile.update();
                tile.display();
            }
        }
    }

    liveNeighbors(cell) {
        return this.liveNeighborsOf(cell.x, cell.y);
    }

    liveNeighborsOf(x, y) {
        let liveNeighbors = 0;
        let offsets = [-1, 0, 1];

        for(let i of offsets) {
            for(let j of offsets) {
                // only checks cells that exist, are alive and if i and j are not both 0
                if (i === 0 && j === 0) {
                    continue;
                }
                if (this.layout[x + i] && this.layout[x + i][y + j] && this.layout[x + i][y + j].live) {
                    liveNeighbors++;
                }
            }
        }
        return liveNeighbors;
    }
}
