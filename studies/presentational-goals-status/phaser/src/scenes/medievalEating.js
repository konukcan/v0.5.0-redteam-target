import BaseScene from './BaseScene.js';
import {AutoCharacter} from "../utils/AutoCharacterEating.js";

export default class MedievalBakingScene extends BaseScene {
    constructor() {
        super({ key: 'MedievalBakingScene' });
        this.version = 1

        this.autoCharacterChoices = ['orange', 'apple']
        this.autoCharacterChoices = ['orange', 'sitting']
        this.autoCharacterChoices = ['apple', 'sitting']
        this.autoCharacterChoices = ['apple', 'orange_after']
        this.autoCharacterChoices = ['apple', 'orange', 'sitting']

        //this.autoCharacterChoices = ['orange', 'apple_after', 'sitting']

        // Scene possible tags
        this.tags = {
            tables: [1, 2],
            characters: ['A', 'B', 'C'],
            items: ['apple', 'orange'],
        }

        // Scenes
        this.scenes = {
            epistemic: [
                '2_A_apple1-orange1-apple1-orange1',
                '2_AC_apple1-orange1-apple1-orange1',
                '2_B_apple1-orange1-apple1-orange1',
                '2_BC_apple1-orange1-apple1-orange1',
                '2_AB_apple1-orange1-apple1-orange1',
                '2_ABC_apple1-orange1-apple1-orange1',
            ],
            inference: [
                '1_AB_apple1-orange1',
                '1_ABC_apple1-orange1',
                '1_AB_apple1-orange1-orange1',
                '1_ABC_apple1-orange1-orange1',
                '1_AB_apple1-apple1-orange1',
                '1_ABC_apple1-apple1-orange1',
            ]
        }

        // Scene configuration
        if (this.trialConfig.sceneStr) {
            this.sceneStr = this.trialConfig.sceneStr
        } else {
            this.sceneStr = '2_AB_apple1-orange1-apple1-orange1'
        }

        

        this.mapId = this.sceneStr.split('_')[0]
        this.charactersPresent = this.sceneStr.split('_')[1].split('')
        this.itemsOnTable = this.sceneStr.split('_')[2].split('-')
        
        

        if ('characterChoices' in this.trialConfig) {
            this.autoCharacterChoices = this.trialConfig.characterChoices
        } else {
            this.autoCharacterChoices = []
            if (this.charactersPresent.includes('A')) {
                this.autoCharacterChoices.push('orange')
            }
            if (this.charactersPresent.includes('B')) {
                if (this.mapId == '1') {
                    this.autoCharacterChoices.push('sitting')
                } else {
                    this.autoCharacterChoices.push('apple')
                }
            }
            if (this.charactersPresent.includes('C')) {
                this.autoCharacterChoices.push('sitting')
            }
        }

        console.log('Scene config:', this.sceneStr, 'Choices', this.autoCharacterChoices, 'Colors', this.currentCharacterColors)


        this.AutoCharacter = AutoCharacter

        // If sitting is included then randomly start on different possible places
        this.characterPositions = {
            '1': {
                'A':{x: 4, y: 5}, 
                'B':{x: 3.2, y: 4},
                'C':{x: 6, y: 2},
            },
            '2': {
                'A':{x: 3, y: 5}, 
                'B':{x: 7, y: 5},
                'C':{x: 5, y: 3},
            }
        }
        this.characterExits = [
            {x: 0, y: 3}, 
            {x: 8, y: 3},
        ]
        this.tableSidesCharacters = {
            'A': 'left',
            'B': 'right',
            'C': 'right'
        }
        this.characterColorsDict = {
            'A': 'red',
            'B': 'green',
            'C': 'purple'
        }
        // Shuffle the positions
        //this.characterPositions = this.shuffleArray(this.characterPositions)
        this.characterExits = this.shuffleArray(this.characterExits)
        //console.log('Characters present:', this.charactersPresent)

        // Character starting positions
        if (this.autoCharacterChoices.length == 1) {
            this.numCharacters = 1
            this.numAutoCharacters = 1
            this.tableSides = this.tableSidesCharacters[this.charactersPresent[0]]
            this.startingPositions = [this.characterPositions[this.mapId][this.charactersPresent[0]]]
            this.exitPositions = [this.characterExits[0]]
            //this.currentCharacterColors = [this.characterColorsDict[this.charactersPresent[0]]]
        } else if (this.autoCharacterChoices.length == 2) {
            this.numCharacters = 2
            this.numAutoCharacters = 2
            this.tableSides = [this.tableSidesCharacters[this.charactersPresent[0]], this.tableSidesCharacters[this.charactersPresent[1]]]
            this.startingPositions = [this.characterPositions[this.mapId][this.charactersPresent[0]], this.characterPositions[this.mapId][this.charactersPresent[1]]]
            this.exitPositions = [this.characterExits[0], this.characterExits[1]]
            //this.currentCharacterColors = [this.characterColorsDict[this.charactersPresent[0]], this.characterColorsDict[this.charactersPresent[1]]]
        } else {
            this.numCharacters = 3
            this.numAutoCharacters = 3
            this.tableSides = [this.tableSidesCharacters[this.charactersPresent[0]], this.tableSidesCharacters[this.charactersPresent[1]], this.tableSidesCharacters[this.charactersPresent[2]]]
            this.startingPositions = [this.characterPositions[this.mapId][this.charactersPresent[0]], this.characterPositions[this.mapId][this.charactersPresent[1]], this.characterPositions[this.mapId][this.charactersPresent[2]]]
            this.exitPositions = [this.characterExits[0], this.characterExits[1], this.characterExits[0]]
            //this.currentCharacterColors = [this.characterColorsDict[this.charactersPresent[0]], this.characterColorsDict[this.charactersPresent[1]], this.characterColorsDict[this.charactersPresent[2]]]
        }
        //console.log('Starting positions:', this.startingPositions, 'Exit positions:', this.exitPositions)

        this.socialInformation = new Array(this.numAutoCharacters).fill('go');
        this.charactersFinished = new Array(this.numAutoCharacters).fill(false);
   
        // Color cues
        this.colorCues = false;
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
        this.load.image('orange1', 'assets/objects/orange1.png');
        this.load.image('orange2', 'assets/objects/orange2.png');
        this.load.image('apple1', 'assets/objects/applegreen1.png');
        this.load.image('apple2', 'assets/objects/applegreen2.png');
        this.load.image('banana1', 'assets/objects/banana1.png');
        this.load.image('banana2', 'assets/objects/banana2.png');

        // Boxes
        this.load.image('box3_1_upper', 'assets/objects/box3_1_upper.png');
        this.load.image('box3_1_lower', 'assets/objects/box3_1_lower.png');
        this.load.image('box3_2_upper', 'assets/objects/box3_2_upper.png');
        this.load.image('box3_2_lower', 'assets/objects/box3_2_lower.png');

        // Big barrel
        this.load.image('bigbarrel_topleft', 'assets/objects/bigbarrel_topleft.png');
        this.load.image('bigbarrel_topright', 'assets/objects/bigbarrel_topright.png');
        this.load.image('bigbarrel_bottomleft', 'assets/objects/bigbarrel_bottomleft.png');
        this.load.image('bigbarrel_bottomright', 'assets/objects/bigbarrel_bottomright.png');

        // Define interactable objects
        this.interactableObjectsMap = {
            '1': {
                table: [{x: 3, y: 6}, {x: 4, y: 6}, {x: 5, y: 6}, {x: 6, y: 6}]
            },
            '2': {
                table: [{x: 2, y: 6}, {x: 3, y: 6}, {x: 6, y: 6}, {x: 7, y: 6}]
            }
        };
        this.interactableObjects = this.interactableObjectsMap[this.mapId];
    }

    create() {
        const sceneConfig = this.cache.json.get('scene-config');
        super.init(sceneConfig);
        super.create();


        // Place the items sprites on the table at place {4, 6} and {5, 6}
        this.startingTiles = {
            '1': ['3,6', '4,6', '5,6', '6,6'],
            '2': ['2,6', '3,6', '6,6', '7,6']
        }
        //console.log(this.startingTiles[this.mapId])
        this.objectsOnTiles = {};
        this.itemSprites = {};

        for (let i = 0; i < this.itemsOnTable.length; i++) { 
            
            //console.log('Placing item:', this.itemsOnTable[i], 'on tile:', this.startingTiles[this.mapId][i]);
            let loc = this.startingTiles[this.mapId][i].split(',');
            this.objectsOnTiles[this.startingTiles[this.mapId][i]] = this.itemsOnTable[i];
            this.itemSprites[this.startingTiles[this.mapId][i]] = this.add.image(parseInt(loc[0]) * 32 + 16, parseInt(loc[1]) * 32 + 16, this.itemsOnTable[i]);
            this.itemSprites[this.startingTiles[this.mapId][i]].setScale(1);
            this.itemSprites[this.startingTiles[this.mapId][i]].setDepth(this.itemSprites[this.startingTiles[this.mapId][i]].y);
        }
        //console.log('Objects on tiles:', this.objectsOnTiles);

        // If the scene_str
        if (this.sceneStr.includes('div')) {
            // Put barrels between the two tables
            let locx = 4;
            let locy = 4;

            let offsety = 0.6;
            // First barrel
            this.add.image(locx * 32 + 20, (locy + offsety) * 32, 'bigbarrel_topleft').setDepth((locy - 1 + offsety) * 32);
            this.add.image((locx + 1) * 32 + 20, (locy + offsety) * 32, 'bigbarrel_topright').setDepth((locy - 1 + offsety) * 32);
            this.add.image(locx * 32 + 20, (locy + 1 + offsety) * 32, 'bigbarrel_bottomleft').setDepth((locy + offsety) * 32);
            this.add.image((locx + 1) * 32 + 20, (locy + 1 + offsety) * 32, 'bigbarrel_bottomright').setDepth((locy + offsety) * 32);
            // Second barrel
            this.add.image(locx * 32 + 10, (locy + 1 + offsety) * 32, 'bigbarrel_topleft').setDepth((locy + 1 + offsety) * 32 + 32);
            this.add.image((locx + 1) * 32 + 10, (locy + 1 + offsety) * 32, 'bigbarrel_topright').setDepth((locy + 1 + offsety) * 32 + 32);
            this.add.image(locx * 32 + 10, (locy + 2 + offsety) * 32, 'bigbarrel_bottomleft').setDepth((locy + 2 + offsety) * 32 + 32);
            this.add.image((locx + 1) * 32 + 10, (locy + 2 + offsety) * 32, 'bigbarrel_bottomright').setDepth((locy + 2 + offsety) * 32 + 32);
            // Third barrel
            this.add.image(locx * 32 + 16, (locy + 2 + offsety) * 32, 'bigbarrel_topleft').setDepth((locy + 3 + offsety) * 32 + 32);
            this.add.image((locx + 1) * 32 + 16, (locy + 2 + offsety) * 32, 'bigbarrel_topright').setDepth((locy + 3 + offsety) * 32 + 32);
            this.add.image(locx * 32 + 16, (locy + 3 + offsety) * 32, 'bigbarrel_bottomleft').setDepth((locy + 4 + offsety) * 32 + 32);
            this.add.image((locx + 1) * 32 + 16, (locy + 3 + offsety) * 32, 'bigbarrel_bottomright').setDepth((locy + 4 + offsety) * 32 + 32);
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
                        this.itemSprites[tileKey].destroy();
                        delete this.itemSprites[tileKey];
                        delete this.objectsOnTiles[tileKey];
                    } else {
                        this.itemSprites[tileKey].destroy();
                        this.objectsOnTiles[tileKey] = `bread${numBreadsPost}`;
                        const sprite = this.itemSprites[tileKey] = this.add.image(facingTile.x * 32 + 16, facingTile.y * 32 + 16, `bread${numBreadsPost}`);
                        sprite.setScale(1);
                    }
                    //console.log(characterId, item, numBreads, numBreadsPost)

                    // Count number of breads in inventory

                    const breadsInInventory = character.inventory.filter(item => item.includes('bread'))
                    //console.log('Number of breads in inventory:', breadsInInventory)
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
                        //this.itemSprites[tileKey].destroy();
                        let sprite = this.itemSprites[tileKey];

                        this.tweens.add({
                            targets: sprite,
                            x: facingTile.x * 32 + 16,
                            y: facingTile.y * 32 - 16,
                            duration: 1500, // milliseconds
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