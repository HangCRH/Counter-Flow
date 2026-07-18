class gameObject {
    constructor() {
        this.players = [];
        this.cities = [];
    }
    createPlayer(type, color = null) {
        // 如果没有提供颜色则自动生成
        if (!color) {
            // 随机色相，饱和度固定 70%，明度固定 60%（避免太暗或太亮）
            color = `hsl(${parseInt(Math.random() * 360)}, 70%, 60%)`;
        }
        this.players.push(new Player(type, color));
    }
}

class Player {
    constructor(type, color) {
        this.type = type;
        this.color = color;
        this.ownCities = [];
    }
}

var gameBoard = new gameObject()   // 记录地图信息（游戏信息）
var isPlaying = false;  // 记录是否正在进行游戏

function init() {
    isPlaying = true;
    loadPlayers(3);
    console.log(gameBoard);
}

function loadPlayers(aiCnt = 0) {
    gameBoard.createPlayer("user")
    for (let i = 0; i < aiCnt; i++) {
        gameBoard.createPlayer("AI")
    }
}