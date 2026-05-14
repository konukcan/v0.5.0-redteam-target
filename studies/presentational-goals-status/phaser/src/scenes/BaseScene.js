import {handleCreateTilesData, handleAnimateTiles} from "../utils/handleAnimations.js";
import GIFCapture from "../utils/GIFCapture.js";

export default class BaseScene extends Phaser.Scene {
    constructor(config) {
        //console.log('BaseScene constructor', config);
        super(config);

        // Get trial speciifications
        this.trialConfig = trialPhaserConfig || {};
        console.log('trialConfig', this.trialConfig);

        // End scene parameters
        this.fadeOut = false;
        this.fadeStarted = false; // To prevent multiple fades

        if (this.trialConfig) {
            if (this.trialConfig.framework == 'otree') {
                this.otree = true;
            } else if (this.trialConfig.framework == 'jspsych') {
                this.jspsych = true;
            }  
        } else {
            this.otree = false;
            this.jspsych = false;
        }
        this.inAnimation = false;
        this.sceneConfig = null;
        this.characters = new Map(); // Map to store all characters
        this.playerCharacterId = null; // ID of the character controlled by player
        this.maxInventorySize = 2;
        this.autoCharacter = null; // Automated character for bread crafting
        this.interactableObjects = {}
        this.itemSprites = {}; 
        this.objectsOnTiles = {};

        this.characterColors = ['red', 'green', 'yellow', 'purple', 'blue', 'purple', 'pink'];
        //this.characterColors = ['yellow', 'green', 'red', 'purple', 'blue', 'purple', 'pink'];
        if (this.trialConfig.characterColors) {
            this.characterColors = this.trialConfig.characterColors;
        }
        this.numCharacters;
        this.numAutoCharacters;

        // Debug
        this.debug = false;

        // Set colors for characters
        //this.currentCharacterColors = Phaser.Math.RND.shuffle(this.characterColors);
        this.currentCharacterColors = this.characterColors;

        this.autoCharacters = [];
        
        //this.autoCharacterChoices = ['testgesture', 'testfail']

        this.stackableItems = ['bread', 'apple', 'orange', 'pear'];

    }

    createCharacter(id, spriteKey, x, y) {
        const character = {
            id: id,
            sprite: this.add.sprite(x, y, spriteKey, 26),
            inventory: [],
            lastDirection: 'down',
            isInteracting: false
        };
        character.sprite.setScale(1);
        this.physics.add.existing(character.sprite);
        character.sprite.body.setCollideWorldBounds(true);
        this.characters.set(id, character);
        return character;
    }

    init(sceneConfig) {
        this.sceneConfig = sceneConfig;
    }

    preload() {

        const baseURL = this.trialConfig.baseURL? `${this.trialConfig.baseURL}/phaser/` :'phaser/';
        // Assuming your assets are in yourapp/static/yourapp/assets/
        this.load.setBaseURL(baseURL);
        //this.load.setBaseURL(baseURL);
        


        // Load all tilesets
        this.load.image('bread-pastry', 'assets/tilesets/bread-pastry.png');
        this.load.image('blacksmith-smelter', 'assets/tilesets/blacksmith-smelter.png');
        this.load.image('tavern-deco', 'assets/tilesets/tavern-deco.png');
        this.load.image('tavern-furniture', 'assets/tilesets/tavern-furniture.png');
        this.load.image('container', 'assets/tilesets/container.png');
        this.load.image('victorian-market', 'assets/tilesets/victorian-market.png');
        this.load.image('victorian-garden', 'assets/tilesets/victorian-garden.png');
        this.load.image('victorian-streets', 'assets/tilesets/victorian-streets.png');
        this.load.image('terrain-v7', 'assets/tilesets/terrain-v7.png');
        this.load.image('barn', 'assets/tilesets/barn.png');
        this.load.image('tavern-cooking', 'assets/tilesets/tavern-cooking.png');
        

        // Assign colors to characters, randomly without replacement
        this.characterToColor = {};
        const colors = this.currentCharacterColors
        for (let i = 0; i < this.numCharacters; i++) {
            // Assign color to character
            this.characterToColor[`char${i}`] = this.currentCharacterColors[i];

            // Load spritesheets
            //console.log('loading character', i, this.currentCharacterColors[i])
            this.load.spritesheet(`character_${i}_neutral`, `assets/characters/${colors[i]}_neutral.png`, {
                frameWidth: 64,
                frameHeight: 64
            });
            this.load.spritesheet(`character_${i}_happy`, `assets/characters/${colors[i]}_happy.png`, {
                frameWidth: 64,
                frameHeight: 64
            });
            this.load.spritesheet(`character_${i}_happyalt`, `assets/characters/${colors[i]}_happyalt.png`, {
                frameWidth: 64,
                frameHeight: 64
            });
            this.load.spritesheet(`character_${i}_sad`, `assets/characters/${colors[i]}_sad.png`, {
                frameWidth: 64,
                frameHeight: 64
            });
            this.load.spritesheet(`character_${i}_right`, `assets/characters/${colors[i]}_right.png`, {
                frameWidth: 64,
                frameHeight: 64
            });
            this.load.spritesheet(`character_${i}_left`, `assets/characters/${colors[i]}_left.png`, {
                frameWidth: 64,
                frameHeight: 64
            });
        }

        // Color cues
        this.load.image('bottle_green', 'assets/objects/bottle_green.png');
        this.load.image('bottle_red', 'assets/objects/bottle_red.png');
        this.load.image('bottle_blue', 'assets/objects/bottle_blue.png');
        this.load.image('bottle_yellow', 'assets/objects/bottle_yellow.png');
        this.load.image('bottle_purple', 'assets/objects/bottle_purple.png');
        this.load.image('bottle_pink', 'assets/objects/bottle_pink.png');

        
    }

    shutdown() {
        if (this.gifCapture) {
            this.gifCapture.finishCapture();
        }
        super.shutdown();
    }

    create() {
        if (!this.sceneConfig) {
            console.error('No scene configuration provided!');
            return;
        }

        // Load the tilemap
        const map = this.add.tilemap('map');
        this.map = map;

        // Add all tilesets
        const tilesets = [
            map.addTilesetImage('bread-pastry', 'bread-pastry'),
            map.addTilesetImage('blacksmith-smelter', 'blacksmith-smelter'),
            map.addTilesetImage('tavern-deco', 'tavern-deco'),
            map.addTilesetImage('tavern-furniture', 'tavern-furniture'),
            map.addTilesetImage('container', 'container'),
            map.addTilesetImage('victorian-market', 'victorian-market'),
            map.addTilesetImage('victorian-garden', 'victorian-garden'),
            map.addTilesetImage('victorian-streets', 'victorian-streets'),
            map.addTilesetImage('terrain-v7', 'terrain-v7'),
            map.addTilesetImage('barn', 'barn'),
            map.addTilesetImage('tavern-cooking', 'tavern-cooking')
        ].filter(tileset => tileset !== null);

        // Create layers
        const layers = map.layers.map(layer => {
            const createdLayer = map.createLayer(layer.name, tilesets);
            createdLayer.setCollisionByProperty({ collides: true });
            return createdLayer;
        });

    
        // Create characters
        const mapHeight = map.heightInPixels;
        const mapWidth = map.widthInPixels;
        
        for (let i = 0; i < this.numCharacters; i++) {
            const startingX = this.startingPositions[i].x * 32;
            const startingY = this.startingPositions[i].y * 32;
            const char = this.createCharacter(`char${i}`, `character_${i}_neutral`, startingX, startingY);
        }

        for (let i = 0; i < this.numAutoCharacters; i++) {
            let exitPos;
            if (this.exitPositions) {
                exitPos = this.exitPositions[i];
            }
            this.autoCharacters.push(new this.AutoCharacter(this, `char${i}`, this.tableSides[i], this.autoCharacterChoices[i], exitPos, this.debug));
            //console.log('auto character', i, this.autoCharacters[i].character.sprite.texture.key);
        }

        // Place color cues
        if (this.colorCues) {
            for (const autoChar of this.autoCharacters) {
                const color = this.characterToColor[autoChar.characterId];
                //console.log('color', color, this.colorCuesPos, autoChar.tableSide);
                const pos = this.colorCuesPos[autoChar.tableSide];
                const sprite = this.add.image(pos.x * 32 + 16, pos.y * 32 + 16, `bottle_${color}`);
                sprite.setScale(1);
            }
        }
        // Create animations for all characters
        this.createCharacterAnimations();

        // Setup keyboard controls (skipped if the game was created with the
        // keyboard plugin disabled — e.g. for the autonomous rewatch player,
        // where keyboard input would interfere with surrounding form fields).
        if (this.input.keyboard) {
            this.cursors = this.input.keyboard.addKeys({
                up: Phaser.Input.Keyboard.KeyCodes.W,
                down: Phaser.Input.Keyboard.KeyCodes.S,
                left: Phaser.Input.Keyboard.KeyCodes.A,
                right: Phaser.Input.Keyboard.KeyCodes.D,
                space: Phaser.Input.Keyboard.KeyCodes.SPACE
            });
        } else {
            // Provide stub keys so update() polling does not crash.
            var stubKey = { isDown: false };
            this.cursors = { up: stubKey, down: stubKey, left: stubKey, right: stubKey, space: stubKey };
        }

        // Add physics and colliders for all characters

        // Make sure that characters which are higher up are behind characters which are lower down

        // Add physics colliders for all characters and layers
        this.characters.forEach((character, id) => {
            layers.forEach(layer => {
            this.physics.add.collider(character.sprite, layer);
            });
        });

        // Ensure characters are rendered in order based on their y position
        this.children.each(child => {
            if (child.type === 'Sprite') {
            child.setDepth(child.y);
            }
        });

        // Create inventory display background (only for player)
        if (this.playerCharacterId) {
            this.inventoryBg = this.add.graphics();
            this.inventoryBg.fillStyle(0x000000, 0.5);
            this.inventoryBg.fillRect(0, 9 * 32, 64, 32);
        }

        // Create green shading for interactable tiles
        if (this.debug) {
            this.interactableTiles = this.add.graphics();
            this.interactableTiles.fillStyle(0x00ff00, 0.3);
            Object.values(this.interactableObjects).flat().forEach(pos => {
                this.interactableTiles.fillRect(pos.x * 32, pos.y * 32, 32, 32);
            });
        }
    
        // Animate tiles
        handleCreateTilesData(this, map);

        // Fade in
        this.cameras.main.fadeIn(1000);

        // Add GIF
        this.time.delayedCall(0, () => {
            if (this.trialConfig.gif == 'manual') {
                // Add GIF capture
                this.gifCapture = new GIFCapture(this);

                if (this.input.keyboard) {
                    this.input.keyboard.on('keydown-G', () => {
                        // Start recording a 3-second GIF at 30fps
                        this.gifCapture.start(28000, 15);
                    });

                    this.input.keyboard.on('keydown-S', () => {
                        // Capture a single screenshot
                        this.gifCapture.captureScreenshot();
                    });
                }
            } else if (this.trialConfig.gif == 'auto') {
                // Add GIF capture
                this.gifCapture = new GIFCapture(this);

                // Start capture
                this.gifCapture.start(15, 0); // 0 = infinite duration
            }
        })
    }

    addToInventory(characterId, item) {
        const character = this.characters.get(characterId);
        if (character && character.inventory.length < this.maxInventorySize) {
            character.inventory.push(item);
            if (characterId === this.playerCharacterId) {
                this.updateInventoryDisplay();
            }
            return true;
        }
        return false;
    }

    removeFromInventory(characterId) {
        const character = this.characters.get(characterId);
        if (character && character.inventory.length > 0) {
            const item = character.inventory.shift();
            if (characterId === this.playerCharacterId) {
                this.updateInventoryDisplay();
            }
            return item;
        }
        return null;
    }

    updateInventoryDisplay() {
        // Only show inventory for player character
        const playerChar = this.characters.get(this.playerCharacterId);
        if (!playerChar) return;

        // Clear existing sprites
        if (this.inventorySprites) {
            this.inventorySprites.forEach(sprite => sprite.destroy());
        }
        this.inventorySprites = [];

        // Add new sprites
        playerChar.inventory.forEach((item, index) => {
            const sprite = this.add.image(index * 32, 9 * 32, item);
            sprite.setOrigin(0, 0);
            sprite.setScale(1);
            this.inventorySprites.push(sprite);
        });
    }

    getFacingTile(characterId) {
        const character = this.characters.get(characterId);
        if (!character) return null;
        
        const charX = Math.floor(character.sprite.x / 32);
        const charY = Math.round(character.sprite.y / 32);
        let tileX = charX;
        let tileY = charY;

        switch (character.lastDirection) {
            case 'up':
                tileY--;
                break;
            case 'down':
                tileY++;
                break;
            case 'left':
                tileX--;
                break;
            case 'right':
                tileX++;
                break;
        }

        return { x: tileX, y: tileY };
    }

    isInteractableTile(x, y) {
        return Object.values(this.interactableObjects).some(tiles =>
            tiles.some(tile => tile.x === x && tile.y === y)
        );
    }

    getTileType(x, y) {
        for (const [type, tiles] of Object.entries(this.interactableObjects)) {
            if (tiles.some(tile => tile.x === x && tile.y === y)) {
                return type;
            }
        }
        return null;
    }

    getAdjacentTableTiles(x, y) {
        const adjacentTiles = [
            {x: x-1, y: y}, // left
            {x: x+1, y: y}, // right
            {x: x, y: y-1}, // up
            {x: x, y: y+1}  // down
        ];
        return adjacentTiles.filter(tile => {
            const tileType = this.getTileType(tile.x, tile.y);
            return tileType && tileType.startsWith('table');
        });
    }

    findClosestEmptySlot(x, y) {
        const allTableTiles = [...this.interactableObjects.table1, ...this.interactableObjects.table2];
        let closestSlot = null;
        let minDistance = Infinity;

        for (const tile of allTableTiles) {
            const tileKey = `${tile.x},${tile.y}`;
            if (!this.objectsOnTiles[tileKey]) {
                const distance = Math.abs(tile.x - x) + Math.abs(tile.y - y);
                if (distance < minDistance) {
                    minDistance = distance;
                    closestSlot = tile;
                }
            }
        }
        return closestSlot;
    }

    findClosestItemPlaced(x, y, item) {
        const allTableTiles = [...this.interactableObjects.table1, ...this.interactableObjects.table2];
        let closestSlot = null;
        let minDistance = Infinity;

        let baseItem;
        if (this.checkStackable(item)) {
            baseItem = this.checkStackable(item)
        } else {
            baseItem = item;
        }

        for (const tile of allTableTiles) {
            const tileKey = `${tile.x},${tile.y}`;
            if (this.objectsOnTiles[tileKey] === item) {
                const distance = Math.abs(tile.x - x) + Math.abs(tile.y - y);
                if (distance < minDistance) {
                    minDistance = distance;
                    closestSlot = tile;
                }
            }
        }
        return closestSlot;
    }

    checkStackable(item) {
        for (const stackableItem of this.stackableItems) {
            if (item.includes(stackableItem)) {
                return stackableItem;
            }
        }
        return false;
    }

    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
      }

    createCharacterAnimations() {
        // Create animations for each character
        for (let i = 0; i < this.numCharacters; i++) {
            const spriteKeyNeutral = `character_${i}_neutral`;
            const spriteKeyHappy = `character_${i}_happy`;
            const spriteKeyHappyAlt = `character_${i}_happyalt`;
            const spriteKeySad = `character_${i}_sad`;
            const spriteKeyRight = `character_${i}_right`;
            const spriteKeyLeft = `character_${i}_left`;

            const moods = ['neutral', 'happy', 'happyalt'];
            const directions = ['up', 'down', 'left', 'right'];


            for (const mood of moods) {
                const spriteKey = `character_${i}_${mood}`;
                //console.log('creating animations for', spriteKey);

                // Walking animations
                this.anims.create({
                    key: `walk-down-${mood}-${i}`,
                    frames: this.anims.generateFrameNumbers(spriteKey, { start: 131, end: 138 }),
                    frameRate: 8,
                    repeat: -1
                });

                this.anims.create({
                    key: `walk-left-${mood}-${i}`,
                    frames: this.anims.generateFrameNumbers(spriteKey, { start: 118, end: 125 }),
                    frameRate: 8,
                    repeat: -1
                });

                this.anims.create({
                    key: `walk-right-${mood}-${i}`,
                    frames: this.anims.generateFrameNumbers(spriteKey, { start: 144, end: 151 }),
                    frameRate: 8,
                    repeat: -1
                });

                this.anims.create({
                    key: `walk-up-${mood}-${i}`,
                    frames: this.anims.generateFrameNumbers(spriteKey, { start: 105, end: 112 }),
                    frameRate: 8,
                    repeat: -1
                });

                // Idle animations
                this.anims.create({
                    key: `idle-up-${mood}-${i}`,
                    frames: [{ key: spriteKey, frame: 0 }, { key: spriteKey, frame: 1 }],
                    frameRate: 2
                });

                
                this.anims.create({
                    key: `idle-left-${mood}-${i}`,
                    frames: [{ key: spriteKey, frame: 13 }, { key: spriteKey, frame: 14 }],
                    frameRate: 2
                });

                this.anims.create({
                    key: `idle-right-${mood}-${i}`,
                    frames: [{ key: spriteKey, frame: 39 }, { key: spriteKey, frame: 40 }],
                    frameRate: 2
                });

                this.anims.create({
                    key: `idle-down-${mood}-${i}`,
                    frames: [{ key: spriteKey, frame: 26 }, { key: spriteKey, frame: 27 }],
                    frameRate: 2
                });

                // INTERACTIONS
                // Interaction animations
                this.anims.create({
                    key: `interact-up-${mood}-${i}`,
                    frames: [{ key: spriteKey, frame: 156 }, { key: spriteKey, frame: 157 }, { key: spriteKey, frame: 159 }, { key: spriteKey, frame: 157 }],
                    frameRate: 5
                });

                this.anims.create({
                    key: `interact-left-${mood}-${i}`,
                    frames: [{ key: spriteKey, frame: 169 }, { key: spriteKey, frame: 170 }, { key: spriteKey, frame: 172 }, { key: spriteKey, frame: 170 }],
                    frameRate: 5
                });

                this.anims.create({
                    key: `interact-down-${mood}-${i}`,
                    frames: [{ key: spriteKey, frame: 182 }, { key: spriteKey, frame: 183 }, { key: spriteKey, frame: 185 }, { key: spriteKey, frame: 183 }],
                    frameRate: 5
                });

                this.anims.create({
                    key: `interact-right-${mood}-${i}`,
                    frames: [{ key: spriteKey, frame: 195 }, { key: spriteKey, frame: 196 }, { key: spriteKey, frame: 198 }, { key: spriteKey, frame: 196 }],
                    frameRate: 5
                });

                // Bake
                this.anims.create({
                    key: `bake-up-${mood}-${i}`,
                    frames: this.anims.generateFrameNumbers(spriteKey, { start: 52, end: 59 }),
                    frameRate: 8
                });

                // Make batter
                this.anims.create({
                    key: `make_batter-down-${mood}-${i}`,
                    frames: [{ key: spriteKey, frame: 26 }, { key: spriteKey, frame: 27 }, { key: spriteKey, frame: 28 }, { key: spriteKey, frame: 27 }, { key: spriteKey, frame: 28 }, { key: spriteKey, frame: 27 }],
                    frameRate: 7
                });

                // Look around animations
                this.anims.create({
                    key: `lookaround-down-${mood}-${i}`,
                    frames: [{ key: spriteKey, frame: 26 }, { key: spriteKey, frame: 13 }, { key: spriteKey, frame: 39 }],
                    frameRate: 2
                });

                this.anims.create({
                    key: `lookaround-right-${mood}-${i}`,
                    frames: [{ key: spriteKey, frame: 39 }, { key: spriteKey, frame: 26 }, { key: spriteKey, frame: 0 }],
                    frameRate: 2
                });

                this.anims.create({
                    key: `lookaround-left-${mood}-${i}`,
                    frames: [{ key: spriteKey, frame: 13 }, { key: spriteKey, frame: 26 }, { key: spriteKey, frame: 0 }],
                    frameRate: 2
                });

                this.anims.create({
                    key: `lookaround-up-${mood}-${i}`,
                    frames: [{ key: spriteKey, frame: 0 }, { key: spriteKey, frame: 13 }, { key: spriteKey, frame: 39 }],
                    frameRate: 2
                });

                // Say hi
                this.anims.create({
                    key: `say_hi-up-${mood}-${i}`,
                    frames: this.anims.generateFrameNumbers(spriteKey, { start: 156, end: 161 }),
                    frameRate: 5
                });

                this.anims.create({
                    key: `say_hi-left-${mood}-${i}`,
                    frames: this.anims.generateFrameNumbers(spriteKey, { start: 171, end: 174 }),
                    frameRate: 5
                });

                this.anims.create({
                    key: `say_hi-down-${mood}-${i}`,
                    frames: this.anims.generateFrameNumbers(spriteKey, { start: 184, end: 187 }),
                    frameRate: 5
                });

                this.anims.create({
                    key: `say_hi-right-${mood}-${i}`,
                    frames: this.anims.generateFrameNumbers(spriteKey, { start: 197, end: 200 }),
                    frameRate: 5
                });

                // Look left/right animations
                // Down 26 - 13 - 26 - 26 (look left) - 26
                this.anims.create({
                    key: `lookleft-down-${mood}-${i}`,
                    //frames: [{ key: spriteKey, frame: 26 }, { key: spriteKey, frame: 13 }, { key: spriteKey, frame: 26 }, { key: spriteKeyRight, frame: 26 }, { key: spriteKey, frame: 26 }],
                    frames: [{ key: spriteKey, frame: 26 }, { key: spriteKeyRight, frame: 26 }, { key: spriteKeyRight, frame: 26 }, { key: spriteKey, frame: 26 }, { key: spriteKey, frame: 26 }, { key: spriteKey, frame: 13 }],
                    frameRate: 2
                });

                this.anims.create({
                    key: `lookright-down-${mood}-${i}`,
                    frames: [{ key: spriteKey, frame: 26 }, { key: spriteKey, frame: 39 }, { key: spriteKey, frame: 26 }, { key: spriteKeyLeft, frame: 26 }, { key: spriteKey, frame: 26 }],
                    frameRate: 2
                });
            }
        }
    }

    update(time, delta) {
        const speed = 100;
        let action = false;

        // Animate tiles
        handleAnimateTiles(this, delta * 2);

        //console.log('other states', this.otherStates)
        // Update auto characters
        //console.log('before social information', this.socialInformation, this.socialInformation.every( (val, i, arr) => val === 'stop' ))
        for (const autoChar of this.autoCharacters) {
        
            // Get list of state for others removing current character's idx from the list
            const idx = parseInt(autoChar.characterId.replace('char', ''))
            autoChar.update(this.socialInformation[idx]);
            if ((autoChar.state == 'wait_for_other' && !autoChar.character.isInteracting) || autoChar.state == 'idle' || autoChar.state == 'finished' || autoChar.state == 'exited') {
                this.socialInformation[idx] = 'ready';
            } else {
                this.socialInformation[idx] = 'go';
            }
            //console.log('auto character', idx, autoChar.state, this.socialInformation);

            if (autoChar.state == 'finished' || autoChar.state == 'exited' || autoChar.state == 'idle') {
                this.charactersFinished[idx] = true;
            } else {
                this.charactersFinished[idx] = false;
            }
        }

        // Update states of other characters
        //console.log('after social information', this.socialInformation, this.socialInformation.every( (val, i, arr) => val === 'stop' ))
        if (this.socialInformation.every( (val, i, arr) => val === 'ready' )) {
            //console.log('all characters stopped')
            this.socialInformation = new Array(this.numAutoCharacters).fill('go');
        } 

        // Finished
        if (this.charactersFinished.every( (val, i, arr) => val === true )) {
            // Make sure we only trigger the fade once
            if (!this.fadeStarted) {
                this.fadeStarted = true;

                // Make sure camera manager exists
                if (this.cameras && this.cameras.main && this.fadeOut) {
                    // Force alpha to 1 before starting fade
                    this.cameras.main.alpha = 1;

                    // Add a small delay before fade starts
                    this.time.delayedCall(2000, () => {
                        this.cameras.main.fadeOut(1000);

                        this.cameras.main.once('camerafadeoutcomplete', () => {
                            this.scene.start('EndScene');
                            
                            // If GIF capture is active, finish it
                            if (this.gifCapture && this.gifCapture.recording) {
                                this.gifCapture.finishCapture();
                            }
                            // If in otree, submit the form
                            if (this.otree) {
                                document.querySelector('form').submit()
                            } else if (this.jspsych) {
                                // If jspsych, check end trial condition
                                if (this.trialConfig.endTrialCondition == 'button') {
                                    // Enable buttons
                                    var btns2 = document.querySelectorAll("#jspsych-html-button-response-btngroup button");
                                    for (var i2 = 0; i2 < btns2.length; i2++) {
                                      btns2[i2].removeAttribute("disabled");
                                    }
                                } else if (this.trialConfig.endTrialCondition == 'callback') {
                                    if (typeof this.trialConfig.onComplete === 'function') {
                                        this.trialConfig.onComplete();
                                    }
                                } else if (this.trialConfig.endTrialCondition == 'end') {
                                    // End trial
                                    jsPsych.finishTrial();
                                }
                            }
                        });
                    });
                } else {
                    //console.error('Camera not available');
                    // Fallback if camera isn't available
                    this.time.delayedCall(1000, () => {
                        //this.scene.start('EndScene');
                        // If GIF capture is active, finish it
                        if (this.gifCapture && this.gifCapture.recording) {
                            this.gifCapture.finishCapture();
                        }
                        // If in otree, submit the form
                        if (this.trialConfig.framework == 'otree') {
                            document.querySelector('form').submit()
                        } else if (this.trialConfig.framework == 'jspsych') {
                            // If jspsych, check end trial condition
                            if (this.trialConfig.endTrialCondition == 'button') {
                                // Enable buttons
                                var btns2 = document.querySelectorAll("#jspsych-html-button-response-btngroup button");
                                for (var i2 = 0; i2 < btns2.length; i2++) {
                                  btns2[i2].removeAttribute("disabled");
                                }
                            } else if (this.trialConfig.endTrialCondition == 'callback') {
                                if (typeof this.trialConfig.onComplete === 'function') {
                                    this.trialConfig.onComplete();
                                }
                            } else if (this.trialConfig.endTrialCondition == 'end') {
                                // End trial
                                jsPsych.finishTrial();
                            }
                        }
                    });
                }
            }
        }

        // Get player character
        const playerChar = this.characters.get(this.playerCharacterId);
        if (!playerChar) return;

        // Get character number from sprite key
        const charNum = parseInt(playerChar.id.replace('char', ''));
        
        // Stop any previous movement
        playerChar.sprite.body.setVelocity(0);

        // Handle movement only if not interacting
        if (!playerChar.isInteracting) {
            let moving = false;
            let currentAnim = '';

            if (this.cursors.left.isDown) {
                playerChar.sprite.body.setVelocityX(-speed);
                currentAnim = `walk-left-${charNum}`;
                moving = true;
                playerChar.lastDirection = 'left';
            } else if (this.cursors.right.isDown) {
                playerChar.sprite.body.setVelocityX(speed);
                currentAnim = `walk-right-${charNum}`;
                moving = true;
                playerChar.lastDirection = 'right';
            }

            if (this.cursors.up.isDown) {
                playerChar.sprite.body.setVelocityY(-speed);
                currentAnim = `walk-up-${charNum}`;
                moving = true;
                playerChar.lastDirection = 'up';
            } else if (this.cursors.down.isDown) {
                playerChar.sprite.body.setVelocityY(speed);
                currentAnim = `walk-down-${charNum}`;
                moving = true;
                playerChar.lastDirection = 'down';
            }

            // Play movement or idle animation
            if (moving) {
                playerChar.sprite.anims.play(currentAnim, true);
            } else {
                playerChar.sprite.anims.play(`idle-${playerChar.lastDirection}-${charNum}`, true);
            }
        }

        // Handle spacebar press for player character
        if (Phaser.Input.Keyboard.JustDown(this.cursors.space)) {
            action = this.handleInteraction(this.playerCharacterId);
            if (action !== false) {
                //console.log(action);
                playerChar.isInteracting = true;
                playerChar.sprite.anims.play(`${action}-${playerChar.lastDirection}-${charNum}`, true);
                //console.log(action, playerChar.lastDirection, charNum);
                playerChar.sprite.once('animationcomplete', () => {
                    playerChar.isInteracting = false;
                });
            }
        }
    }
}