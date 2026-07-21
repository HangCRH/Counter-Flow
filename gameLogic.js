class GameBoardClass {
    /**
     * 创建游戏主对象，**所有**关于游戏信息的对象、变量、操作在这里访问
     * @param {number} width 游戏画布宽度
     * @param {number} height 游戏画布高度
     */
    constructor(width, height) {
        this.width = width;
        this.height = height;
        /**@type {Player[]} */
        this.players = [];
        /**@type {City[]} */
        this.cities = [];
        gameRender.setSize(width, height)
    }
    /**
     * 创建一个玩家
     * @param {number} id 玩家ID
     * @param {string} type 玩家类型，可以是user或AI
     * @param {string} color 玩家军队与城市颜色
     * @param {number} recoveryMultiplier 玩家所拥有的城市的兵力回复乘区
     */
    createPlayer(id, type, color = null, recoveryMultiplier = 1.0) {
        // 如果没有提供颜色则自动生成
        if (!color) {
            // 随机色相，饱和度固定 70%，明度固定 60%（避免太暗或太亮）
            color = `hsl(${parseInt(Math.random() * 360)}, 70%, 60%)`;
        }
        this.players.push(new Player(id, type, color, recoveryMultiplier));
    }
    /**
     * 创建一个正方形的城市
     * @param {number} id 城市ID
     * @param {number|null} x 城市左上角x坐标，单位：px，填null表示自动生成
     * @param {number|null} y 城市左上角y坐标，单位：px，填null表示自动生成
     * @param {number} size 城市大小，单位：px
     * @param {number|null} owner 拥有这个城市的玩家ID
     * @param {number} troops 城市当前的兵力
     * @param {number} baseGrowth 城市兵力回复基数，单位：个/秒
     */
    createCity(id, x = null, y = null, size = 50, owner = null, troops = 50, baseGrowth = 2) {
        // 如果没有提供x、y则自动生成，5次尝试生成，每次检查是否和其他城市重合，5次后放弃生成
        // 无论是否有x、y检查是否和其他城市重合，所以循环必须至少进行一次
        for (let i = 0, isOverlap = false, is; i < 5; i++, isOverlap = false) {
            if (!x) {
                x = parseInt(Math.random() * (this.width - size));
            }
            if (!y) {
                y = parseInt(Math.random() * (this.height - size));
            }
            for (const city of this.cities) {
                if ((city.x <= x && x <= city.x + city.size) || (city.y <= y && y <= city.y + city + size)) {
                    // 检测不通过，标记并退出循环
                    isOverlap = true;
                }
            }
            //若完整遍历并没有标记则为未重叠，退出并继续生成
            if (!isOverlap) {
                break;
            }
        }
        this.cities.push(new City(id, x, y, size, owner, troops, baseGrowth));
    }
}

class Player {
    /**
     * 玩家
     * @param {number} id 
     * @param {string} type 
     * @param {string} color 
     * @param {number} recoveryMultiplier 
     */
    constructor(id, type, color, recoveryMultiplier) {
        this.id = id;
        this.type = type;
        this.color = color;
        this.recoveryMultiplier = recoveryMultiplier;
        /**@type {number[]} */
        this.ownCities = [];
    }
}

class City {
    /**
     * 正方形城市
     * @param {number} id 
     * @param {number} x 
     * @param {number} y 
     * @param {number} size 
     * @param {number|null} owner 
     * @param {number} troops 
     */
    constructor(id, x, y, size, owner = null, troops = 0, baseGrowth = 2) {
        this.id = id;
        this.x = x;
        this.y = y;
        this.size = size;
        this.owner = owner;
        this.troops = troops;
        this.baseGrowth = baseGrowth;
    }
}

var gameBoard;          // 记录地图信息（游戏信息）
var isPlaying = false;  // 记录是否正在进行游戏

function init() {
    isPlaying = true;
    gameBoard = new GameBoardClass(800, 600)
    loadPlayers(3);
    loadCities(10);
    console.log(gameBoard);
}

function loadCities(citiesCnt = 0) {
    // 生成各玩家的初始城市
    for (let i = 0; i < gameBoard.players.length; i++) {
        gameBoard.createCity(i, null, null, 50, gameBoard.players[i].id, 50);
    }
    // 生成中立城市
    for (let i = 0; i < citiesCnt - gameBoard.players.length; i++) {
        gameBoard.createCity(i + gameBoard.players.length, null, null, 50, null, 50);
    }
}

function loadPlayers(aiCnt = 0) {
    gameBoard.createPlayer(0, "user");
    for (let i = 0; i < aiCnt; i++) {
        gameBoard.createPlayer(i + 1, "AI");
    }
}