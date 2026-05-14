import BaseScene from './BaseScene.js';

export default class MedievalBakingScene extends BaseScene {
    constructor() {
        super({ key: 'MedievalBakingScene' });

        this.version = 0;
    }

    preload() {
        super.preload();
        this.load.json('scene-config', 'assets/scenes/medievalBaking.json');
        this.load.tilemapTiledJSON('map', 'assets/tilemaps/medievalBaking.tmj');
    }

    create() {
        const sceneConfig = this.cache.json.get('scene-config');
        super.init(sceneConfig);
        super.create();
    }
}