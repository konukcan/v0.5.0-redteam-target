
export default class GIFCapture {
    constructor(scene, options = {}) {
      if (!scene || !scene.game) {
        console.error('Valid Phaser scene is required');
        throw new Error('Valid Phaser scene is required');
      }
      
      this.scene = scene;
      this.game = scene.game;
      
      // Get dimensions safely
      const width = this.game.scale.width;
      const height = this.game.scale.height;
    

      
      this.options = {
        quality: 10,
        workers: 2,
        workerScript: 'phaser/src/utils/gif.worker.js',
        width: width,
        height: height,
        ...options
      };

      if (scene.trialConfig.baseURL) {
         this.options.workerScript = `${scene.trialConfig.baseURL}/phaser/src/utils/gif.worker.js`;
      }
      
      this.gif = null;
      this.recording = false;
      this.frames = 0;
      this.frameData = [];
      this.frameRate = 15;
      
      //console.log('GIFCapture initialized with dimensions:', width, 'x', height);
    }
    
    start(fps = 30, duration = 0) {
      if (this.recording) return;
      
      this.recording = true;
      this.frames = 0;
      this.frameData = [];
      this.frameRate = fps;
      
      // Calculate total frames based on duration and fps
      const totalFrames = Math.floor(duration / 1000 * fps);
      const frameInterval = 1000 / fps;
      
      let frameCount = 0;
      console.log(`Starting capture: ${totalFrames} frames at ${fps}fps`);
      
      // Setup capture interval
      this.captureInterval = setInterval(() => {
        this.captureFrame();
        frameCount++;
        
        if (totalFrames > 0 && frameCount >= totalFrames) {
          this.finishCapture();
        }
      }, frameInterval);
    }
    
    // Add normalizeFrame function to fix brightness flickering
    normalizeFrame(canvas) {
      const ctx = canvas.getContext('2d');
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      
      // Apply consistent brightness/contrast
      for (let i = 0; i < data.length; i += 4) {
        // Simple brightness normalization
        data[i] = Math.min(255, data[i] * 1.05);     // R
        data[i+1] = Math.min(255, data[i+1] * 1.05); // G
        data[i+2] = Math.min(255, data[i+2] * 1.05); // B
        // Alpha remains unchanged
      }
      
      ctx.putImageData(imageData, 0, 0);
      return canvas;
    }

    captureFrame() {
      if (!this.recording) return;
      
      try {
        // The key fix: Use Phaser's own snapshot method
        this.game.renderer.snapshot((snapshot) => {
          if (snapshot) {
            this.frameData.push(snapshot.src);
            this.frames++;
            console.log(`Captured frame ${this.frames}`);
          }
        });
      } catch (error) {
        console.error('Error capturing frame:', error);
      }
    }
    
    finishCapture() {
      if (!this.recording || this.frameData.length === 0) {
        console.log('No frames captured');
        this.recording = false;
        return;
      }

      if (this.captureInterval) {
        clearInterval(this.captureInterval);
        this.captureInterval = null;
      }

      // Remove the first 15 frames
      const framesToProcess = this.frameData

      console.log(`Creating GIF from ${framesToProcess.length} frames`);

      // Initialize gif.js with consistent options to prevent flickering
      this.gif = new GIF({
        ...this.options,
        // Force global color table to ensure consistent colors
        globalPalette: true,
        // Disable dithering for more consistent colors
        dither: false,
        // Higher quality to preserve colors better
        quality: 1
      });
      
      // Add all frames
      const promises = framesToProcess.map(src => {
        return new Promise(resolve => {
          const img = new Image();
          img.onload = () => {
            // Create a temporary canvas to normalize brightness
            const canvas = document.createElement('canvas');
            canvas.width = this.options.width;
            canvas.height = this.options.height;
            const ctx = canvas.getContext('2d');
            
            // Draw with image smoothing for better quality
            ctx.imageSmoothingEnabled = true;
            ctx.imageSmoothingQuality = 'high';
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            
            // Apply brightness normalization
            this.normalizeFrame(canvas);
            
            // Add frame with normalized canvas
            this.gif.addFrame(canvas, { 
              delay: 100,
              copy: true,
              dispose: 2 // Clear to background color between frames
            });
            
            resolve();
          };
          img.src = src;
        });
      });
      
      // When all frames are added
      Promise.all(promises).then(() => {
        console.log('Rendering final GIF...');
        
        // Add event listener for when the GIF is finished
        this.gif.on('finished', (blob) => {
          console.log('GIF created successfully!');
          
          try {
            // Create download link
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `${window.vignetteStr}-${Date.now()}.gif`;
            link.style.display = 'none';
            
            // Add the link to the document
            document.body.appendChild(link);
            
            // Trigger download
            console.log('Triggering download...');
            link.click();
            
            // Clean up after a longer delay to ensure browser has time to process
            setTimeout(() => {
              document.body.removeChild(link);
              URL.revokeObjectURL(url);
              console.log('Download cleanup complete');
            }, 1000);
            
            // Also try to display a visible download button as backup
            const downloadBtn = document.createElement('button');
            downloadBtn.textContent = 'Download GIF';
            downloadBtn.style.position = 'fixed';
            downloadBtn.style.top = '10px';
            downloadBtn.style.right = '10px';
            downloadBtn.style.zIndex = '9999';
            downloadBtn.onclick = () => {
              const backupLink = document.createElement('a');
              backupLink.href = url;
              backupLink.download = `phaser-capture-backup-${Date.now()}.gif`;
              backupLink.click();
              document.body.removeChild(downloadBtn);
            };
            document.body.appendChild(downloadBtn);
            
            // Remove button after 10 seconds
            setTimeout(() => {
              if (document.body.contains(downloadBtn)) {
                document.body.removeChild(downloadBtn);
              }
            }, 10000);
          } catch (error) {
            console.error('Error during download:', error);
          }
          
          this.recording = false;
          this.frameData = [];
        });
        
        // Start rendering
        this.gif.render();
      });
    }
    
    captureScreenshot() {
      console.log('Taking screenshot...');
      
      try {
        // The key fix: Use Phaser's own snapshot method
        this.game.renderer.snapshot((snapshot) => {
          if (snapshot) {
            const link = document.createElement('a');
            link.href = snapshot.src;
            link.download = `phaser-screenshot-${Date.now()}.png`;
            document.body.appendChild(link);
            link.click();
            
            // Clean up
            setTimeout(() => {
              document.body.removeChild(link);
            }, 100);
          }
        });
      } catch (error) {
        console.error('Error taking screenshot:', error);
      }
    }

    

}
