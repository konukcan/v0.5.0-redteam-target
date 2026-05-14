import MedievalBakingScene from "./scenes/medievalBaking.js";
import MedievalEatingScene from "./scenes/medievalEating.js";

var scene = 'Eating';

if (scene == 'Eating') {
    var MedievalScene = MedievalEatingScene;
} else if (scene == 'Baking') {
    var MedievalScene = MedievalBakingScene;
}

var config = {
    type: Phaser.AUTO,
    width: 320,
    height: 320,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false,
            tileBias: 8
        }
    },
    scene: MedievalScene,
    pixelArt: true,
    scale: {
        mode: Phaser.Scale.NONE,
        autoCenter: Phaser.Scale.NO_CENTER,
        resizeInterval: 0,
        parent: 'canvas-container',
        expandParent: false,
        fullscreenTarget: 'canvas-container',
    },
    fps: { forceSetTimeOut: true, target: 30 },
    render: {
        preserveDrawingBuffer: true 
    },
};

window.MedievalScene = MedievalScene;

window.gameConfig = config;

//new Phaser.Game(config);