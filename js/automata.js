class Automata {
  constructor(tileSize, b, s) {
    this.tileSize = tileSize;
    this.layout = [];
    this.b = [...b];
    this.s = [...s];

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
        let amtNeightbors = this.liveNeighbors(tile).length;

        if(!tile.live && this.b.includes(amtNeightbors)) {
          tile.willChange = true;
        } else if(tile.live && !this.s.includes(amtNeightbors)) {
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
        // only checks cells that exist, are alive and that are not the current cell
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
