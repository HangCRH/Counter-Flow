/**
 * 游戏渲染类，负责在 Canvas 上绘制游戏画面。
 * @class
 */
class GameRenderClass {
    /**
     * 创建渲染对象，获取页面 Canvas 的 2D 绘图上下文
     */
    constructor() {
        /** @type {CanvasRenderingContext2D} 画布 2D 绘图上下文*/
        this.ctx = document.getElementsByTagName("canvas")[0].getContext("2d");
    }
    /**
     * 设置画布尺寸
     * @param {number} width 画布宽度（单位：px）
     * @param {number} height 画布高度（单位：px）
     */
    setSize(width, height) {
        document.getElementsByTagName("canvas")[0].width = width;
        document.getElementsByTagName("canvas")[0].height = height;
    }
    /**
     * 渲染城市
     * @param {City|City[]} citiesData 要绘制的城市的数据
     */
    drawCities(citiesData) {
        console.log("drawing cities ", citiesData);
        // 如果只有单一的城市对象，转化成列表，统一处理
        if (!Array.isArray(citiesData)) {
            citiesData = new Array(citiesData);
        }
        this.ctx.strokeStyle = "#000000";
        for (const cityData of citiesData) {
            // 提取需要的值
            let x = cityData.x + (cityData.size) / 2;
            let y = cityData.y + (cityData.size) / 2;
            let r = cityData.size / 2;
            let enda = (Math.PI / 180) * 360;   // canvas曲线只支持弧度制度数，需要将360°转换
            let color = "";
            if (cityData.owner !== null) {
                // Array.find()按ID精确查找玩家，避免用数组下标取错
                const ownerPlayer = gameBoard.players.find(p => p.id === cityData.owner);
                color = ownerPlayer ? ownerPlayer.color : "#d6d6d6";
            } else {
                color = "#d6d6d6";
            }
            // 开始绘制
            this.ctx.fillStyle = color; // 设置填充颜色
            this.ctx.beginPath();   // 开始新图形的标志
            this.ctx.arc(x, y, r, 0, enda, true);   // 曲线轨迹
            this.ctx.stroke();      // 绘制边框
            this.ctx.fill();        // 填充
            this.ctx.closePath();   // 此图形的结束标记
        }
    }
}

/** @type {GameRenderClass} */
var gameRender;
window.addEventListener("DOMContentLoaded", () => {
    gameRender = new GameRenderClass();
});