const Cell = require('../Organism/Cell/GridCell');
const CellStates = require('../Organism/Cell/CellStates');

class GridMap {
    constructor(cols, rows, cell_size) {
        this.resize(cols, rows, cell_size);
    }

    resize(cols, rows, cell_size, hex_mode=false) {
        this.grid = [];
        this.cols = cols;
        this.rows = rows;
        this.cell_size = cell_size;
        for(var c=0; c<cols; c++) {
            var row = [];
            for(var r=0; r<rows; r++) {
                var pos = hex_mode ? this.colRowToXyHex(c,r) : [c*cell_size, r*cell_size];
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
        var q = ( 2./3 * x) / this.cell_size;
        var r = (-1./3 * x  +  Math.sqrt(3)/3 * y) / this.cell_size;
        // axial round
        const xgrid = Math.round(q), ygrid = Math.round(r);
        q -= xgrid;
        r -= ygrid;
        const dx = Math.round(q + 0.5*r) * (q*q >= r*r);
        const dy = Math.round(r + 0.5*q) * (q*q < r*r);
        var c = xgrid + dx;
        var r = ygrid + dy;
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
    colRowToXyHex(col,row) {
        var x = this.cell_size * 3/2 * col;
        var y = this.cell_size * Math.sqrt(3) * (row + 0.5 * (col&1));
        return [x, y];
    }
}

module.exports = GridMap;
