/**
 * 游戏渲染类，负责在 Canvas 上绘制游戏画面。
 * @class
 */
class GameRenderClass {
    /**
     * 创建渲染对象，获取页面 Canvas 的 2D 绘图上下文
     */
    constructor() {
        /** @type {CanvasRenderingContext2D} 画布 2D 绘图上下文 */
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
}

var gameRender;
window.addEventListener("DOMContentLoaded", () => {
    gameRender = new GameRenderClass();
});