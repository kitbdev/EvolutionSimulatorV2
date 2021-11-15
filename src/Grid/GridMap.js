const Cell = require('../Organism/Cell/GridCell');
const CellStates = require('../Organism/Cell/CellStates');

class GridMap {
    constructor(cols, rows, cell_size) {
        this.hex_mode = false;
        this.resize(cols, rows, cell_size);
    }

    resize(cols, rows, cell_size) {
        this.grid = [];
        this.cols = cols;
        this.rows = rows;
        this.cell_size = cell_size;
        for(var c=0; c<cols; c++) {
            var row = [];
            for(var r=0; r<rows; r++) {
                var pos = this.hex_mode ? this.colRowToXyHex(c,r) : [c*cell_size, r*cell_size];
                var cell = new Cell(CellStates.empty, c, r, pos[0], pos[1]);
                row.push(cell);
            }            
            this.grid.push(row);
        }
    }

    fillGrid(state) {
        for (var col of this.grid) {
            for (var cell of col) {
                cell.setType(state);
                cell.owner = null;
                cell.cell_owner = null;
            }
        }
    }

    cellAt(col, row) {
        if (!this.isValidLoc(col, row)) {
            return null;
        }
        return this.grid[col][row];
    }

    setCellType(col, row, state) {
        if (!this.isValidLoc(col, row)) {
            return;
        }
        this.grid[col][row].setType(state);
    }

    setCellOwner(col, row, cell_owner) {
        if (!this.isValidLoc(col, row)) {
            return;
        }
        this.grid[col][row].cell_owner = cell_owner;
        if (cell_owner != null)
            this.grid[col][row].owner = cell_owner.org;
        else 
            this.grid[col][row].owner = null;
    }

    isValidLoc(col, row){
        return col<this.cols && row<this.rows && col>=0 && row>=0;
    }

    getCenter(){
        return [Math.floor(this.cols/2), Math.floor(this.rows/2)]
    }

    xyToColRow(x, y) {
        var c = Math.floor(x/this.cell_size);
        var r = Math.floor(y/this.cell_size);
        if (c >= this.cols)
            c = this.cols-1;
        else if (c < 0)
            c = 0;
        if (r >= this.rows)
            r = this.rows-1;
        else if (r < 0)
            r = 0;
        return [c, r];
    }
    xyToColRowHex(x, y) {
        // point to axial
        var q = ( 2.0/3 * x) / this.cell_size;
        var r = (-1.0/3 * x  +  Math.sqrt(3)/3 * y) / this.cell_size;
        // axial round
        const qgrid = Math.round(q), rgrid = Math.round(r);
        q -= qgrid, r -= rgrid; // remainder
        const dq = Math.round(q + 0.5*r) * (q*q >= r*r);
        const dr = Math.round(r + 0.5*q) * (q*q < r*r);
        var aq = qgrid + dq;
        var ar = rgrid + dr;
        // axial to oddq
        var col = aq;
        var row = ar + (aq - (aq&1)) / 2;
        // clamp
        if (col >= this.cols)
            col = this.cols-1;
        else if (col < 0)
            col = 0;
        if (row >= this.rows)
            row = this.rows-1;
        else if (row < 0)
            row = 0;
        return [col, row];
    }
    colRowToXyHex(col,row) {
        var x = this.cell_size * 3/2 * col;
        var y = this.cell_size * Math.sqrt(3) * (row + 0.5 * (col&1));
        return [x, y];
    }
}

module.exports = GridMap;
