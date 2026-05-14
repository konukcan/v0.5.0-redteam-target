export const handleCreateTilesData = (scene, map) => {
    //This is where we will store all animated tiles that are being used in this game scene
    scene.animatedTiles = [];
    //Code to get all the tiles with animation in your tileset
    const tileData = map.tilesets[1].tileData
    
    //For each individual tile with animation in our tilemap, get only those that are actually in the actual game scene
     for (let tileid in tileData) {
      //check if any of them is on the actual game scene
      map.layers.forEach(layer  => {
        //first check in any of the layers
        layer.data.forEach(tileRow => {
            tileRow.forEach(tile => {
                if (tile.index - map.tilesets[1].firstgid === parseInt(tileid)) {
                    //In case there is any, add it to the empty array that we created at the beginning
                    scene.animatedTiles.push({
                        tile,
                        tileAnimationData: tileData[tileid].animation,
                        firstgid: map.tilesets[1].firstgid,
                        elapsedTime:0,
                     });
                }
            })
        })
      })
     }
    };


export const handleAnimateTiles = (scene, delta) => {
    //For each animated tile in our game scene: 
    scene.animatedTiles.forEach(tile => {
            //If there is no animated tile, don't run the code
            if (!tile.tileAnimationData) return;
            //Get the total animation duration of each tile     
            let animationDuration = tile.tileAnimationData[0].duration * tile.tileAnimationData.length
            
            //Check the elapsed time on your game scene since its started running each frame
            tile.elapsedTime += delta;
            tile.elapsedTime %= animationDuration
            const animatonFrameIndex = Math.floor(tile.elapsedTime / tile.tileAnimationData[0].duration);
            //Change the tile index for the next one on the list
            tile.tile.index = tile.tileAnimationData[animatonFrameIndex].tileid + tile.firstgid 

        });
        
    };

