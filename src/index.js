import Grid from "./classes/Grid.js";
import Invader from "./classes/invader.js";
import Player from "./classes/Player.js";
import Projectile from "./classes/Projectile.js";

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

ctx.imageSmoothingEnabled = false;


const player = new Player (canvas.width, canvas.height);
const grid = new Grid(3, 6);

const playerProjectiles = [];
const invaderProjectiles =[];



     const keys = {
        left: false,
        right: false,
        shoot: {
            pressed: false,
            released: true
        },
    };

    const drawPorjectiles = () => {
        

        playerProjectiles.forEach((Projectile) => {
            Projectile.draw(ctx);
            Projectile.update();
        });

         invaderProjectiles.forEach((projectile) => {
        projectile.draw(ctx);
        projectile.update();
    });
    };

    const clearProjectiles = () => {
        playerProjectiles.forEach((Projectile, index) => {
            if (Projectile.position.y <= 0 ){
                playerProjectiles.splice(index, 1);
            }
        });
    };

const checkShootInvader = () => {
    grid.invader.forEach((invader, invaderIndex) => {
        playerProjectiles.some((projectile, projectileIndex) => {
                if ( invader.hit(projectile)) {
                   grid.invader.splice(invaderIndex, 1);
                   playerProjectiles.splice(projectileIndex, 1);
                }
        });
    });
}


const gamerLoop = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)


 
    drawPorjectiles();
    clearProjectiles();

    checkShootInvader();

    grid.draw(ctx); 
    grid.update();

    ctx.save();

    ctx.translate(
        player.position.x + player.width /2,
        player.position.y + player.height /2
    );
    
    if(keys.shoot.pressed && keys.shoot.released){
        player.shoot(playerProjectiles);
        keys.shoot.released = false;
    }

   if (keys.left && player.position.x >= 0){
        player.moveLeft()
        ctx.rotate(-0.15)
   }

   if (keys.right && player.position.x <= canvas.width - player.width){
        player.moveRigtht()
        ctx.rotate(0.15)
   }
     ctx.translate(
       - player.position.x - player.width /2,
       - player.position.y - player.height /2
    );

    player.draw(ctx);

    ctx.restore();

    requestAnimationFrame(gamerLoop)
};


addEventListener("keydown", (event) => {
    const key = event.key.toLowerCase();
   
    if (key === "a") keys.left = true;
    if (key === "d") keys.right = true;
    if (key=== "enter") keys.shoot.pressed = true;
    
});

addEventListener("keyup", (event) => {
    const key = event.key.toLowerCase();
   
    if (key === "a") keys.left = false;
    if (key ==="d") keys.right = false;
    if (key=== "enter") {
        keys.shoot.pressed = false;
        keys.shoot.released = true;
    }
});

setInterval(() => {
const invader = grid.getRondomInvader()

    if (invader){

        invader.shoot(invaderProjectiles);

   }

}, 1000 )

gamerLoop();