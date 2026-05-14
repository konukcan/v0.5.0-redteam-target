


function addSceneImage(width, parent, imgPath) {
    var vignetteContainer = document.getElementById(parent);
    var vignetteImage = document.createElement('img');
    vignetteImage.src = imgPath; // Path to your image
    vignetteImage.style.width = width; // Adjust width as needed
    vignetteImage.style.height = 'auto'; // Maintain aspect ratio
    vignetteImage.style.borderRadius = '10px'; // Optional: add some border radius
    vignetteImage.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)'; // Optional: add some shadow
    vignetteImage.style.margin = '10px'; // Optional: add some margin
    vignetteImage.style.display = 'block'; // Center the image

    vignetteContainer.appendChild(vignetteImage);
    return vignetteImage;
}


function runPhaser(width, height, parent, options) {
    options = options || {};

    console.log('Phaser parameters:', window.MedievalScene, window.gameConfig);

    var config = {
        type: Phaser.AUTO,
        parent: parent,
        width: width,
        height: height,
        physics: {
            default: 'arcade',
            arcade: {
                gravity: { y: 0 },
                debug: false,
                tileBias: 8
            }
        },
        scene: window.MedievalScene,
        pixelArt: true,
        scale: {
            mode: Phaser.Scale.NONE,
            autoCenter: Phaser.Scale.CENTER_BOTH
        },
        fps: { forceSetTimeOut: true, target: 30 },
        render: {
            preserveDrawingBuffer: true
        },
        // When `noKeyboard` is set, disable Phaser's keyboard plugin entirely
        // so it cannot intercept any keystrokes destined for surrounding form
        // fields (e.g. the explanation textarea on the ranking trial). The
        // rewatch animation is autonomous and does not need keyboard input.
        input: options.noKeyboard
            ? { keyboard: false }
            : { keyboard: { capture: [] } },
    };

    var game = new Phaser.Game(config);
    if (!options.noKeyboard) {
        // Belt-and-braces: also clear the keyboard capture list once the game's
        // input plugin is up, in case any scene re-adds captures during create().
        game.events.once('ready', function () {
            if (game.input && game.input.keyboard) {
                game.input.keyboard.clearCaptures();
            }
        });
    }
    return game;
}


function vignetteToPhaser(vignette) {
    let strSplit = vignette.split('_');

    let characterChoices = [];

    let tables = 1
    let items;
    if (strSplit[0] == 'sim') {
        tables = 2;
        items = 'apple1-orange1-apple1-orange1';
        if (strSplit[1].slice(-1)[0] == 'A') {
            characterChoices.push('apple')
        } else {
            characterChoices.push('orange')
        }

        if (strSplit[2].slice(-1)[0] == 'A') {
            characterChoices.push('apple')
        } else {
            characterChoices.push('orange')
        }
    } else {
        if (strSplit[1].length == 3) {
            if (strSplit[1].includes('AA')) {
                items = 'apple1-apple1-orange1';
            } else {
                items = 'apple1-orange1-orange1';
            }
        } else if (strSplit[1].length == 4) {
            items = 'apple1-apple1-orange1-orange1';
        } else {
            items = 'apple1-orange1';
        }

        // Determine fruit choice from actor segment (e.g., "R-A" or "G-O")
        let choiceLetter = strSplit[2].slice(-1)[0]; // last char: 'A' or 'O'
        let fruitChoice = (choiceLetter == 'A') ? 'apple' : 'orange';

        // Actor goes first (front position A), other sits (back position B)
        characterChoices.push(fruitChoice);
        characterChoices.push('sitting');
    }

    // Determine actor for sequential scenes to set color order
    var seqActor = (strSplit[0] !== 'sim' && strSplit[2]) ? strSplit[2][0] : null;

    let characters = `AB`
    let characterColors = (seqActor === 'G') ? ['green', 'red'] : ['red', 'green'];
    if (strSplit.slice(-1)[0].includes('present')) {
        characters = 'ABC'
        characterColors.push('purple')
        characterChoices.push('sitting')
    }

    if (vignette.includes('div')) {
        var sceneStr = `${tables}_${characters}_${items}_div`;
    } else {
        var sceneStr = `${tables}_${characters}_${items}`;
    }

    return {
        sceneStr: sceneStr,
        characterChoices: characterChoices,
        characterColors: characterColors,
    }
    
}  