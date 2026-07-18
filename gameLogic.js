var ctx = document.getElementsByTagName("canvas")[0].getContext("2d");
var aiPlayerCount = 3;

class aiPlayer {
    constructor(color) {
        this.color = color;
        this.ownCity = [];
    }
}