
export class AutoCharacter {
    constructor(scene, characterId, tableSide, choice, exit, debug=false) {
        this.scene = scene;
        this.characterId = characterId;
        this.tableSide = tableSide; // 'left' or 'right'
        this.character = scene.characters.get(characterId);
        this.state = 'idle';
        this.targetX = null;
        this.targetY = null;
        this.speed = 100;
        this.charNum = parseInt(this.character.sprite.texture.key.split('_')[1]);
        this.path = [];
        this.currentPathIndex = 0;
        this.gridSize = 32; // Size of each grid cell in pixels
        this.action = false;
        this.debug = debug;
        this.moveTarget = null; // Target location for movement
        this.interactTarget = null; // Target for interaction after movement
        this.attempts = 0;
        this.maxAttempts = 30;

        // Set exit position for characters
        this.exit = exit;
        //console.log('Exit:', this.exit);

        // Mood of the character
        this.mood = 'neutral';

        // Social information
        this.waitTime = 0;

        // Fixed policy and inventory for initial implementation
        this.choice = choice;
        this.character.inventory = []
        if (choice == 'apple') {
            if (this.scene.sceneStr.includes('div')) {
                this.policy = [
                    'wait', 'wait',
                    `take_apple`, 'wait_for_other', 'wait',
                    'finish'
                ];
            } else {
                this.policy = [
                    'look_around', 'say_hi',
                    `take_apple`, 'wait_for_other', 'wait',
                    'finish'
                ];
            }
        } else if (choice == 'orange') {
            if (this.scene.sceneStr.includes('div')) {
                this.policy = [
                    'wait', 'wait',
                    `take_orange`, 'wait_for_other', 'wait',
                    'finish'
                ];
            } else {
                this.policy = [
                    'look_around', 'say_hi',
                    `take_orange`, 'wait_for_other', 'wait',
                    'finish'
                ];
            }
        } else if (choice == 'banana') {
            this.policy = [
                'look_around',
                `take_banana`, 'wait_for_other', 'wait',
                'finish'
            ];

        } else if (choice == 'apple_after') {
            this.policy = [
                'wait', 'wait_for_other', 'wait', 'look_around',
                `take_appple`, 'wait',
                'finish'
            ]

        } else if (choice == 'orange_after') {
            this.policy = [
                'wait', 'wait_for_other', 'wait', 'look_around',
                `take_orange`, 'wait',
                'finish'
            ]

        } else if (choice == 'banana_after') {
            this.policy = [
                'wait', 'wait_for_other', 'wait', 'look_around',
                `take_banana`, 'wait',
                'finish'
            ]
        } else if (choice == 'sitting') {
            this.policy = [
                'wait', 'say_hi', 'wait_for_other', 'look_around', 'sitting',
            ]
        }

        this.metaStates = {
            // Place actions - each requires checking inventory and finding empty slot
            'place_apple': ['check_can_place_apple', 'moving_to_table', 'interact_with_table'],
            'place_orange': ['check_can_place_orange', 'moving_to_table', 'interact_with_table'],
            'place_banana': ['check_can_place_banana', 'moving_to_table', 'interact_with_table'],

            // Give actions - each requires checking and finding empty slot on the other agent's table
            'give_apple': ['check_can_give_apple', 'moving_to_table', 'interact_with_table', 'wait'],
            'give_orange': ['check_can_give_orange', 'moving_to_table', 'interact_with_table', 'wait'],
            'give_banana': ['check_can_give_banana', 'moving_to_table', 'interact_with_table', 'wait'],

            // Take actions - each requires finding item on table
            'take_apple': ['check_can_take_apple', 'wait', 'moving_to_table', 'interact_with_table', 'wait'],
            'take_orange': ['check_can_take_orange', 'wait', 'moving_to_table', 'interact_with_table', 'wait'],
            'take_banana': ['check_can_take_banana', 'wait', 'moving_to_table', 'interact_with_table', 'wait'],

            // Steal actions - each requires finding item on table
            'steal_apple': ['check_can_steal_apple', 'moving_to_table', 'interact_with_table'],
            'steal_orange': ['check_can_steal_orange', 'moving_to_table', 'interact_with_table'],
            'steal_banana': ['check_can_steal_banana', 'moving_to_table', 'interact_with_table'],

            // Wait actions
            'wait_for_other': ['wait_for_other'], // Only moves to next state when all characters are ready
            'wait': ['wait'], // Wait for a random amount of time

            // Cheeky action
            'cheeky': ['check_special_applies', 'moving_to_table', 'interact_with_table', 'moving_to_table'],
            'gesture': ['check_special_applies', 'moving_to_table', 'interact_with_table', 'moving_to_table'],

            // Finish
            'finish': ['moving_to_table', 'finished'],

            // Exit 
            'exit': ['moving_to_table', 'exited'],
            
            // Idle and filler actions
            'look_around': ['look_around'],
            'say_hi': ['say_hi', 'filler'],
            'sitting': ['idle']
        }

        this.policyIndex = 0
        this.currentMetaState = this.policy[this.policyIndex]
        this.stateIndex = 0
        this.state = this.metaStates[this.currentMetaState][this.stateIndex]

        this.stateHistory = []
        this.policyHistory = []
        
        // Load collision grid
        this.collisionGrid = this.scene.cache.json.get('collision-grid').grid
    }

    updateMood(metaState) {
        if (metaState.includes('steal')) {
            this.mood = 'happy';
        } else if (metaState.includes('give')) {
            this.mood = 'happy';
        } else if (metaState.includes('say_hi')) {
            this.mood = 'happy';
        } else {
            this.mood = 'neutral';
        }
    }

    updateState(metaState=null) {
        // Append current state to history
        this.stateHistory.push(this.state)
        // Update state based on current policy
        this.attempts = 0
        this.stateIndex += 1
        if (this.stateIndex >= this.metaStates[this.currentMetaState].length) {
            // Append current policy to history
            this.policyHistory.push(this.currentMetaState)

            this.policyIndex += 1
            if (this.policyIndex >= this.policy.length) {
                //this.log(`${this.choice} policy finished \n Policy history: ${this.policyHistory} \n State history: ${this.stateHistory}`)
                //this.log(`${this.moveTarget}, ${this.interactTarget}`)
                return 'finished'
            }
            this.currentMetaState = this.policy[this.policyIndex]
            this.stateIndex = 0
            //this.log(`New metaState: ${this.currentMetaState}`)
        }

        // Update Mood
        this.updateMood(this.currentMetaState)

        // Log new state
        //this.log(`New state: ${this.metaStates[this.currentMetaState][this.stateIndex]} - New mood: ${this.mood}`)

        return this.metaStates[this.currentMetaState][this.stateIndex]
    }

    updateMetaState(policyIndex=null) {
        // Append current state to history
        this.stateHistory.push(this.state)
        // Update state based on current policy
        this.attempts = 0
        this.stateIndex = 0
        this.policyHistory.push(this.currentMetaState)

        if (policyIndex) {
            this.policyIndex = policyIndex
        } else {
            this.policyIndex += 1
        }

        if (this.policyIndex >= this.policy.length) {
            this.policyIndex = this.policy.length - 1
        }
        this.currentMetaState = this.policy[this.policyIndex]  
        this.log(`New policy: ${this.currentMetaState}`)

        // Update Mood
        this.updateMood(this.currentMetaState)

        return this.metaStates[this.currentMetaState][this.stateIndex]
    }

    update(socialInformation) {
        if (!this.collisionGrid) {
            this.log('Waiting for collision grid to load...');
            return;
        }

        if (this.debug) {
            this.debugGrid();
        }

        if (this.state == 'waiting_for_other') {
            this.waitTime += 1;
        }

        if (this.character.isInteracting) {
            //this.log(`Character is interacting - animation: ${this.action}-${this.character.lastDirection}-${this.mood}-${this.charNum}`);
            this.character.sprite.anims.play(`${this.action}-${this.character.lastDirection}-${this.mood}-${this.charNum}`, true);
            this.character.sprite.once('animationcomplete', () => {
                this.character.isInteracting = false;
                //this.state = this.updateState();
            });
            if (!this.action) {
                this.character.isInteracting = false;
            }
            return;
          
        }

        // Dx and dy for character movement
        let center; 
        let dx, dy;

        // Handle different states
        switch (this.state) {

            // Check if we can give bread
            case 'check_can_place_orange':
            case 'check_can_give_orange': 
            case 'check_can_place_apple':
            case 'check_can_give_apple': 
            case 'check_can_place_banana':
            case 'check_can_give_banana': {
                let itemType = this.state.split('_')[3]; // Get item type from state name

                //this.log(`Placing ${itemType} - inventory: ${this.character.inventory}`);
                //for (const obj of this.character.inventory) {
                //    if (obj.includes(itemType)) {
                //        itemType = obj;
                //    }
                //}

                if (!itemType) {
                    this.log(`Error: Cannot find ${itemType} to give`);
                    this.state = 'idle';
                    return;
                }
                let validSlots;
                if ((this.tableSide === 'left') && (this.scene.mapId == '2')) {
                    validSlots = [3, 4]
                } else if ((this.tableSide === 'right') && (this.scene.mapId == '2')) {
                    validSlots = [5, 6]
                } else {
                    validSlots = [3, 4, 5, 6];
                }

                let validSlot; // Need not be empty, slots with bread can be incremented

                for (let y = 0; y < this.collisionGrid.length; y++) {
                    for (let x = 0; x < this.collisionGrid[y].length; x++) {
                        if (validSlots.includes(this.collisionGrid[y][x])) {
                            // The slot on which the item will be actually be placed is always one tile below the collision grid slot
                            const slotKey = `${x},${y+2}`;
                            if (!this.scene.objectsOnTiles[slotKey]) {
                                validSlot = { x, y: y };
                            } else {
                                if (this.scene.objectsOnTiles[slotKey].includes(itemType)) {
                                    validSlot = { x, y: y };
                                }
                            }
                            if (validSlot && validSlots.indexOf(this.collisionGrid[y][x]) === 0) {
                                break;
                            }
                        }
                    }
                    if (validSlot) break
                }

                if (!validSlot) {
                    this.log(`Error: Cannot find ${itemType} slot to give`);
                    this.state = 'idle';
                    return;
                }

                this.moveTarget = validSlot;
                this.interactTarget = validSlot;
                
                this.state = this.updateState();
                break;
            }

            case 'check_can_take_apple':
            case 'check_can_take_orange': 
            case 'check_can_steal_apple':
            case 'check_can_steal_orange': 
            case 'check_can_take_banana':
            case 'check_can_steal_banana': {

                let itemType = this.state.split('_')[3]; // Get item type from state name

                // Find bread slot based on tableSide
                let validSlots;
                if ((this.tableSide === 'left') && (this.scene.mapId == '2')) {
                    validSlots = [3, 4]
                } else if ((this.tableSide === 'right') && (this.scene.mapId == '2')) {
                    validSlots = [5, 6]
                } else {
                    validSlots = [4, 5, 3, 6];
                }

                let itemSlot = null;
                
                for (let y = 0; y < this.collisionGrid.length; y++) {
                    for (let x = 0; x < this.collisionGrid[y].length; x++) {
                        if (validSlots.includes(this.collisionGrid[y][x])) {
                            // The slot on which the item will be actually be placed is always one tile below the collision grid slot
                            const slotKey = `${x},${y+2}`;
                            
                            if (this.scene.objectsOnTiles[slotKey]) {
                                if (this.scene.objectsOnTiles[slotKey].includes(itemType)) {
                                    // Update if the slot is valid but also prioritize the first valid slot
                                    if (!itemSlot) {
                                        itemSlot = { x, y: y }; // Target one tile above for 2x2 character
                                    } else if (validSlots.indexOf(this.collisionGrid[y][x]) === 0) {
                                        itemSlot = { x, y: y };
                                        break;
                                    }
                                }
                            }
                        }
                    }
                }

                if (!itemSlot) {
                    this.log(`Error: Cannot find ${itemType} to take`);
                    this.state = 'idle';
                    return;
                }
                
                this.moveTarget = itemSlot;
                this.interactTarget = itemSlot;
                console.log('Valid slot found:', this.moveTarget);
                this.state = this.updateState();
                //console.log('Check done', this.state)
                break;
            }

            case 'check_special_applies': {
                // Check if we can be cheeky
                const special = this.currentMetaState;

                let otherSlots;
                if (special === 'cheeky') {
                    otherSlots = this.tableSide === 'left' ? [5] : [4];
                } else if (special == 'gesture') {
                    otherSlots = this.tableSide === 'left' ? [4] : [5];
                }
            
                let itemSlot = null;
                let targetSlot = null;

                for (let y = 0; y < this.collisionGrid.length; y++) {
                    for (let x = 0; x < this.collisionGrid[y].length; x++) {
                        if (otherSlots.includes(this.collisionGrid[y][x])) {
                            // The slot on which the item will be actually be placed is always one tile below the collision grid slot
                            const slotKey = `${x},${y+2}`;
                            if (this.scene.objectsOnTiles[slotKey].includes('bread')) {
                                itemSlot = { x, y: y }; // Target one tile above for 2x2 character
                            }
                        } else if (this.collisionGrid[y][x] === 7) {
                            targetSlot = { x, y: y };
                        }
                    }
                    if (itemSlot && targetSlot) break;
                }

                if (!itemSlot) {
                    this.log(`Error: Cannot find ${itemType} to take`);
                    this.attempts += 1;
                    if (this.attempts > this.maxAttempts) {
                        this.log('Too many attempts, giving up');
                        this.state = 'idle';
                    }
                    return;
                }

                this.moveTarget = targetSlot;
                this.state = this.updateState();
                break;

            }

            // Move to table
            case 'moving_to_table': {
                if (this.currentMetaState == 'finish') {
                    if (this.scene.mapId == '2') {
                        this.moveTarget = null//this.tableSide === 'left' ? { x: 2, y: 4 } : { x: 6, y: 4 };
                    } else {
                        this.moveTarget = null//{ x: 3, y: 4 };
                    }
                } else if (this.currentMetaState == 'exit') {
                    this.moveTarget = this.exit;
                }

                if (!this.moveTarget) {
                    //this.log('Error: No target position for movement');
                    this.state = 'idle';
                    return;
                }

                if (!this.path || this.path.length === 0) {
                    // Start new path
                    const path = this.findPath(
                        this.character.sprite.x,
                        this.character.sprite.y,
                        this.toPixelCoords(this.moveTarget.x, this.moveTarget.y).x,
                        this.toPixelCoords(this.moveTarget.x, this.moveTarget.y).y
                    );

                    if (path.length === 0) {
                        this.log('Error: Cannot find path to target');
                        this.state = 'idle';
                        return;
                    }

                    this.path = path;
                    this.currentPathIndex = 0;
                    //this.log(`Moving to table slot (${this.moveTarget.x}, ${this.moveTarget.y}) using path: ${JSON.stringify(this.path)}`);
                }
                
                
                // Follow current path
                if (this.followPath()) {
                    // Path completed
                    this.character.lastDirection = 'down'; // Always face down for table interaction
                    this.path = null;
                    this.state = this.updateState();
                }
                break;
            }

            // Move to oven
            case 'moving_to_oven': {
                if (!this.moveTarget) {
                    this.log('Error: No target position for movement');
                    this.state = 'idle';
                    return;
                }

                if (!this.path || this.path.length === 0) {
                    // Start new path
                    const path = this.findPath(
                        this.character.sprite.x,
                        this.character.sprite.y,
                        this.toPixelCoords(this.moveTarget.x, this.moveTarget.y).x,
                        this.toPixelCoords(this.moveTarget.x, this.moveTarget.y).y
                    );

                    if (path.length === 0) {
                        this.log('Error: Cannot find path to target');
                        this.state = 'idle';
                        return;
                    }

                    this.path = path;
                    this.currentPathIndex = 0;
                    //.log(`Moving to oven slot (${this.moveTarget.x}, ${this.moveTarget.y}) using path: ${JSON.stringify(this.path)}`);
                }

                // Follow current path
                if (this.followPath()) {
                    // Path completed
                    this.character.lastDirection = 'up'; // Always face up for oven interaction
                    this.path = null;
                    this.state = this.updateState();
                }
                break;
            }

            // Interact with table
            case 'interact_with_table': {
                let specialAction;
                if (this.currentMetaState === 'cheeky') {
                    specialAction = 'cheeky';
                } else if (this.currentMetaState === 'make_batter') {
                    specialAction = 'make_batter';
                } else if (this.currentMetaState === 'gesture') {
                    specialAction = 'gesture';
                }

                let take = true;
                if (this.currentMetaState.includes('take') || this.currentMetaState.includes('steal')) {
                    take = true;
                } else if (this.currentMetaState.includes('give') || this.currentMetaState.includes('place')) {
                    take = false;
                }

                const action = this.scene.handleInteraction(this.characterId, take, this.tableSide, specialAction);

                if (action === false) {
                    this.log('Error: Table interaction failed');
                    this.state = 'idle';
                    return;
                }
                
                this.action = action;
                this.character.isInteracting = true;
                this.state = this.updateState();
                break;
            }

            // Interact with oven
            case 'interact_with_oven': {
                let take = false;
                const action = this.scene.handleInteraction(this.characterId, take, this.tableSide);
                if (action === false) {
                    this.log('Error: Oven interaction failed');
                    this.state = 'idle';
                    return;
                }
                
                this.action = action;
                this.character.isInteracting = true;
                this.state = this.updateState();
                this.log(`inventory: ${this.character.inventory}`)
                break;
            }

            case 'wait_for_other':
                //this.log(`Social information: ${socialInformation} - ${this.waitTime}`);
                if (!socialInformation) {
                    //this.log('No other character to wait for');
                    this.character.sprite.anims.play(`idle-down-${this.mood}-${this.charNum}`, true);
                    //this.state = this.updateState();
                    break
                } else if (socialInformation == 'ready') {
                    // Do nothing in idle state
                    this.character.sprite.anims.play(`idle-down-${this.mood}-${this.charNum}`, true);
                    break
                } else if (socialInformation == 'go') {
                    this.state = this.updateState();
                    this.waitTime = 0;
                    //this.log('All characters are ready to proceed')
                    break
                }

            case 'wait':
                if (!this.currentWaitTime) {
                    // Random wait time between 1-2 seconds
                    this.currentWaitTime = 30 * 2*Math.random();
                    this.log(`Waiting for ${this.currentWaitTime} frames`);
                }
                
                if (this.waitTime >= this.currentWaitTime) {
                    this.state = this.updateState();
                    this.waitTime = 0;
                    this.currentWaitTime = null
                } else {
                    this.waitTime += 1;
                    //this.log(`Waiting: ${this.waitTime}/${this.currentWaitTime}`);
                }

                this.character.sprite.anims.play(`idle-${this.character.lastDirection}-${this.mood}-${this.charNum}`, true);
                break;

            case 'look_around':
                // Idle animation towards the center of the map
                center = this.toPixelCoords(4, 4);
                dx = center.x - this.character.sprite.x;
                dy = center.y - this.character.sprite.y;
                if (Math.abs(dx) > Math.abs(dy)) {
                    this.character.lastDirection = dx > 0 ? 'right' : 'left';
                } else {
                    this.character.lastDirection = dy > 0 ? 'down' : 'up';
        
                }

                //console.log(`Looking around: ${this.character.lastDirection}`);
                this.character.sprite.anims.play(`lookaround-${this.character.lastDirection}-${this.mood}-${this.charNum}`, true);
                this.action = `lookaround`;
                this.character.isInteracting = true;
                this.state = this.updateState();
                break;

            case 'say_hi':
                // Idle animation towards the center of the map
                //center = this.toPixelCoords(4, 4);
                //dx = center.x - this.character.sprite.x;
                //dy = center.y - this.character.sprite.y;
                
                // Get position of all other characters
                let sumX = 0;
                let sumY = 0;

                for (const autoChar of this.scene.autoCharacters) {
                    sumX += autoChar.character.sprite.x;
                    sumY += autoChar.character.sprite.y;
                }
                // Calculate center of all characters
                const centerX = sumX / this.scene.autoCharacters.length;
                const centerY = sumY / this.scene.autoCharacters.length;

                // Calculate direction to center
                dx = centerX - this.character.sprite.x;
                dy = centerY - this.character.sprite.y;
                
                this.character.lastDirection = dx > 0 ? 'right' : 'left';

                //console.log(`Saying hi: ${this.character.lastDirection}`);
                this.character.sprite.anims.play(`say_hi-${this.character.lastDirection}-${this.mood}-${this.charNum}`, true);
                this.action = `say_hi`;
                this.character.isInteracting = true;
                this.state = this.updateState();
                break;

            case 'idle':
                // Do nothing in idle state
                this.character.sprite.anims.play(`idle-down-${this.mood}-${this.charNum}`, true);
                break;
            
            case 'exited':
                if (this.character.sprite.alpha <= 0) {
                    this.character.sprite.destroy();
                    return
                }
                // Make sure character is facing away from the center of the map
                dx = this.exit.x - this.character.sprite.x;
                dy = this.exit.y - this.character.sprite.y;
                if (Math.abs(dx) > Math.abs(dy)) {
                    this.character.lastDirection = dx > 0 ? 'right' : 'left';
                } else {
                    this.character.lastDirection = dy > 0 ? 'down' : 'up';
                }
                this.character.sprite.anims.play(`walk-${this.lastDirection}-${this.mood}-${this.charNum}`, true);
                this.character.sprite.body.setVelocity(0);
                // Fade out character
                this.character.sprite.alpha -= 0.05;
                break

            case 'finished':
                this.character.sprite.anims.play(`idle-down-${this.mood}-${this.charNum}`, true);
                break

            case 'paused':
                // Do nothing in paused state
                this.log(`Paused: ${this.moveTarget}, ${this.interactTarget}`);
                break;

            case 'filler':
                this.state = this.updateState();
                break;

            default:
                this.log(`Unknown state: ${this.state}`);
                this.state = 'paused';
                this.log(`Paused: ${this.moveTarget}, ${this.interactTarget}`);
                break;
        }

        return 
    }

    followPath() {
        if (!this.path || this.path.length === 0) {
            this.log('No path to follow');
            return true;
        }

        if (this.currentPathIndex >= this.path.length) {
            this.log('Reached end of path');
            // Add a special case for interacting with the table which moves the character to the center of the tile
            return true;
        }

        const currentTarget = this.toPixelCoords(
            this.path[this.currentPathIndex].x,
            this.path[this.currentPathIndex].y
        );
        
        let dx = currentTarget.x - this.character.sprite.x;
        let dy = currentTarget.y - this.character.sprite.y;
        

        if (this.metaStates[this.currentMetaState][this.stateIndex+1] === 'interact_with_table' && this.currentPathIndex === this.path.length - 1) {
            // Add a little dx and dy to make sure the character is in the center and bottom of the tile
            dx -= 16;
            dy += 4
        }

        const distance = Math.sqrt(dx * dx + dy * dy);

        // If we're close enough to the current waypoint
        if (distance < Math.sqrt(32)) {
            this.currentPathIndex++;
            if (this.currentPathIndex >= this.path.length) {
                this.character.sprite.body.setVelocity(0);
                return true;
            }
            return false;
        }

        // Move one axis at a time to avoid getting stuck
        let velocityX = 0;
        let velocityY = 0;
        let movement = '';

        // Prioritize horizontal movement to avoid getting stuck on vertical paths
        if (Math.abs(dx) > 4) {
            velocityX = dx > 0 ? this.speed : -this.speed;
            if (dx > 0) {
                this.character.lastDirection = 'right';
                this.character.sprite.anims.play(`walk-right-${this.charNum}`, true);
                movement = 'right';
            } else {
                this.character.lastDirection = 'left';
                this.character.sprite.anims.play(`walk-left-${this.charNum}`, true);
                movement = 'left';
            }
        }
        
        if (Math.abs(dy) > 4) {
            velocityY = dy > 0 ? this.speed : -this.speed;
            if (dy > 0) {
                this.character.lastDirection = 'down';
                this.character.sprite.anims.play(`walk-down-${this.charNum}`, true);
                movement = 'down';
            } else {
                this.character.lastDirection = 'up';
                this.character.sprite.anims.play(`walk-up-${this.charNum}`, true);
                movement = 'up';
            }
        }

        if (movement !== this.lastMovement) {
            this.lastMovement = movement;
        }

        this.character.sprite.body.setVelocity(velocityX, velocityY);
        return false;
    }


    followPath() {
        if (!this.path || this.path.length === 0) {
            this.log('No path to follow');
            return true;
        }

        if (this.currentPathIndex >= this.path.length) {
            this.log('Reached end of path');
            // Add a special case for interacting with the table which moves the character to the center of the tile
            return true;
        }

        const currentTarget = this.toPixelCoords(
            this.path[this.currentPathIndex].x,
            this.path[this.currentPathIndex].y
        );
        
        let dx = currentTarget.x - this.character.sprite.x;
        let dy = currentTarget.y - this.character.sprite.y;
        

        if (this.metaStates[this.currentMetaState][this.stateIndex+1] === 'interact_with_table' && this.currentPathIndex === this.path.length - 1) {
            // Add a little dx and dy to make sure the character is in the center and bottom of the tile
            dx -= 16;
            dy += 4
        }

        const distance = Math.sqrt(dx * dx + dy * dy);

        // If we're close enough to the current waypoint
        if (distance < Math.sqrt(32)) {
            this.currentPathIndex++;
            if (this.currentPathIndex >= this.path.length) {
                this.character.sprite.body.setVelocity(0);
                return true;
            }
            return false;
        }

        // Move one axis at a time to avoid getting stuck
        let velocityX = 0;
        let velocityY = 0;
        let movement = '';

        // Prioritize horizontal movement to avoid getting stuck on vertical paths
        if (Math.abs(dx) > 4) {
            velocityX = dx > 0 ? this.speed : -this.speed;
            if (dx > 0) {
                this.character.lastDirection = 'right';
                this.character.sprite.anims.play(`walk-right-${this.mood}-${this.charNum}`, true);
                movement = 'right';
            } else {
                this.character.lastDirection = 'left';
                this.character.sprite.anims.play(`walk-left-${this.mood}-${this.charNum}`, true);
                movement = 'left';
            }
        }
        
        if (Math.abs(dy) > 4) {
            velocityY = dy > 0 ? this.speed : -this.speed;
            if (dy > 0) {
                this.character.lastDirection = 'down';
                this.character.sprite.anims.play(`walk-down-${this.mood}-${this.charNum}`, true);
                movement = 'down';
            } else {
                this.character.lastDirection = 'up';
                this.character.sprite.anims.play(`walk-up-${this.mood}-${this.charNum}`, true);
                movement = 'up';
            }
        }

        if (movement !== this.lastMovement) {
            this.lastMovement = movement;
        }

        this.character.sprite.body.setVelocity(velocityX, velocityY);
        return false;
    }

    // Manhattan distance heuristic
    heuristic(a, b) {
        return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
    }

    // Reconstruct path from A* result
    reconstructPath(cameFrom, current) {
        const path = [];
        while (cameFrom.has(current)) {
            const [x, y] = current.split(',').map(Number);
            path.unshift({x, y});
            current = cameFrom.get(current);
        }
        return path;
    }

    findOvenPosition() {
        // Find oven position (value 4) in the grid
        for (let y = 0; y < 10; y++) {
            for (let x = 0; x < 10; x++) {
                if (this.collisionGrid[y][x] === 2) {
                    // Return position below the oven for interaction
                    return { x, y};
                }
            }
        }
        return null;
    }

    findTablePosition() {
        // Find empty table slot based on tableSide
        // Left table slots are 3,4 (values 3,4), Right table slots are 6,7
        const targetValues = this.tableSide === 'left' ? [3, 4] : [6, 7];
        
        // First try to find two adjacent empty slots
        for (let y = 0; y < 10; y++) {
            for (let x = 0; x < 10; x++) {
                if (targetValues.includes(this.collisionGrid[y][x])) {
                    // Check if this slot and the next one are empty
                    const slot1Key = `${x},${y}`;
                    const slot2Key = `${x+1},${y}`;
                    if (!this.scene.objectsOnTiles[slot1Key] && !this.scene.objectsOnTiles[slot2Key]) {
                        // Return position above the first slot for interaction
                        return { x, y: y - 1 };
                    }
                }
            }
        }
        
        // If no two adjacent empty slots found, just return the first empty slot
        for (let y = 0; y < 10; y++) {
            for (let x = 0; x < 10; x++) {
                if (targetValues.includes(this.collisionGrid[y][x])) {
                    const slotKey = `${x},${y}`;
                    if (!this.scene.objectsOnTiles[slotKey]) {
                        // Return position above the slot for interaction
                        return { x, y: y - 1 };
                    }
                }
            }
        }
        return null;
    }

    log(message) {
        const timestamp = new Date().toLocaleTimeString();
        const charInfo = `Character ${this.characterId} (${this.tableSide})`;
        //console.log(`${charInfo}: ${message}`);
    }

    // Start moving to a target location
    startMovingTo(target, nextState) {
        const pixelTarget = this.toPixelCoords(target.x, target.y);
        const path = this.findPath(
            this.character.sprite.x,
            this.character.sprite.y,
            pixelTarget.x,
            pixelTarget.y
        );

        if (path.length > 0) {
            this.path = path;
            this.currentPathIndex = 0;
            this.moveTarget = target;
            if (this.debug) {
                this.debugGrid();
            }
            return true;
        } else {
            this.log(`ERROR: No valid path to target (${target.x}, ${target.y}) found!`);
            return false;
        }
    }

    // Convert pixel coordinates to grid coordinates (top-left of 2x2 character)
    toGridCoords(x, y) {
        return {
            x: Math.floor((x - 32) / this.gridSize),
            y: Math.floor((y - 32) / this.gridSize)
        };
    }

    // Convert grid coordinates to pixel coordinates (center of 2x2 character)
    toPixelCoords(gridX, gridY) {
        return {
            x: gridX * this.gridSize + 32,
            y: gridY * this.gridSize + 32
        };
    }

    characterCenter(spriteX, spriteY) {
        return {
            x: spriteX + 32,
            y: spriteY + 32
        };
    }

    // Debug function to visualize the grid
    debugGrid() {
        if (!this.collisionGrid) return;

        // Clear any existing debug graphics
        if (this.debugGraphics) {
            this.debugGraphics.destroy();
            if (this.pathText) {
                this.pathText.forEach(text => text.destroy());
            }

        }
        this.debugGraphics = this.scene.add.graphics();
        
        // Draw grid
        for (let y = 0; y < 10; y++) {
            for (let x = 0; x < 10; x++) {
                const value = this.collisionGrid[y][x];
                switch (value) {
                    case 0: // walkable
                        this.debugGraphics.lineStyle(1, 0x00ff00);
                        break;
                    case 1: // blocking
                        this.debugGraphics.lineStyle(1, 0xff0000);
                        break;
                    case 2: // oven
                        this.debugGraphics.lineStyle(1, 0xff00ff);
                        break;
                    case 3: // table slot 1
                    case 4: // table slot 2
                    case 5: // table slot 3
                    case 6: // table slot 4
                    case 7: // table slot 5
                        this.debugGraphics.lineStyle(1, 0x00ffff);
                        break;
                }
                this.debugGraphics.strokeRect(x * 32, y * 32, 32, 32);

                // Show if tile is walkable for 2x2 character
                if (this.isWalkable(x, y)) {
                    this.debugGraphics.lineStyle(1, 0xffff00, 0.5);
                    this.debugGraphics.strokeRect(x * 32 + 8, y * 32 + 8, 16, 16);
                }
            }
        }

        // Draw current path if exists
        if (this.path && this.path.length > 0) {
            this.debugGraphics.lineStyle(2, 0xffffff);
            
            // Draw lines between path points
            let lastX = this.character.sprite.x;
            let lastY = this.character.sprite.y;
            
            // New array of path length to store text
            this.pathText =  new Array(this.path.length);
            for (let i = this.currentPathIndex; i < this.path.length; i++) {
                const point = this.toPixelCoords(this.path[i].x, this.path[i].y);
                this.debugGraphics.lineBetween(lastX, lastY, point.x, point.y);
                lastX = point.x;
                lastY = point.y;

                // Draw waypoint number
                this.pathText[i] = this.scene.add.text(point.x, point.y, i.toString(), {
                    fontSize: '16px',
                    fill: '#ffffff'
                });
                this.pathText[i].setOrigin(0.5, 0.5);
            }
        }
    }

    // Check if a 2x2 character can be placed at a grid position
    isWalkable(gridX, gridY) {
        if (!this.collisionGrid) {
            this.log('WARNING: Collision grid not loaded');
            return false;
        }

        // Check map bounds for 2x2 character
        if (gridX < 0 || gridY < 0 || gridX >= 9 || gridY >= 9) {
            return false;
        }

        // Check all four tiles that the character would occupy
        for (let dy = 0; dy < 2; dy++) {
            for (let dx = 0; dx < 2; dx++) {
                const checkX = gridX + dx;
                const checkY = gridY + dy;
                const value = this.collisionGrid[checkY][checkX];
                
                // Only allow walking on empty spaces (0) or oven spaces (4)
                if (value == 1) {
                    return false;
                }
            }
        }

        return true;
    }

    // Find path using A* algorithm
    findPath(startX, startY, endX, endY) {
        const start = this.toGridCoords(startX, startY);
        const end = this.toGridCoords(endX, endY);

        // If start and end are the same, return empty path
        if (start.x === end.x && start.y === end.y) {
            this.log('Start and end positions are the same');
            return [{x: start.x, y: start.y}];
        }

        // Validate end position is walkable
        if (!this.isWalkable(end.x, end.y)) {
            this.log(`ERROR: End position (${end.x}, ${end.y}) is not walkable!`);
            // Debug surrounding tiles
            for (let dy = -1; dy <= 1; dy++) {
                for (let dx = -1; dx <= 1; dx++) {
                    const checkX = end.x + dx;
                    const checkY = end.y + dy;
                    if (this.isWalkable(checkX, checkY)) {
                        this.log(`Nearby walkable position found at (${checkX}, ${checkY})`);
                    }
                }
            }
            return [];
        }

        const openSet = new Set();
        const closedSet = new Set();
        const cameFrom = new Map();
        const gScore = new Map();
        const fScore = new Map();

        const startKey = `${start.x},${start.y}`;
        openSet.add(startKey);
        gScore.set(startKey, 0);
        fScore.set(startKey, this.heuristic(start, end));

        let iterations = 0;
        const maxIterations = 1000; // Prevent infinite loops

        while (openSet.size > 0 && iterations < maxIterations) {
            iterations++;
            
            // Find node with lowest fScore
            let current = null;
            let lowestF = Infinity;
            for (const key of openSet) {
                const f = fScore.get(key);
                if (f < lowestF) {
                    lowestF = f;
                    current = key;
                }
            }

            const [currentX, currentY] = current.split(',').map(Number);
            if (currentX === end.x && currentY === end.y) {
                const path = this.reconstructPath(cameFrom, current);
                return path;
            }

            openSet.delete(current);
            closedSet.add(current);

            // Check neighbors
            const neighbors = [
                {x: currentX - 1, y: currentY},
                {x: currentX + 1, y: currentY},
                {x: currentX, y: currentY - 1},
                {x: currentX, y: currentY + 1}
            ];

            for (const neighbor of neighbors) {
                const neighborKey = `${neighbor.x},${neighbor.y}`;
                if (closedSet.has(neighborKey)) continue;
                
                if (!this.isWalkable(neighbor.x, neighbor.y)) {
                    if (neighbor.x === end.x && neighbor.y === end.y) {
                        this.log(`WARNING: Cannot reach end position (${end.x}, ${end.y}) through (${neighbor.x}, ${neighbor.y})`);
                    }
                    continue;
                }

                const tentativeG = gScore.get(current) + 1;
                if (!openSet.has(neighborKey)) {
                    openSet.add(neighborKey);
                } else if (tentativeG >= gScore.get(neighborKey)) {
                    continue;
                }

                cameFrom.set(neighborKey, current);
                gScore.set(neighborKey, tentativeG);
                fScore.set(neighborKey, tentativeG + this.heuristic(neighbor, end));
            }
        }

        if (iterations >= maxIterations) {
            this.log('ERROR: Path finding exceeded maximum iterations');
        } else {
            this.log('ERROR: No valid path found');
        }
        return []; // No path found
    }
}