import { INITIAL_FRAMES, PATH_ENGINE_IMAGE, PATH_ENGINE_SPRITES_IMAGE, PATH_SPACESHIP_IMAGE } from "../utils/constants.js";
import Projectile from "./Projectile.js";

class Player {
    constructor (canvasWidth, canvasHeight){
        this.width = 48 *2;
        this.height = 48 *2;
        this.velocity = 6;




        
        this.position = {
            x: canvasWidth / 2 - this.width /2,
            y: canvasHeight - this.height - 30 ,
        };

        this.image = this.getImage(PATH_SPACESHIP_IMAGE)
        this.engeneImage = this.getImage(PATH_ENGINE_IMAGE);
        this.engeneSprites = this.getImage(PATH_ENGINE_SPRITES_IMAGE);

        this.sx = 0;
        this.fremesCouter = INITIAL_FRAMES;
    }

    getImage(path) {
        const image = new Image()
        image.src = path;

        return image;
    }

    moveLeft(){
        this.position.x -= this.velocity;
    }

      moveRigtht(){
        this.position.x += this.velocity;
    }


    draw(ctx){
       ctx.drawImage(
        this.image, 
        this.position.x, 
        this.position.y, 
        this.width, 
        this.height
    );

    ctx.drawImage(
        this.engeneSprites, 
        this.sx, 
        0, 
        48,
        48,
        this.position.x,
        this.position.y + 10,
        this.width,
        this.height        
);


       ctx.drawImage(
        this.engeneImage, 
        this.position.x, 
        this.position.y + 12, 
        this.width, 
        this.height
       );


       this.update();

    }
    
    update(){

        if (this.fremesCouter === 0){
            this.sx = this.sx === 96 ? 0 : this.sx + 48
            this.fremesCouter = INITIAL_FRAMES;
        }

        this.fremesCouter--;   
    }

    shoot(projectiles) {
        const p = new Projectile({
            x: this.position.x + this.width / 2 - 1,
            y: this.position.y,
        },
        -10
    );

    projectiles.push(p);

    }
}



export default Player;