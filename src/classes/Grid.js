import Invader from "./invader.js";

class Grid{
    constructor(rows, cols) {
        this.rows = rows;
        this.cols = cols;

        this.direction = "right";
        this.moveDown = false;

        this.invaderVelocity = 1;
        this.invader = this.init();


    }

    init() {
        const array = []

        for (let row = 0; row < this.rows; row +=1){

            for(let col = 0; col < this.cols; col += 1){
                const invader = new Invader({
                    x: col * 50 + 20,
                    y: row * 35 + 100,

                },

                this.invaderVelocity
            );

            array.push(invader);

            }
        }

        return array;
    }

    draw(ctx){
        this.invader.forEach((invader) => invader.draw(ctx));
    }

    update(playerStatus) {
        if (this.chegouNaBordaDireita()){
            this.direction = "left";
            this.moveDown = true;
        } else if (this.chegouNaBordaEsquerda()) {
            this.direction = "right";
            this.moveDown = true;
        }

        if (!playerStatus) this.moveDown = false; 

        this.invader.forEach((invader) => {

            if (this.moveDown) {
                invader.moveDown();
                invader.moveDown();
                invader.incrementVelocity(0.1);
                this.invaderVelocity = invader.velocity;
            }

            if (this.direction === "right") invader.moveRigtht();
            if (this.direction === "left") invader.moveLeft();

        });

        this.moveDown = false;

    }
    chegouNaBordaDireita(){
        return this.invader.some(
            (invader) => invader.position.x + invader.width >= innerWidth
        );
    }

 
    chegouNaBordaEsquerda(){
          return this.invader.some(
            (invader) => invader.position.x <= 0
        );
    }

    getRondomInvader(){
        const index = Math.floor(Math.random() * this.invader.length);
        return this.invader[index];
    }

    restart() {
        this.invader = this.init();
        this.direction = "right";
    }
}


export default Grid;