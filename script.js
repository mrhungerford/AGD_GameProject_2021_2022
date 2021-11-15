//screen variables
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

//box #2 RED
var x1 = 300;
var y1 = 50;
var w1 = 80;
var h1 = 80;
//box #2 BLUE
var x2 = 200;
var y2 = 100;
var w2 = 20;
var h2 = 20;
//updating stuff to test push 
//input variables
var left  = false;
var right = false;
var up    = false;
var down  = false;
var fill = false;
var speed = 2;
//////////////////////////////////////////////////////
//      
//             READ ME BEFORE USING
//        
//////////////////////////////////////////////////////
//  In Order to use these functions - you will need to 
// rename the variables to match your program.
//
// To use this with multiple objects - you will need
// several classes of objects (player,walls,bad guys etc)
// You will need to create several objects of each class
// Stick these objects into different lists.
//
// Then you will need to have a loop where you compare these
// things against each other
//
// If your collision only changes a variable (health down/gold up)
// Then you only need the Collision Detection stuff, not the Resolution Stuff
//////////////////////////////////////////////////////
//      AABB - axis aligned bounding box
//        Collision Detection
//////////////////////////////////////////////////////
function AABB(ax,ay,aw,ah,bx,by,bw,bh){
  /*Input:
  ax = the left/right position of the 1st box
  ay = the up/down position of the 1st box
  aw = the width of the 1st box
  ah = the height of the 1st box
  ////////////////////////////////////////////
  bx = the left/right position of the 2nd box
  by = the up/down position of the 2nd box
  bw = the width of the 2nd box
  bh = the height of the 2nd box
  */
  //Returns true if the boxes are touching and false if they are not
  return (  
    ((ax < bx + bw) && (ax+aw >bx)) /* possible collision left and right*/
  &&((ay < by + bh) && (ay+ah > by)) /* possible collision up and down*/
  );
}
////////////////////////////////////////////////
//    Collision Management
////////////////////////////////////////////////
//These next 4 functions align the red box to the blue box
//if a collision is detected
function align_left(){
  x1 = x2 + w2;
}
function align_right(){
  x1 = x2-w1;
}
function align_top(){
  y1 = y2 - h1;
}
function align_bottom(){
  y1 = y2 + h2;
}
////////////////////////////////////////////////
function sortNumber(a, b) {
  //This function sorts a list of numbers
  //by default JavaScript sorts alphabetically
  return a - b;
}
function resolve_collision(){
  //This function resolves a collision once detected
  
  //The first step is to calculate the distance between
  //the red box and the blue box in each direction
  var distBottom  = Math.abs(y2 + h2 - y1);
  var distTop     = Math.abs(y1 + h1 - y2);
  var distRight   = Math.abs(x1 + w1 - x2);
  var distLeft    = Math.abs(x2 + w2 - x1); 
  
  //Then we sort the 4 distances from smallest to largest
  var dist_List   = [distBottom,distTop,distLeft,distRight];
  var smallest = dist_List.sort(sortNumber)[0];//this takes the smallest one
  //We want to resolve AABB collision in the direction of the closest wall
  //This will keep the collision resolution "invisibile"
  if(smallest === distBottom){
    align_bottom();
  }
  if(smallest === distTop){
    align_top();
  }  
  if(smallest === distLeft){
    align_left();
  }
  if(smallest === distRight){
    align_right();
  }
}
function check_collisions(){
  //This if statement returns true if there is an overlap
  if(AABB(x1,y1,w1,h1,x2,y2,w2,h2)){
    fill = true;
    resolve_collision();
  }
  else{
    fill = false;
  }
}





////////////////////////////////////////////////
//    Box Movement & other things
////////////////////////////////////////////////
function moveBoxes(){
  if(right){
    x1 = x1 + speed;
    if(x1 > canvas.width - w1){
      x1 = canvas.width - w1;
    }
  }
  if(left){
    x1 = x1 - speed;
    if(x1 < 0){
      x1 = 0;
    }
  }
  /////////////////////
  if(up){
    y1 = y1 - speed;
    if(y1 < 0){
      y1 = 0;
    }
  }
   if(down){
    y1 = y1 + speed;
    if(y1 > canvas.height - h1){
      y1 = canvas.height - h1;
    }
  }
}
function drawBox(x,y,w,h,c,fill){
  ctx.beginPath();
  ctx.rect(x,y,w,h);
  if(fill){
    ctx.fillStyle = c;
    ctx.fill();
  }
  else{
    ctx.strokeStyle = c;
    ctx.stroke();
  }
  ctx.closePath();
}
//Main Functions
function keyDownHandler(e){
 if(e.key == "ArrowRight"){
    right = true;
  }
  if(e.key == "ArrowLeft"){
    left = true;
  }
  if(e.key == "ArrowUp"){
    up = true;
  }
  if(e.key == "ArrowDown"){
    down = true;
  }
}
function keyUpHandler(e){
  if(e.key == "ArrowRight"){
    right = false;
  }
  if(e.key == "ArrowLeft"){
    left = false;
  }
  if(e.key == "ArrowUp"){
    up = false;
  }
  if(e.key == "ArrowDown"){
    down = false;
  }
}
document.addEventListener("keydown",keyDownHandler,false);
document.addEventListener("keyup",keyUpHandler,false);
function draw(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  
  drawBox(x1,y1,w1,h1,"green",fill);
  drawBox(x2,y2,w2,h2,"black",fill);
  moveBoxes();
  
  
  check_collisions();
}
setInterval(draw,10);