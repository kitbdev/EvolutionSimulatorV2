const Directions = {
    up:0,
    right:1,
    down:2,
    left:3,
    scalars:[[0,-1],[1,0],[0,1],[-1,0]],
    getRandomDirection: function() {
        return Math.floor(Math.random() * 4);
    },
    getRandomScalar: function() {
        return this.scalars[Math.floor(Math.random() * this.scalars.length)];
    },
    getOppositeDirection: function(dir) {
        switch(dir){
            case this.up:
                return this.down;
            case this.down:
                return this.up;
            case this.left:
                return this.right;
            case this.right:
                return this.left;
        }
    },
    rotateRight: function(dir) {
        dir++;
        if (dir > 3){
            dir = 0;
        }
        return dir;
    }
}
const HexDirections = {
    up:0,
    upright:1,
    downright:2,
    down:3,
    downleft:4,
    upleft:5,
    height:Math.sqrt(3.0),
    width:2.0,
    scalars:[[0,-this.height],[this.width*0.75,-this.height/2],[this.width*0.75,this.height/2],[0,this.height],[-this.width*0.75,this.height/2],[-this.width*0.75,-this.height/2]],
    getRandomDirection: function() {
        return Math.floor(Math.random() * 6);
    },
    getRandomScalar: function() {
        return this.scalars[Math.floor(Math.random() * this.scalars.length)];
    },
    getOppositeDirection: function(dir) {
        switch(dir){
            case this.up:
                return this.down;
            case this.down:
                return this.up;
            case this.upleft:
                return this.downright;
            case this.downright:
                return this.upleft;
            case this.downleft:
                return this.upright;
            case this.upright:
                return this.downleft;
        }
    },
    rotateRight: function(dir) {
        dir++;
        if (dir >= 6){
            dir = 0;
        }
        return dir;
    }
}
module.exports = {Directions, HexDirections};