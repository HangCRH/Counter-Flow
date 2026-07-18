const WEBSITE_VERSION = "0.1.0";
var ctx = document.getElementsByTagName("canvas")[0].getContext("2d");  // 画布对象
var isPlaying = false;  // 记录是否正在进行游戏

function init() {
    isPlaying = true;
    loadAiPlayers();
}