import BaseScene from './BaseScene.js';
import {AutoCharacter} from "../utils/AutoCharacterBaking.js";

export default class MedievalBakingScene extends BaseScene {
    constructor() {
        super({ key: 'MedievalBakingScene' });
        this.version = 1;
        this.mapId = '2';

        this.autoCharacterChoices = ['selfish', 'selfish']
        this.autoCharacterChoices = ['gesture', 'selfish']
        //this.autoCharacterChoices = ['gesture', 'gesture']
        //this.autoCharacterChoices = ['gesture', 'cooperative']
        this.autoCharacterChoices = ['cooperative', 'cooperative']
        this.autoCharacterChoices = ['cheeky', 'cooperative']
        if (this.trialConfig.characterChoices) {
            this.autoCharacterChoices = this.trialConfig.characterChoices;
        }
        

        this.AutoCharacter = AutoCharacter

        // If sitting is included then randomly start on different possible places
        this.characterPositions = [
            {x: 1, y: 4}, 
            {x: 9, y: 4}
        ]
        this.characterExits = [
            {x: 0, y: 3}, 
            {x: 8, y: 3},
        ]

        console.log('Character positions:', this.characterPositions)

        // Character starting positions
        if (this.autoCharacterChoices.length == 1) {
            this.numCharacters = 1
            this.numAutoCharacters = 1
            this.tableSides = ['left']
            this.startingPositions = [this.characterPositions[0]]
            this.exitPositions = [this.characterExits[0]]
        } else if (this.autoCharacterChoices.length == 2) {
            this.numCharacters = 2
            this.numAutoCharacters = 2
            this.tableSides = ['left', 'right']
            this.startingPositions = [this.characterPositions[0], this.characterPositions[1]]
            this.exitPositions = [this.characterExits[0], this.characterExits[1]]
        } else {
            this.numCharacters = 3
            this.numAutoCharacters = 3
            this.tableSides = ['left', 'right', 'right']
            this.startingPositions = [this.characterPositions[0], this.characterPositions[1], this.characterPositions[2]]
            this.exitPositions = [this.characterExits[0], this.characterExits[1], this.characterExits[0]]
        }
        console.log('Starting positions:', this.startingPositions, 'Exit positions:', this.exitPositions)

        this.socialInformation = new Array(this.numAutoCharacters).fill('go');
        this.charactersFinished = new Array(this.numAutoCharacters).fill(false);


        // Color cues
        this.colorCues = true;
        this.colorCuesPos = {
            'left': {x: 1, y: 6},
            'right': {x: 7, y: 8}
        }
    }

    preload() {

        super.preload();
        this.load.json('scene-config', `assets/scenes/medievalVillage${this.mapId}.json`);
        this.load.tilemapTiledJSON('map', `assets/tilemaps/medievalVillage${this.mapId}.tmj`);


        // Load collision grid
        this.load.json('collision-grid', `assets/tilemaps/medievalVillage${this.mapId}Collisions.json`);


        // Load item sprites
        this.load.image('flour', 'assets/objects/flour_1.png');
        this.load.image('water', 'assets/objects/water_1.png');
        this.load.image('batter', 'assets/objects/batter.png');
        this.load.image('bread5', 'assets/objects/bread_5.png');
        this.load.image('bread4', 'assets/objects/bread_4.png');
        this.load.image('bread3', 'assets/objects/bread_3.png');
        this.load.image('bread2', 'assets/objects/bread_2.png');
        this.load.image('bread1', 'assets/objects/bread_1.png');

        // Define interactable objects
        if (this.version == 0) {
            this.interactableObjects = {
                oven: [{x: 1, y: 2}, {x: 2, y: 2}],
                table1: [{x: 1, y: 6}, {x: 2, y: 6}],
                table2: [{x: 4, y: 6}, {x: 5, y: 6}]
            };
        } else {
            this.interactableObjects = {
                oven: [{x: 3, y: 2}, {x: 4, y: 2}],
                table1: [{x: 2, y: 6}, {x: 3, y: 6}],
                table2: [{x: 6, y: 6}, {x: 7, y: 6}]
            };
        }

        
    }

    create() {
        const sceneConfig = this.cache.json.get('scene-config');
        super.init(sceneConfig);
        super.create();

        // Start with 1 flour and 1 water (for player)
        if (this.playerCharacterId) {
            const playerChar = this.characters.get(this.playerCharacterId);
            playerChar.inventory.push('flour');
            playerChar.inventory.push('water');
            this.updateInventoryDisplay();
        }
    }

    handleInteraction(characterId, take=true, tableSide=null, specialAction=false) {
        const character = this.characters.get(characterId);
        if (!character) return false;

        const facingTile = this.getFacingTile(characterId);

        const charX = Math.floor(character.sprite.x / 32);
        const charY = Math.floor(character.sprite.y / 32);

        //console.log('Character', characterId, 'Table side:', tableSide, 'Special action:', specialAction);


        //console.log('Interacting with tile:', facingTile, character.lastDirection, charX, charY, character.sprite.x / 32, character.sprite.y / 32);
        if ((!facingTile || !this.isInteractableTile(facingTile.x, facingTile.y)) && specialAction == false) {
            return false;
        }

        const tileKey = `${facingTile.x},${facingTile.y}`;
        const tileType = this.getTileType(facingTile.x, facingTile.y);

        //console.log('Interacting with tile:', tileKey, tileType);

        // If there's an item on the tile, try to make batter or take it
        if (take && this.objectsOnTiles[tileKey]) {

            const item = this.objectsOnTiles[tileKey];

            if (specialAction == 'make_batter') {
                // Try to make batter
                // Check for adjacent flour and water to make batter
                const adjacentTiles = this.getAdjacentTableTiles(facingTile.x, facingTile.y);
                let hasFlour = false;
                let hasWater = false;
                
                if (this.objectsOnTiles[tileKey] === 'flour') {
                    hasFlour = true;
                    hasWater = adjacentTiles.some(tile => {
                        const key = `${tile.x},${tile.y}`;
                        return this.objectsOnTiles[key] === 'water';
                    });
                } else if (this.objectsOnTiles[tileKey] === 'water') {
                    hasWater = true;
                    hasFlour = adjacentTiles.some(tile => {
                        const key = `${tile.x},${tile.y}`;
                        return this.objectsOnTiles[key] === 'flour';
                    });
                }

                //console.log('Adjacent table tiles:', adjacentTiles, hasFlour, hasWater);

                if (hasFlour && hasWater) {
                    // Remove flour or water from adjacent tiles
                    adjacentTiles.forEach(tile => {
                        const key = `${tile.x},${tile.y}`;
                        if (this.objectsOnTiles[key] === 'flour' || this.objectsOnTiles[key] === 'water') {
                            if (this.itemSprites[key]) {
                                this.itemSprites[key].destroy();
                                delete this.itemSprites[key];
                            }
                            delete this.objectsOnTiles[key];
                        }
                    });
                    // Remove flour or water from current tile
                    if (this.itemSprites[tileKey]) {
                        this.itemSprites[tileKey].destroy();
                        delete this.itemSprites[tileKey];
                    }
                    delete this.objectsOnTiles[tileKey];

                    // Create batter in the same slot where we just placed the item
                    this.objectsOnTiles[tileKey] = 'batter';
                    const sprite = this.add.image(facingTile.x * 32 + 16, facingTile.y * 32 + 16, 'batter');
                    sprite.setScale(1);
                    if (!this.itemSprites) this.itemSprites = {};
                    this.itemSprites[tileKey] = sprite;
                    return 'make_batter';
                }

            } else if (this.addToInventory(characterId, this.objectsOnTiles[tileKey])) {

                // Handle stackable items
                const stackableItem = this.checkStackable(item);

                if (item.includes('bread')) {
                    // Remove 1 bread from the tile
                    const numBreads = parseInt(item.replace('bread', ''));
                    const numBreadsPost = numBreads == 1 ? 0 : numBreads - 1;
                    
                    if (numBreadsPost == 0) {
                        let spriteTake = this.itemSprites[tileKey];
                        this.tweens.add({
                            targets: spriteTake,
                            x: facingTile.x * 32 + 16,
                            y: facingTile.y * 32 - 16,
                            duration: 800, // milliseconds
                            ease: 'Linear',
                            onComplete: function() {
                                spriteTake.destroy();
                            }
                        });
                        this.itemSprites[tileKey].destroy();
                        delete this.itemSprites[tileKey];
                        delete this.objectsOnTiles[tileKey];
                    } else {
                        this.itemSprites[tileKey].destroy();
                        this.objectsOnTiles[tileKey] = `bread${numBreadsPost}`;
                        const sprite = this.itemSprites[tileKey] = this.add.image(facingTile.x * 32 + 16, facingTile.y * 32 + 16, `bread${numBreadsPost}`);
                        sprite.setScale(1);

                        let spriteTake = this.add.image(facingTile.x * 32 + 16, facingTile.y * 32 + 16, `bread1`);
                        this.tweens.add({
                            targets: spriteTake,
                            x: facingTile.x * 32 + 16,
                            y: facingTile.y * 32 - 16,
                            duration: 800, // milliseconds
                            ease: 'Linear',
                            onComplete: function() {
                                spriteTake.destroy();
                            }
                        });
                    }
                    //console.log(characterId, item, numBreads, numBreadsPost)

                    // Count number of breads in inventory

                    const breadsInInventory = character.inventory.filter(item => item.includes('bread'))
                    let numBreadInventory = 0;
                    if (breadsInInventory.length > 0) {
                        for (const bread of breadsInInventory) {
                            numBreadInventory += parseInt(bread.replace('bread', ''));
                        }
                        numBreadInventory = numBreadInventory - numBreadsPost;
                    }
                    // Remove all bread items from inventory
                    character.inventory = character.inventory.filter(item => !item.includes('bread'));
                    
                    // Add all breads back to inventory except the one we just took
                    this.addToInventory(characterId, `bread${numBreadsPost}`);
                    
                } else {
                    if (this.itemSprites[tileKey]) {
                        let sprite = this.itemSprites[tileKey];

                        this.tweens.add({
                            targets: sprite,
                            x: facingTile.x * 32 + 16,
                            y: facingTile.y * 32 - 16,
                            duration: 800, // milliseconds
                            ease: 'Linear',
                            onComplete: function() {
                                sprite.destroy();
                            }
                        });
                        delete this.itemSprites[tileKey];
                    }
                    delete this.objectsOnTiles[tileKey];
                }
                // Perform the take action
                return 'interact';
            } 
        }

        //console.log('Cheeky side:', tableSide);

        // If we have items, try to place one
        if (!take && character.inventory.length > 0) {
            const item = this.removeFromInventory(characterId);
            if (item) {
                if (tileType === 'oven' && item === 'batter') {
            
                    // Create bread from batter
                    this.addToInventory(characterId, 'bread4');
                    return 'bake';
                } else if (tileType === 'oven') {
                    // Only batter can be used in oven
                    this.addToInventory(characterId, item);
                    return false;
                } else if (tileType.startsWith('table')) {

                    if (item.includes('bread')) {
                        let numBreadsInInventory = parseInt(item.replace('bread', ''));
                        // Check whether there's already a bread on the table on the facing tile
                        if (this.objectsOnTiles[tileKey]) {
                                // Count bread on tile
                                const numBreads = parseInt(this.objectsOnTiles[tileKey].replace('bread', ''));
                                const numBreadsPost = numBreads == 5 ? 5 : numBreads + 1;
                                this.objectsOnTiles[tileKey] = `bread${numBreadsPost}`;

                                // Update sprite
                                //let sprite = this.add.image(facingTile.x * 32 + 16, facingTile.y * 32 + 16, `bread1`);
                                //console.log('Sprite:', sprite)
//
                                //this.tweens.add({
                                //    targets: sprite,
                                //    x: facingTile.x * 32 + 16,
                                //    y: (facingTile.y)* 32 - 16,
                                //    duration: 800, // milliseconds
                                //    ease: 'Linear',
                                //    onComplete: function() {
                                //        sprite.destroy();
                                //    }
                                //});
                                // Update sprite
                                this.itemSprites[tileKey].destroy();
                                delete this.itemSprites[tileKey];
                                const sprite = this.itemSprites[tileKey] = this.add.image(facingTile.x * 32 + 16, facingTile.y * 32 + 16, `bread${numBreadsPost}`);
                                sprite.setScale(1);
                        } else {
                            // Place the item on the tile first
                            this.objectsOnTiles[tileKey] = 'bread1';
                            const sprite = this.add.image(facingTile.x * 32 + 16, facingTile.y * 32 + 16, 'bread1');
                            sprite.setScale(1);
                            if (!this.itemSprites) this.itemSprites = {};
                            this.itemSprites[tileKey] = sprite;
                        }
                        //console.log(characterId, item, numBreadsInInventory)
                        // Adjust number of breads in inventory
                        if (numBreadsInInventory > 1) {
                            this.addToInventory(characterId, `bread${numBreadsInInventory - 1}`);
                        }
                        //console.log(characterId, item, this.characters.get(characterId).inventory)
                            
                    } else {
                        // Place the item on the tile first
                        this.objectsOnTiles[tileKey] = item;
                        const sprite = this.add.image(facingTile.x * 32 + 16, facingTile.y * 32 + 16, item);
                        sprite.setScale(1);
                        if (!this.itemSprites) this.itemSprites = {};
                        this.itemSprites[tileKey] = sprite;
                    }
                    if (specialAction == 'cheeky') {
                        return 'cheekyright';
                    } else if (specialAction == 'gesture') {
                        return 'gesture';
                    } else {
                        return 'interact';
                    }
                    
                } else {
                    // Place item on tile
                    this.objectsOnTiles[tileKey] = item;
                    const sprite = this.add.image(facingTile.x * 32 + 16, facingTile.y * 32 + 16, item);
                    sprite.setScale(1);
                    if (!this.itemSprites) this.itemSprites = {};
                    this.itemSprites[tileKey] = sprite;
                    // Perform the place action
                    return 'interact';
                }
            }
        }
        return false;
    }
}