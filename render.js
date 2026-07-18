class GameRenderClass {
    constructor() {
        this.ctx = document.getElementsByTagName("canvas")[0].getContext("2d");  // 画布对象
    }
    setSize(width, height) {
        document.getElementsByTagName("canvas")[0].width = width;
        document.getElementsByTagName("canvas")[0].height = height;
    }
}

var gameRender;
window.addEventListener("DOMContentLoaded", () => {
    gameRender = new GameRenderClass();
});