var aiPlayerCount = 0;      // 记录AI数量
var gameData = new gameBoard()   // 记录地图信息（游戏信息）
var isPlaying = false;  // 记录是否正在进行游戏

class gameBoard {
    constructor() {
        this.players = [];
        this.cities = [];
    }
    createPlayer(type, color) {

    }
}

class Player {
    constructor(type, color) {

    }
}

function init() {
    isPlaying = true;
    loadAiPlayers();
}

function loadAiPlayers(cnt = 0) {
    for (let i = 0; i < cnt; i++) {

    }
}