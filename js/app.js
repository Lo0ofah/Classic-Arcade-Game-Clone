let hearts = document.getElementsByTagName("li");
// Enemies  player must avoid
class Enemy {
    constructor(x, y){
      // Variables applied to each of our instances go here,
      // we've provided one for you to get started

      // The image/sprite for our enemies, this uses
      // a helper we've provided to easily load images
        this.sprite = 'images/enemy-bug.png';
        this.x = x;
        this.y = y;
        //set a random speed
        this.speed = (( 1 + Math.random())* 80 );

    }

 // Update the enemy's position, required method for game
 // Parameter: dt, a time delta between ticks
  update(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    //move the enemy
    this.x +=  this.speed * dt;
    //check if enemy reach the end of the canvas
    if( this.x > 550){
      //reset the enemy position and set another random speed
        this.x = 0;
        this.speed =(( 1 + Math.random())* 80 );
    }
 }
//check if a collision happen
 checkCollisions(){
   if( this.x + 50 > player.x && this.x <  player.x + 30 && this.y + 20 > player.y && this.y <   player.y + 30){
     //when collision happen reset the player position
       player.x = 200;
       player.y = 400;
       //decrement the heart counter
       player.heartCount--;
       loseHeart();
       if(player.heartCount===0){
         swal("You lose", "Try again", "error");
         player.heartCount = 3;
          fillHearts();
       }


   }
 }

 // Draw the enemy on the screen, required method for game
 render() {
     ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
 }
}
//--------------------------------------------------------------------------
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player{
    constructor(x,y){
        this.sprite = 'images/char-boy.png';
        this.x = x;
        this.y = y ;
        this.heartCount = 3;
    }

    update(){
      //check if the player reach thw water
      if(player.y < -10){
        swal("Gongratulations,","You Won ! with "+  player.heartCount +" Hearts" ,"success");
          player.x = 200;
          player.y = 400;
          player.heartCount = 3;
          fillHearts();
      }
    }

    render(){
     ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
  // handling the player moves
    handleInput(key){
      switch(key){
        case "right" :{
        (this.x < 400 )? this.x += 100  :this.x ;
          break;
        }
        case "left" :{
         (this.x > 0) ? this.x -= 100  :this.x ;
          break;
        }
        case "up" :{
          (this.y > 0) ? this.y -= 90  : this.y;
          break;
        }
        case "down" :{
          (this.y < 390) ? this.y += 90  : this.y;
          break;
        }
      }

    }
}


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
 var allEnemies = [new Enemy(0, 230) , new Enemy(0, 60) , new Enemy(0, 60) , new Enemy(0, 140) ];
// Place the player object in a variable called player
 var player =  new Player(200,400);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

   player.handleInput(allowedKeys[e.keyCode]);
});

function loseHeart(){
  let heartsElement = hearts[player.heartCount].getElementsByTagName("i")[0];
   heartsElement.setAttribute("class","fas fa-heart fa-2x");
}

function fillHearts(){
  for(let i=0; i< hearts.length ; i++){
      let heartsElement = hearts[i].getElementsByTagName("i")[0];
      heartsElement.setAttribute("class","fas fa-heart fa-2x red");
  }
}
