//Create variables here

var dog,dogImg,happyDog,database,foodS,foodStock;

var food = [];

var milk,milkImg;

var button,button2;

function preload()
{
  //load images here
  dogImg = loadImage("images/dogImg.png");
  happyDog = loadImage("images/dogImg1.png");
  milkImg = loadImage("images/milk.png");
}

function setup() {
	createCanvas(700,500);
  
  database = firebase.database();
  foodStock = database.ref('Food');
  foodStock.on("value",readStock);

  strokeWeight(3);

  dog = createSprite(600,250,50,50);
  dog.addImage(dogImg);
  dog.scale = 0.3;
  

  button = createButton('Feed the dog');
  button.position(750,85);

  button2 = createButton('Add Food');
  button2.position(850,85);
}


function draw() {  

  background("green");


  fill("white");
  text("Food:"+foodS,100,50);

  

  button.mousePressed(function(){
    writeStock(foodS);
    dog.addImage(happyDog);
  });

  button2.mousePressed(function(){
    addFood(foodS);
    //dog.addImage(happyDog);
  });

  for(var i = 80;i<450;i+=60){
    food.push(new Food(i,160,50,70));
  }

  for(var j = 0;j<food.length;j++){
    food[j].display();
  }

  for(var i = 80;i<450;i+=60){
    food.push(new Food(i,240,50,70));
  }

  for(var j = 0;j<food.length;j++){
    food[j].display();
  }

  for(var i = 80;i<450;i+=60){
    food.push(new Food(i,320,50,70));
  }

  for(var j = 0;j<food.length;j++){
    food[j].display();
  }
  
  
  text(mouseX+","+mouseY,mouseX,mouseY);

  drawSprites();
  //add styles here

}

function readStock(data){
  foodS = data.val();
}

function writeStock(x){
  if(x<=0){
    x = 0;
  }else{
    x--;
  }

  database.ref('/').update({
    Food:x
  });
}

function addFood(x){
  x++
 database.ref('/').update({
   Food:x
 });
}