/**
 * 游戏主控制类，管理所有游戏状态与逻辑。
 * **所有**关于游戏信息的对象、变量、操作都在这里访问。
 * @class
 */
class GameBoardClass {
    /**
     * 创建游戏主对象
     * @param {number} width 游戏画布宽度（单位：px）
     * @param {number} height 游戏画布高度（单位：px）
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
     * 创建一个玩家并加入玩家列表
     * @param {number} id 玩家ID
     * @param {string} type 玩家类型，可以是 `"user"` 或 `"AI"`
     * @param {string|null} color 玩家军队与城市颜色（CSS 颜色字符串），为 `null` 时自动生成
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
     * 创建一个正方形城市并加入城市列表。
     * 若未提供坐标则自动随机生成位置，最多尝试 5 次以避免与其他城市重叠。
     * @param {number} id 城市ID
     * @param {number|null} x 城市左上角 x 坐标（单位：px），为 `null` 时自动生成
     * @param {number|null} y 城市左上角 y 坐标（单位：px），为 `null` 时自动生成
     * @param {number} size 城市边长大小（单位：px）
     * @param {number|null} owner 拥有该城市的玩家 ID，`null` 表示中立
     * @param {number} troops 城市当前的兵力
     * @param {number} baseGrowth 城市兵力回复基数（单位：个/秒）
     */
    createCity(id, x = null, y = null, size = 50, owner = null, troops = 50, baseGrowth = 2) {
        // 如果没有提供x、y则自动生成，5次尝试生成，每次检查是否和其他城市重合，5次后放弃生成
        // 无论是否有x、y检查是否和其他城市重合，所以循环必须至少进行一次
        for (let i = 0, isOverlap = false; i < 5; i++, isOverlap = false) {
            if (x === null) {
                x = parseInt(Math.random() * (this.width - size));
            }
            if (y === null) {
                y = parseInt(Math.random() * (this.height - size));
            }
            for (const city of this.cities) {
                // 矩形重叠检测：两个矩形在X轴和Y轴上都有交集才算重叠
                if (city.x + city.size > x && x + size > city.x && city.y + city.size > y && y + size > city.y) {
                    // 检测不通过，重置坐标并标记，下一轮重新随机生成
                    isOverlap = true;
                    x = null;
                    y = null;
                    break;
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

/**
 * 玩家类，表示一个游戏参与者（用户或 AI）
 * @class
 */
class Player {
    /**
     * 创建一个玩家
     * @param {number} id 玩家唯一标识
     * @param {string} type 玩家类型：`"user"` 或 `"AI"`
     * @param {string} color 玩家颜色（CSS 颜色字符串）
     * @param {number} recoveryMultiplier 兵力回复乘区
     */
    constructor(id, type, color, recoveryMultiplier) {
        /** @type {number} 玩家唯一标识 */
        this.id = id;
        /** @type {string} 玩家类型 */
        this.type = type;
        /** @type {string} 玩家颜色 */
        this.color = color;
        /** @type {number} 兵力回复乘区 */
        this.recoveryMultiplier = recoveryMultiplier;
        /** @type {number[]} 该玩家拥有的城市 ID 列表 */
        this.ownCities = [];
    }
}

/**
 * 城市类，表示地图上的一个正方形城市
 * @class
 */
class City {
    /**
     * 创建一个城市
     * @param {number} id 城市唯一标识
     * @param {number} x 城市左上角 x 坐标（单位：px）
     * @param {number} y 城市左上角 y 坐标（单位：px）
     * @param {number} size 城市边长大小（单位：px）
     * @param {number|null} owner 拥有该城市的玩家 ID，`null` 表示中立
     * @param {number} troops 城市初始兵力
     * @param {number} baseGrowth 城市兵力回复基数（单位：个/秒）
     */
    constructor(id, x, y, size, owner = null, troops = 0, baseGrowth = 2) {
        /** @type {number} 城市唯一标识 */
        this.id = id;
        /** @type {number} 城市左上角 x 坐标 */
        this.x = x;
        /** @type {number} 城市左上角 y 坐标 */
        this.y = y;
        /** @type {number} 城市边长大小 */
        this.size = size;
        /** @type {number|null} 拥有者玩家 ID */
        this.owner = owner;
        /** @type {number} 当前兵力 */
        this.troops = troops;
        /** @type {number} 兵力回复基数 */
        this.baseGrowth = baseGrowth;
    }
}

/** @type {GameBoardClass} 记录地图信息（游戏信息）*/
var gameBoard;
var isPlaying = false;  // 记录是否正在进行游戏

function init() {
    isPlaying = true;
    gameBoard = new GameBoardClass(800, 600)
    loadPlayers(3);
    loadCities(10);
    console.log(gameBoard);
    gameRender.drawCities(gameBoard.cities);
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